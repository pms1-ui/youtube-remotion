---
inclusion: fileMatch
fileMatchPattern: 'src/**'
---

# Remotion 장면 구현 & 디자인 원칙 — 헬마드

`src/data/script.ts`(롱폼) / `shorts-script.ts`(숏폼)의 장면 데이터를 만들고, 디자인 규칙에 맞게 렌더한다.

## 영상 제작 실행 순서 (매번 이 순서)
1. **오디오 길이 측정** — `audio/`의 mp3 길이를 초 단위로 확인.
2. **장면 구성** — 대본(hmad.txt)을 문장 단위로 쪼개어 장면 배분, 총 초수 = 오디오 길이와 정확히 일치.
3. **이미지 생성** — 주제에 맞는 포즈로 병렬 생성 → 배경 제거 (상세: `character-images.md`).
4. **script.ts 작성** — 장면 배열 작성, characterImage 순환 배정.
5. **TypeScript 검증** — `npx tsc --noEmit ; Write-Output "EXIT=$LASTEXITCODE"`.
6. **렌더링** — ProRes 4444 투명 .mov, TransitionOverlay 없음, `--concurrency=8` 병렬. 장기 렌더는 백그라운드.

### 병렬 처리
```
스크립트 수령
    ├── [메인] 구성 기획 → script.ts 작성 → tsc 검증
    └── [서브에이전트/병렬] 캐릭터 이미지 N개 생성 + 배경제거 + 다운로드
         ↓ (동시 완료)
    script.ts에 characterImage 할당 → 겹침/균형 검증 → Studio
```

## 장면 분할 기준 (대본 → 장면)
- **★ 반드시 문장 단위로 하나씩 세어서 나눈다.** 임의 뭉텅이 묶기 금지.
- 의미가 이어지는 짧은 문장 2개 정도는 한 화면에 묶어도 됨(전달 메시지는 하나). 길거나 독립적 문장은 각각 별도 장면.
- 작업 순서: 문장 단위 번호 매김 → 이어지는 짧은 문장만 선별 묶음 → 최종 리스트 확정.
- 롱폼도 잘게(30~45장면). 한 장면 = 한 메시지, 5초 안에 파악.
- 한 장면당 3~7초, 긴 복문은 의미 전환점에서 끊음, 같은 타입 연속 배치 지양.

## 시각 표현 판단 (차트 우선)
| 조건 | 시각 표현 |
|------|-----------|
| 구체적 수치 데이터 | 차트/그래프 (barChart, donutChart, lineGraph) |
| 비율/퍼센트(절반, 두 배 등) | 도넛/원형 프로그레스 |
| A vs B 비교 + 수치 | barChart |
| A vs B 비교(수치 없음) | compare |
| 시계열/추이/변화 | lineGraph |
| 항목 나열 + 정도 차이 | highlight + bulletValues(원형 프로그레스) |
| 항목 나열(수치 없음) | highlight(카드 그리드) |
| 순서/과정/단계 | timeline |
| 순수 메시지 | text |
- **차트/그래프를 최우선**. text만 나열하지 말 것. "절반/두 배/거의 동일"은 수치로 변환. **근거 없는 수치는 만들지 않되** 표현에서 합리적으로 추론 가능한 수치는 사용.

## 장면 타입 (SceneType)
- `text`: 메인(82px 흰색) + subtitle(56px accent) + description(32px 회색). 테두리/카드 없음.
- `barChart`: `barData: {label,value,color}[]`. 바가 아래서 올라오는 spring.
- `donutChart`: `donutData: {label,value,color}[]`. 세그먼트 순차 그리기.
- `lineGraph`: `lineData: {label,value}[]`. 선이 좌→우.
- `highlight`: 강조 메시지 + bulletValues 있으면 원형 프로그레스, 없으면 카드 그리드.
- `compare`: 좌우 비교. 타이틀=accent 테두리 박스, 설명=테두리 없는 순수 텍스트(화살표 연결).
- `timeline`: 시간순 단계, 연결선과 함께 순차 등장.

