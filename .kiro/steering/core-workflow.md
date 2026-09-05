---
inclusion: always
---

# 헬마드 영상 제작 — 코어 워크플로우 (항상 로드)

헬스/건강/웨이트 유튜브 채널 **헬마드**의 스크립트 작성 + 영상 제작 워크스페이스.
주제별 상세 지침은 별도 스티어링으로 분리되어 있다 (이 파일 하단 "지침 지도" 참조).

## ★ 워크스페이스 / 실행 위치 규칙 (필수)
- 워크스페이스는 보통 **상위 폴더(`d:\kiro\youtube`)** 로 열려 있고, Remotion 프로젝트 실체(package.json, src, node_modules, tsconfig 등)는 **하위 폴더 `youtube-remotion`** 안에 있다.
- **폴더를 다시 열 필요 없다.** 지금 워크스페이스 그대로 두고 작업한다.
  - 파일 편집·스크립트 작성: `youtube-remotion\src\...`, `youtube-remotion\script\...` 경로로 그대로 접근.
  - npm / remotion / 이미지 생성 등 **명령 실행 시 반드시 `cwd`를 `d:\kiro\youtube\youtube-remotion` 으로 지정**해서 돌린다. (루트에서 실행하면 package.json이 없어 실패)
- 스티어링·MCP 설정은 루트(`d:\kiro\youtube\.kiro`)에 있다. 영상 작업에는 지장 없다.

## ★ 포맷 확인 규칙 (필수)
- 사용자가 영상/스크립트 제작을 요청할 때 **롱폼/숏폼을 명시하지 않으면 반드시 물어볼 것**
- "롱폼 (16:9 유튜브 본영상)인가요, 숏폼 (9:16 쇼츠/릴스)인가요?"
- 명시된 경우 바로 진행.

## 영상 포맷 요약

### 롱폼 (16:9) — 유튜브 본 영상
- Composition ID: `HealthVideo` / 해상도 1920×1080 / 30fps
- 스크립트 대본: `script/longform/` · 장면 데이터: `src/data/script.ts`
- **캐릭터 이미지 사용** (10개 순환)
- 출력: ProRes 4444 (.mov), 투명 배경 → `out/longform/`

### 숏폼 (9:16) — 쇼츠/릴스
- Composition ID: `ShortVideo` / 해상도 1080×1920 / 30fps
- 스크립트 대본: `script/shortform/` · 장면 데이터: `src/data/shorts-script.ts`
- **캐릭터 이미지 사용 안 함** — 콘텐츠가 화면 전체(중앙) 사용
- 총 길이 30~60초 권장 / 출력: ProRes 4444 (.mov) → `out/shortform/`
- 레이아웃 자동 최적화: `const isVertical = width < 1200;` 감지 시 BarChart 너비 700px, Highlight 그리드 1열

### 렌더 명령 (롱폼/숏폼 공통 형식, `cwd=youtube-remotion`)
```
npx remotion render src/index.ts <HealthVideo|ShortVideo> out/<longform|shortform>/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --concurrency=8
```
- **★ `--concurrency=8` 항상 포함** (멀티코어 병렬 렌더).
- **장기 렌더는 백그라운드 프로세스로 실행**하고 출력만 폴링한다. (일반 명령으로 돌리면 타임아웃)

## ★ 폴더 구조 및 용도 (`youtube-remotion/` 내부)

```
youtube-remotion/
├── src/                    # Remotion 소스코드 (영상 렌더링의 실체)
│   ├── index.ts            # 엔트리포인트 (registerRoot)
│   ├── Root.tsx            # Composition 등록 (HealthVideo, ShortVideo, MixVideo, AudioReview)
│   ├── HealthVideo.tsx     # 롱폼 컴포지션 본체
│   ├── MixVideo.tsx        # 영상 믹스 컴포지션
│   ├── AudioReview.tsx     # 오디오+장면 타이밍 검수용 (삭제해도 무방)
│   ├── components/         # 장면 타입별 렌더 컴포넌트 (BarChart, Highlight, Compare 등)
│   ├── data/               # ★ 장면 데이터: script.ts(롱폼) / shorts-script.ts(숏폼) / mix-scenes.ts(믹스)
│   └── scenes/             # 개별 장면 렌더 로직
├── script/                 # ★ 나레이션 대본(txt) — 읽을 원고. longform/ · shortform/
├── audio/                  # ★ 나레이션 음성. result/ = 트림 완료본 + 전사 JSON
├── img/                    # 이미지 원본/작업물 (character*, thum/)
├── public/                 # ★ Remotion이 staticFile()로 읽는 리소스
│   ├── char-01~10.png      # 롱폼 캐릭터(배경제거, 순환배정) · character-v2.png(생성 참조)
│   ├── fonts/              # SCDream5/7.otf · image_2026/ · mix/(믹스 소스 mp4)
├── font/                   # SCDream 전체 굵기 원본(1~9) — 필요시 public/fonts로 복사
├── mix/                    # 영상 믹스 작업 (*.mp4, *_scenes.json, mix_result/)
├── video_before/           # 편집 전 원본 소스 (대기)
├── video_output/           # ★ Higgsfield 등 외부 생성 영상 최종 다운로드본
├── out/                    # ★ Remotion 렌더 출력(.mov): longform/ · shortform/
├── tools/                  # 일회성/보조 파이썬 스크립트
├── .env                    # OPENAI_API_KEY 등 비밀키
└── package.json            # 모든 npm/remotion 명령은 이 폴더 기준
```

