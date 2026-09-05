---
inclusion: manual
---

# 오디오 트림 · 전사 기반 타이밍 재배분 · 결과물 확인 — 헬마드

## 1. 오디오 트림 (무음 구간 제거)
녹음된 음성에서 숨쉬는 구간·말 없는 구간(무음)을 자동으로 잘라낸다.
- 원본 업로드: `audio/` · 결과물: `audio/result/`
- 라이브러리: `pydub`(분할/합성) + `ffmpeg`(백엔드)

### 트림 설정값
| 파라미터 | 값 | 설명 |
|---------|-----|------|
| `silence_thresh` | -35 dB | 이 이하를 무음으로 판단 |
| `min_silence_len` | 300 ms | 최소 이 시간 이상 무음만 잘라냄 |
| `keep_silence` | 70 ms | 각 청크 앞뒤 여유(자연스러운 이음) |
| `bitrate` | 320k | 출력 MP3 비트레이트 |

```python
from pydub import AudioSegment
from pydub.silence import split_on_silence
audio = AudioSegment.from_mp3("audio/파일명.mp3")
chunks = split_on_silence(audio, min_silence_len=300, silence_thresh=-35, keep_silence=70)
output = AudioSegment.empty()
for chunk in chunks:
    output += chunk
output.export("audio/result/파일명_trimmed.mp3", format="mp3", bitrate="320k")
```

### 미세 조정
- 너무 빡빡하게 잘림 → `silence_thresh` 올림(-35→-30). 아직 빈 구간 많음 → 낮춤(-35→-40).
- 말 시작/끝 잘림 → `keep_silence` 올림(50→100). 짧은 숨소리도 잘라야 함 → `min_silence_len` 줄임(300→200).

## 2. 최종 오디오 → 장면 타이밍 재배분 (전사 기반) — 필수 절차
사용자가 **최종 확정 오디오**(트림+편집 완료)를 다시 주면, 오디오 길이·실제 발화 타이밍에 맞춰 `script.ts`의 각 장면 `durationInSeconds`를 재배분한다.

### 왜 전사 기반인가 (채택 근거)
- **채택: faster-whisper 전사 기반 매칭** — 단어별 타임스탬프에 장면 대본을 매칭 → 오디오와 화면 전환 정확히 일치.
- (반려) 글자수 비례 배분 → 말 빠르기 차이로 오차 누적.
- (반려) 무음 구간 기반 분할 → 장면 수와 무음 구간 수 불일치로 부정확.

### 절차
1. **오디오 확인**: `audio/YYMMDD.mp3` 존재/길이(`ffprobe` 또는 whisper `info.duration`).
2. **faster-whisper 설치 확인**: 로컬 파이썬에 없으면 `pip install faster-whisper` (CPU int8로 충분). ⚠️ sandbox_exec 환경과 로컬 파이썬은 별개 — 로컬 렌더까지 하려면 로컬 설치.
3. **전사 실행** (한국어, 단어별 타임스탬프, VAD):
   ```python
   from faster_whisper import WhisperModel
   model = WhisperModel("small", device="cpu", compute_type="int8")
   segments, info = model.transcribe("audio/YYMMDD.mp3", language="ko",
                                     word_timestamps=True, vad_filter=True)
   # info.duration = 총 길이. segment.start/end/text → audio/result/YYMMDD_transcript.json 저장
   ```
   - 모델 `small`(정확도/속도 균형), 필요시 `medium`. 결과는 `audio/result/YYMMDD_transcript.json`.
4. **장면↔전사 매칭**: script.ts 장면 대본 순서대로 세그먼트 매칭 → 각 장면 시작·끝 산출. 장면 길이=(다음 시작)−(현재 시작). 마지막 장면 끝=`info.duration`.
5. **타이밍 표를 사용자에게 제시**하고 검수(합계=오디오 길이 확인).
6. 승인 후 `durationInSeconds` 갱신 → `npx tsc --noEmit ; Write-Output "EXIT=$LASTEXITCODE"`.
7. **NG/중복 체크**: 같은 문장 두 번 잡히면(재녹음 흔적) 사용자에게 알리고 살릴 쪽 확인. 대본 기준 문장만 남긴다.

### 임시파일
- 전사용 파이썬 스크립트(`_transcribe.py` 등)는 실행 직후 삭제.

### ★ off-by-one / 합계 검증 (반복 실수 방지)
- 나레이션이 이어지는 문장을 어느 장면에 붙일지 애매하면 특정 구간이 누락돼 **합계가 오디오보다 짧아진다.** (실제로 5.4초 누락돼 176.8 vs 182.15 발생)
- **타이밍 반영 후 반드시 합계를 오디오 길이와 비교 검증.** 안 맞으면 원인 구간을 찾는다.
- **빈 구간 처리 = 장면 추가 (확정).** 한 장면이 12초를 넘길 만큼 길어지면 몰아넣지 말고 장면을 추가로 쪼갠다. (긴 한 장면 흡수는 반려)
- 합계 검증 스니펫:
  ```powershell
  $vals = Select-String -Path "src\data\script.ts" -Pattern "durationInSeconds:\s*([\d.]+)" | ForEach-Object { [double]$_.Matches[0].Groups[1].Value }
  "장면 수: $($vals.Count) / 합계: $(($vals | Measure-Object -Sum).Sum)"
  ```

## 3. 결과물 확인 방법 (Remotion → 프리미어)
이 프로젝트 정석: **"Remotion으로 화면만 투명 .mov 렌더 → 프리미어에서 오디오 얹어 확인/마무리."**

### 두 경로
1. **Remotion Studio 미리보기** (`npm start`, `cwd=youtube-remotion`): HealthVideo 선택 → 장면 흐름/디자인/타이밍만 확인. ⚠️ script.ts엔 오디오가 안 물려 있어 **음성과 함께 재생 안 됨**(화면 검수용). `AudioReview` 컴포지션은 오디오+장면 동기 검수용(불필요하면 Root.tsx에서 삭제 가능).
2. **.mov 렌더 → 프리미어 합성** (← 사용자가 마무리): ProRes 4444 투명 .mov를 프리미어 타임라인에 올리고, 같은 타임라인에 최종 오디오(`audio/...mp3`)를 얹어 전환이 나레이션과 맞는지 확인. 투명 배경이라 다른 푸티지 위에 얹어도 됨.

### 렌더 명령 (롱폼)
```
npx remotion render src/index.ts HealthVideo out/longform/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --concurrency=8
```
- `cwd`는 반드시 `d:\kiro\youtube\youtube-remotion`. 장기 렌더는 백그라운드 프로세스로.
- 렌더 후 출력 경로(`out/longform/...mov`)를 안내하고 프리미어에 오디오와 함께 올려 확인하도록 안내.

### 왜 완성본(오디오 포함)까지 안 뽑나 (결정)
- 사용자가 프리미어로 자막/편집을 마무리하므로 Remotion에선 **화면만 투명하게** 뽑는다. 오디오를 Remotion에 물려 완성본 뽑는 방식은 반려됨.