## 디자인 원칙
### 배경
- **순수 검정(#000000) 단색**. 별/우주/그라데이션 금지(StarfieldBackground 미사용). 각 Scene 배경은 `transparent`(부모 #000000).

### 레이아웃
- 모든 요소 가운데 정렬. 16:9(1920×1080).
- **캐릭터 있는 장면**: 콘텐츠는 왼쪽 77%(`right: 23%`), 캐릭터는 오른쪽 `right: 5%`, `height: 95%`. `right:12%`는 텍스트에 너무 가까워 금지(콘텐츠-캐릭터 최소 5% 간격).
- **캐릭터 없는 장면**: 중앙 정렬(텍스트 화면 전체 사용).
- **겹침 방지 필수**: 콘텐츠(`right:23%` 영역 내) ↔ 캐릭터 절대 겹치지 않음. 콘텐츠 컨테이너에 `maxWidth:100%`, `overflow:hidden`.

### 장면 전환
- **TransitionOverlay(페이드) 사용 안 함** — 롱폼/숏폼 모두 즉시 전환.

### 폰트 (SCDream, 에스코어 드림)
- 파일: `public/fonts/SCDream5.otf`(Medium), `SCDream7.otf`(ExtraBold). Root.tsx에서 `@font-face` + `staticFile()` 등록.
- 굵은 텍스트(메인 타이틀/subtitle): `fontWeight:700`. 일반(description/범례/카드설명): `fontWeight:500`.
- 크기: 메인 타이틀(text) 96px / 메인 타이틀(chart·highlight) 58~70px / subtitle 64px / description 32~36px / 카드 라벨 44px / 카드 부연 26px / 차트 범례·라벨 36~38px.

### description 줄바꿈
- 2가지 이상 정보는 반드시 `\n`으로 분리. `|`나 `,`로 이어붙이지 않음. 모든 description에 `whiteSpace:"pre-line"`.
- ❌ "100% 유청 가성비 최강 | 추가 7%" → ✅ "100% 유청 가성비 최강\n트렌드 제품 담기 시 추가 7% 할인"

### 모션 (필수)
- **모든 장면에 움직임** — 정적 금지. 점진적 확대/축소 기본(scale 1.0↔1.05, 미세·느리게).
- 텍스트 spring 등장(damping 14, stiffness 90), subtitle 딜레이 후 슬라이드 업, 요소별 순차 등장.
- **장면 최소 길이 5초** (3초 이하 금지).

### 인포그래픽/풍성도
- 가능한 한 시각 요소 추가, 차트 가능 장면엔 반드시 사용. 단순 텍스트 나열보다 구조화 우선.
- text: 메인+subtitle+description(3단). highlight: 메인+description+bulletDescriptions. compare: 메인+description+좌우 설명.
- 원칙: "왜/뭘/어떻게"가 화면에 함께.

### 텍스트 장면 워딩
- **대본(나레이션)을 그대로 화면에 넣지 않음.** 구어체 → 프레젠테이션 스타일. 핵심 키워드만 짧고 임팩트. 종결은 명사형/체언.

### 사용 금지
- 별/우주/그라데이션 배경, 상단 뱃지/태그, 반복 아이콘, 장식용 소형 텍스트, 근거 없는 수치, 정적 장면, compare 설명 영역 테두리/박스/배경.

## 최소 폰트 사이즈 (절대 기준)
| 요소 | 최소 | 권장 |
|------|:---:|:---:|
| 장면 메인 텍스트 | 50px | 54~82px |
| 차트 축 라벨 | 26px | 28~32px |
| 차트 값 숫자 | 28px | 30~40px |
| 키워드 리스트 항목 | 38px | 42px |

**어떤 텍스트도 26px 미만 금지.**

## 색상 팔레트
| 용도 | 색상 |
|------|------|
| 긍정/성장 | #00b894, #55efc4, #00cec9 |
| 경고/감소 | #e17055, #d63031, #ff7675 |
| 강조/하이라이트 | #ffd93d, #fdcb6e, #f39c12 |
| 정보/안내 | #6c5ce7, #a29bfe, #74b9ff |
| 브랜드/신뢰 | #4A90D9, #5BA0E0, #3D7FC2 |

## 숏폼 레이아웃 자동 최적화
- `const isVertical = width < 1200;` (useVideoConfig의 width)로 감지.
- BarChart: 숏폼 시 차트 너비 700px로 축소(좌우 여백). Highlight: 숏폼 시 그리드 1열(`1fr`) 강제.
- 롱폼(1920px)은 기존 레이아웃 유지, 숏폼(1080px)에서만 적용.

## Remotion 시퀀스 채번
- 모든 Sequence에 `name` prop으로 장면 번호+타입 표시: `<Sequence name={\`Scene ${index + 1} - ${scene.type}\`} ...>`. Studio 타임라인 식별용.

## ★ 장면 데이터 편집 gotchas (반복 실수 방지)
- script.ts 장면 블록마다 `// N. 설명` 주석 번호 유지 → durationInSeconds 교체 시 앵커로 안전 수정. **장면 추가 시 이후 주석 번호도 함께 갱신.**
- 장면 추가/삭제 시 캐릭터 순환 배정(char-01~10)이 밀리므로 characterImage 재확인.
- durationInSeconds 반영 후 **반드시 합계를 오디오 길이와 비교 검증** (상세: `audio-timing.md`).