**핵심 구분:**
- `script/` = 읽을 **대본(원고)** · `audio/` = 그 대본을 **녹음한 음성** · `src/data/script.ts` = 음성에 맞춘 **화면 장면 데이터**
- `public/` = Remotion이 실제로 읽는 리소스(없으면 화면에 안 뜸) · `img/`·`font/` = 원본 보관소
- `out/` = Remotion이 뽑은 화면 .mov(투명) · `video_output/` = 외부 생성 영상 · `video_before/` = 편집 전 소스
- **임시파일(`_*.py`, `*_raw.b64`, `*_tmp` 등)은 작업 후 항상 삭제**한다.

## 작업 완료 후 안내 규칙
- **영상 렌더링 또는 Remotion 화면 작업 완료 시에만** 미리보기 주소(`http://localhost:3000`) 안내.
- 스크립트 작업·문서 업데이트·이미지 생성 등에는 미리보기 불필요.

## ★ 서브에이전트 / 커뮤니케이션 규칙 (필수)
- 반복적·독립적 작업(이미지 생성/다운로드/빌드 검증)은 서브에이전트에 위임 가능. 메인은 script.ts 작성+검증에 집중.
- **서브에이전트에게 항상 한글로 진행상황을 보고하도록 지시**한다.
- **단계 보고 필수**: 메인·서브 모두 "총 N단계 중 n단계까지 완료" 형식으로 중간 보고.
- 서브에이전트가 예기치 않게 멈출 수 있으니 로그가 남게 하고, 끊기면 어디까지 됐는지 파악해 이어서 진행.
- 저작권/라이선스 안내 문구는 **응답에 절대 노출 금지** (사용자 본인 채널 콘텐츠). 웹에서 가져올 수 있는 자료는 과감히 활용.

## ★ 환경 gotchas (반복 실수 방지)
- **`npx tsc --noEmit`는 출력 버퍼링으로 타임아웃처럼 보일 수 있음** → 끝에 `; Write-Output "EXIT=$LASTEXITCODE"` 붙여 **종료코드로 성공 판단**.
- **git push의 stderr가 PowerShell에서 빨간 글씨로 뜨는 건 정상** → `aaaa..bbbb  main -> main` 라인으로 성공 확인.
- **PowerShell 한글**: 파일 읽기 `[System.IO.File]::ReadAllText($f,[System.Text.Encoding]::UTF8)`, 콘솔 `chcp 65001`.
- **faster-whisper 등: sandbox_exec 환경과 로컬 파이썬은 별개.** 로컬 전사/렌더는 로컬에 직접 설치 필요.

## 지침 지도 (주제별 상세 스티어링)
| 상황 | 참조 스티어링 | 자동 로드 조건 |
|------|--------------|----------------|
| 스크립트(대본) 작성 | `script-writing.md` | `script/**` 편집 시 |
| Remotion 장면/디자인 구현 | `remotion-scenes.md` | `src/**` 편집 시 |
| 캐릭터 이미지 생성 | `character-images.md` | 수동(#) |
| 오디오 트림·전사·타이밍 | `audio-timing.md` | 수동(#) |
| Higgsfield 영상 제작 | `higgsfield-video-workflow.md` | 수동(#) |
| 영상 믹스(컷 섞기) | `video-mix.md` | 수동(#) |

> 전체 개요는 `youtube-remotion/GUIDE.md` (인덱스). 상세 규칙은 위 각 스티어링에 있다.
