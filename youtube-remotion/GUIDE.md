# 헬마드 영상 제작 가이드 (인덱스)

Remotion 기반 스크립트→영상 자동 생성 시스템. 스크립트를 분석해 적합한 시각 표현을 판단한 뒤 장면 데이터로 변환한다.

> **상세 규칙은 Kiro 스티어링으로 분리되어 있다.** (`d:\kiro\youtube\.kiro\steering/`)
> 이 문서는 어디에 무엇이 있는지 알려주는 인덱스다. 각 스티어링은 아래 조건에서 자동/수동 로드된다.

## 지침 지도

| 주제 | 스티어링 파일 | 로드 방식 | 내용 |
|------|--------------|-----------|------|
| **코어 워크플로우** | `core-workflow.md` | 항상 자동 | 워크스페이스/실행 위치 규칙, 폴더 구조, 포맷 확인, 렌더 명령, 서브에이전트·커뮤니케이션 규칙, 환경 gotchas |
| **스크립트 작성** | `script-writing.md` | `script/**` 편집 시 자동 | 롱폼 톤·오프닝 후킹, 숏폼 규칙, 후킹/마무리 패턴, 장면 분할 기준 |
| **Remotion 장면/디자인** | `remotion-scenes.md` | `src/**` 편집 시 자동 | 제작 실행 순서, 장면 타입, 디자인 원칙, 폰트/색상, 레이아웃, 최소 폰트 |
| **캐릭터 이미지** | `character-images.md` | 수동(#) | gpt-image-2 생성, 프롬프트 규칙, 포즈 프롬프트 풀, 재사용 전략, 검증 체크리스트 |
| **오디오 트림·타이밍** | `audio-timing.md` | 수동(#) | 무음 트림, faster-whisper 전사 기반 타이밍 재배분, 프리미어 확인 워크플로우 |
| **Higgsfield 영상 제작** | `higgsfield-video-workflow.md` | 수동(#) | 레퍼런스→영상 배치 생성→다운로드→히스토리 정리 절차 |
| **영상 믹스** | `video-mix.md` | 수동(#) | 컷 자동 감지, seed 셔플, ffmpeg concat 렌더 |

## 빠른 참조

### 실행 위치 (필수)
- 모든 npm/remotion 명령은 `cwd = d:\kiro\youtube\youtube-remotion`. (루트에서 실행하면 package.json 없어 실패)

### 롱폼 렌더 (16:9, HealthVideo)
```
npx remotion render src/index.ts HealthVideo out/longform/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --concurrency=8
```

### 숏폼 렌더 (9:16, ShortVideo)
```
npx remotion render src/index.ts ShortVideo out/shortform/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --concurrency=8
```

### Studio 미리보기
```
npx remotion studio
```

## 전체 제작 흐름
```
① 유튜브 URL/스크립트 제공 → script/ 폴더에 대본 파일 생성  (→ script-writing.md)
② 사용자: 녹음 + 오디오 트림                                (→ audio-timing.md)
③ hmad.txt 기반 화면 생성: 장면 구성 → script.ts → 이미지 → 렌더  (→ remotion-scenes.md, character-images.md)
④ 최종 오디오 확정 → 전사 기반 타이밍 재배분 → 재렌더        (→ audio-timing.md)
⑤ .mov를 프리미어에 올려 오디오와 합쳐 확인·마무리          (→ audio-timing.md)
```

> Higgsfield로 실사 영상을 만드는 별도 흐름은 `higgsfield-video-workflow.md` 참조.
> 스크립트 품질 인사이트·반복 실수 방지 노트는 각 스티어링 하단에 누적한다.
