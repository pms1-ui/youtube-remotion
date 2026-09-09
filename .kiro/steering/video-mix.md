---
inclusion: manual
---

# 영상 믹스 (장면 무작위 섞기) — 헬마드

사용자가 "믹스해줘/섞어줘/영상 섞어/컷 섞어/mix" 요청 시. 운동 영상 컷을 자동 감지해 무작위 재배치한다.

## 워크플로우
```
① mp4를 mix/ 폴더에 배치
② ffmpeg scene detection으로 컷 분할 (threshold 0.3)
③ 3.5초 미만 구간 병합 → 유효 장면 목록 (앞뒤 0.5초 트림을 감안한 최소 길이)
④ 사용자에게 장면 분할 결과 제시 (검증)
⑤ 승인 후 무작위 seed로 순서 섞기
⑥ Remotion MixVideo로 미리보기
⑦ 렌더링 (각 장면 앞뒤 0.5초 트림 + 프레임 정확 재인코딩 concat)
```

## 파일 구조
| 경로 | 역할 |
|------|------|
| `mix/` | 원본 mp4 소스 |
| `mix/mix_result/` | **믹스 렌더링 결과물** |
| `mix/*_scenes.json` | 장면 분할 결과(검증용) |
| `public/mix/` | Remotion 참조 mp4(staticFile) |
| `src/data/mix-scenes.ts` | 장면 데이터 + shuffle 함수 |
| `src/MixVideo.tsx` | Remotion 컴포지션 |

## 장면 감지
```powershell
ffmpeg -i "mix/파일명.mp4" -filter:v "select='gt(scene,0.3)',showinfo" -vsync vfr -f null NUL 2>&1 | Select-String "pts_time"
```
- threshold 0.3(운동 영상 적합). 너무 많이 감지되면 0.4, 적으면 0.2.
- 병합: 최소 3.5초. 3.5초 미만은 다음 구간과 자동 병합(빠른 전환은 같은 동작 앵글 변경일 가능성 높음). ★ 렌더 시 앞뒤 각 0.5초(총 1초)를 트림하므로, 3.5초 미만이면 트림 후 유효 화면이 2.5초 밑으로 떨어져 너무 짧아진다.

## Remotion 컴포지션
- ID `MixVideo`, 해상도=원본(보통 1920×1080), FPS=원본(보통 24fps), Props `seed`(다른 seed=다른 순서).

## 렌더링 (트림 + 프레임 정확 재인코딩 concat — 필수)
- **Remotion 렌더링 사용 안 함**(단순 컷 섞기엔 비효율, 1시간+). ffmpeg로 처리한다.
- ★ **각 장면 앞 0.5초·뒤 0.5초를 잘라내고 안쪽 구간만 사용한다.** 장면 `[start, end]` → 실제 추출 구간 `[start + TRIM_HEAD, end − TRIM_TAIL]`.
  - **왜:** scene detection 경계와 GOP(키프레임) 경계가 어긋나, 컷 앞뒤에 직전/직후 장면의 프레임이 딸려오는 오염이 생긴다. 앞뒤를 깎으면 경계 오염 프레임이 확실히 제거된다.
  - 파라미터: `TRIM_HEAD = 0.5`, `TRIM_TAIL = 0.5` (초). 오염이 더 심하면 0.7까지 올리고, 화면 손실이 아까우면 0.3까지 내린다. 스크립트 상단 상수로 뺀다.
- ★ **`-c copy` 금지 → 세그먼트 추출을 재인코딩으로 한다.** `-c copy`는 키프레임에서만 잘려 0.5초 트림이 프레임 단위로 정확히 안 맞고 오염도 남는다. 재인코딩(`libx264`)해야 프레임 정확 컷이 된다.
  - 세그먼트 추출 예: `ffmpeg -ss <start+0.5> -to <end-0.5> -i "mix/YYMMDD.mp4" -c:v libx264 -preset veryfast -crf 18 -c:a aac -avoid_negative_ts make_zero "임시/seg_NN.mp4"`
  - `-ss`를 `-i` 앞(입력 seek)에 두면 빠르면서도 재인코딩이라 프레임 정확도가 유지된다.
  - 모든 세그먼트를 동일 해상도·fps·코덱으로 뽑아야 concat이 깨지지 않는다(원본과 동일 설정 사용).
- 출력: `mix/mix_result/mix_파일명.mp4` (반드시 이 경로).
- 절차: scenes.json 로드 → seed 셔플 → 각 장면 `[start+0.5, end−0.5]` 재인코딩 추출(임시) → `concat` demuxer로 이어붙이기 → 결과 저장 → 임시 세그먼트/리스트 파일 정리.
- 재인코딩이라 `-c copy`보다 느리지만 운동 영상 수준(수십 컷)은 보통 몇 분 내 완료. 속도보다 경계 정확도를 우선한다.
- seed 변경 시 스크립트 내 `SEED` 값만 수정.

## 파일명 규칙
- 입력 `mix/YYMMDD.mp4` · 장면 `mix/YYMMDD_scenes.json` · 출력 `mix/mix_result/mix_YYMMDD.mp4`.

## 새 영상 작업 절차
1. `mix/`에 mp4 배치 → 2. ffprobe로 정보 확인 → 3. scene detection → 4. 장면 필터링 → 5. `mix-scenes.ts`의 `MIX_DATA` 업데이트 → 6. `public/mix/`에 mp4 복사 → 7. Root.tsx MixVideo fps/duration 확인 → 8. Studio 미리보기 → 9. 검증 후 필요시 렌더.
