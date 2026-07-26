# 영상 제작 가이드

## 개요
Remotion 기반 스크립트→영상 자동 생성 시스템.
스크립트를 분석하여 적합한 시각 표현을 판단한 뒤, 장면 데이터로 변환합니다.

---

## ★ 포맷 확인 규칙 (필수)
- 사용자가 영상 제작을 요청할 때 **롱폼/숏폼을 명시하지 않으면 반드시 물어볼 것**
- "롱폼 (16:9 유튜브)인가요, 숏폼 (9:16 쇼츠/릴스)인가요?"
- 명시된 경우 바로 진행

---

## 영상 포맷

### 롱폼 (16:9) — 유튜브 본 영상
- Composition ID: `HealthVideo`
- 해상도: 1920×1080
- 스크립트 파일: `src/data/script.ts`
- **캐릭터 이미지 사용** (10개 순환)
- 장면당 10초
- 렌더 명령: `npx remotion render src/index.ts HealthVideo out/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le`
- **출력 포맷: ProRes 4444 (.mov)** — 항상 투명 배경, 프리미어 프로 호환

### 숏폼 (9:16) — 쇼츠/릴스
- Composition ID: `ShortVideo`
- 해상도: 1080×1920
- 스크립트 파일: `src/data/shorts-script.ts`
- **캐릭터 이미지 사용하지 않음** — 콘텐츠가 화면 전체(중앙) 사용
- 장면당 5~7초 (숏폼은 빠른 전환)
- 렌더 명령: `npx remotion render src/index.ts ShortVideo out/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le`
- **출력 포맷: ProRes 4444 (.mov)** — 항상 투명 배경
- 텍스트 크기: 롱폼과 동일하게 유지 (세로 화면이라 자연스럽게 큼)
- 총 영상 길이: 30~60초 권장 (쇼츠 제한)
- **레이아웃 최적화 (자동 적용)**:
  - BarChart: 숏폼(`width < 1200`) 감지 시 차트 너비 700px로 축소 (좌우 여백 확보)
  - Highlight 카드: 숏폼에서 그리드를 강제 1열(`1fr`) 배치 (텍스트 끊김 방지)
  - 감지 방법: `const isVertical = width < 1200;` (useVideoConfig의 width 활용)
  - 롱폼(1920px)에서는 기존 레이아웃 유지, 숏폼(1080px)에서만 적용

---

### 작업 완료 후 필수 안내
- **영상 렌더링 또는 Remotion 화면 작업 완료 시에만** 로컬호스트 미리보기 주소 안내
- 주소: `http://localhost:3000`
- 스크립트 작업, 문서 업데이트, 이미지 생성 등에는 미리보기 불필요

---

## 스크립트 생성 규칙

### 저장 위치 및 파일명
- **폴더**: `script/`
- **유튜브 링크 또는 스크립트 제공 시 항상 3개 파일 생성:**
  1. `YYMMDD_영상제목_eng.txt` — 원본 (영어 등 원본 언어)
  2. `YYMMDD_영상제목_kor.txt` — 한국어 직역 번역
  3. `YYMMDD_영상제목_hmad.txt` — 헬마드 톤 리라이팅 스크립트 (최종 영상용)
- **파일명 예시**: `260725_olympia_diet_eng.txt`, `260725_olympia_diet_kor.txt`, `260725_olympia_diet_hmad.txt`
- **텍스트 모델**: 스크립트 번역/리라이팅은 에이전트가 직접 처리 (API 키 불필요)
- **이미지 모델**: `gpt-image-2` (OpenAI API 키 사용, `.env`)
- **유튜브 자막 추출**: `youtube-transcript-api` Python 패키지 사용

### 헬마드 스크립트 톤 & 가이드 (한국어 리라이팅 프롬프트)

아래는 스크립트 생성 시 **항상 준수**할 기본 프롬프트:

```
넌 헬스, 건강, 웨이트 정보를 다루는 유튜브 채널의 롱폼 스크립트를 만들어주는 봇이다.
내가 특정 주제나 완성된 스크립트를 제공하면 그 주제나 스크립트로 영상 스크립트를 만든다.

[기본 가이드]
- 안녕하세요, 헬스 건강 정보 헬마드입니다. 로 시작한다.
- ~다, ~데요, ~고, ~죠와 같은 말투만 사용합니다. ~해요, ~하세요 같은 여성형 말투는 지양합니다.
- 앞에 시청자들에게 시청을 유도하는 초강력 후킹 문구나 내용을 포함한다. 호기심 유발과 끝까지 시청 유도를 한다.
- 지금까지 잘못된 방식으로 운동했거나, 모르는 부분이 있다면 근성장을 위해서 혹은 부상을 예방하기 위해서라도 반드시 끝까지 보시길 바란다는 내용을 적는다.
- 전체적으로 시청자들이 지루해하지 않기 위해 조금은 자극적으로, 호들갑떠는것도 필요하다.
- 시청지속시간을 고려하여 내용을 흥미롭게, 단조롭지 않게 구성한다.
- 해당 주제의 효과, 방법, 자세, 주의사항을 압축적으로 다룬다.
- 논리의 근거는 다양한 통계, 기사, 연구 자료를 인용하여 수치를 가져온다.
- 한글로 영어 단어를 쓸 땐 괄호치고 영문으로 또 적지는 않는다.
- 논문이나 메타 연구 결과를 포함하되, 실제 웹검색을 기반으로 한다.
- 바로 읽을 스크립트이므로 내용 외에 다른 것들은 넣지 마라. (타임스탬프, 배경, 전환, 화면 설명 등)
- 결론에는 도움이 되셨다면 구독과 좋아요 알림설정을 요청합니다.
  (오늘 영상 내용 유익하셨다면 구독, 좋아요, 알림 설정, 하이프까지 꼭 부탁드리구요, 헬마드 구독자 여러분 오늘도 득근하는 하루 되시기 바랍니다.)
- 공백 포함 2500~3000자 내외로 만든다.
- 스크립트를 완성한 후, 최종적으로 한번 더 검증하여 구독자들의 시청지속을 유도할 수 있는지, 흥미로울지, 지루하거나 늘어지는 부분은 없는지, 오타나 어색한 부분이 있는지 체크하여 업그레이드한다.
- 읽어야 되니까 항목화 시키지 말고 항상 줄글로 줘라 (스크립트형태로 쭉)
- 전체적으로 실제 존재하는 과학 논문 연구 결과(수치 포함)와 통계기관의 통계를 초반과 중간중간 잘 넣어줘. 신빙성과 설득력 높아보이게
```

---

## 전체 영상 제작 프로세스

### 워크플로우 개요
```
① 유튜브 URL 제공 → 4개 txt 파일 자동 생성 (script/ 폴더)
② 사용자: 녹음 + 자막 편집
③ hmad.txt 기반 화면 생성 요청 → Remotion 프로세스 (장면 구성 → 이미지 생성 → 렌더링)
```

### ① 유튜브 URL → 4개 파일 생성
유튜브 링크를 제공하면 아래 4개 파일이 `script/` 폴더에 자동 생성됨:

| # | 파일명 | 내용 |
|---|--------|------|
| 1 | `YYMMDD_한글영상제목_eng.txt` | 원본 언어 자막 추출 |
| 2 | `YYMMDD_한글영상제목_kor.txt` | 한국어 직역 번역 |
| 3 | `YYMMDD_한글영상제목_hmad.txt` | 헬마드 톤 리라이팅 스크립트 (최종 영상용) |
| 4 | `YYMMDD_한글영상제목_url.txt` | 원본 영상 URL |

- **파일명 규칙**: 축약하지 않고 영상 제목을 최대한 한글로 반영
- **예시**: `260725_올림피아챔피언의극한커팅식단_eng.txt`

### ② 사용자 작업
- hmad.txt를 기반으로 직접 녹음
- 자막 편집 및 타이밍 조정

### ③ 화면 생성 요청 → Remotion 프로세스
사용자가 "hmad txt로 화면 만들어줘" 요청 시:
1. 장면 구성 (구성안 제시 → 승인 시 진행)
2. script.ts 구현
3. 캐릭터 이미지 10개 생성 (gpt-image-2 + rembg)
4. 렌더링 (ProRes 4444 .mov, 투명 배경)

---

### ★ 병렬 처리로 속도 최적화

```
스크립트 수령
    ├── [메인] ① 구성 기획 → ② script.ts 작성 → ③ TypeScript 검증
    └── [서브에이전트/병렬] ④ 캐릭터 이미지 N개 생성 + 배경제거 + 다운로드
         ↓ (두 작업이 동시 완료)
    ⑤ script.ts에 characterImage 할당
    ⑥ 검증 (겹침, 균형감) + Studio 시작
```

### 단계별 상세

**① 구성 기획 (Plan)**
- 스크립트를 의미 단위로 분해
- 각 장면의 타입, 텍스트, 데이터, 시각 요소를 표로 정리
- **차트/그래프 가능 여부를 반드시 판단** — 가능하면 어떤 데이터로 구성할지까지 기획
- 사용자 확인 없이 바로 구현으로 진행 (별도 요청 없는 한)

**② 영상 구현 (Implement)**
- 확정된 구성을 기반으로 `src/data/script.ts` 작성
- `npx tsc --noEmit`으로 검증

**③~④ 캐릭터 이미지 생성 (병렬)**
- ②와 동시에 진행 가능
- Higgsfield `gpt_image_2` 모델로 장면 수만큼 생성 (`count: 4` 병렬)
- 포즈 프롬프트 풀에서 장면별로 다른 포즈 선택
- 생성 → 배경 제거 → 다운로드 → public/ 저장

**⑤~⑥ 조립 및 검증**
- script.ts에 characterImage 필드 할당
- 겹침 검증, 균형감 확인
- `npm start` 실행

### 구성 기획 시 차트/그래프 판단 필드
각 장면에 대해 아래를 반드시 포함:

| 필드 | 설명 |
|------|------|
| 차트 가능 여부 | O / X |
| 차트 타입 | barChart / donutChart / lineGraph / N/A |
| 데이터 근거 | 스크립트에서 수치를 추출한 근거 (없으면 불가) |
| 구성 방식 | 어떤 항목을 어떤 값으로 표현할지 |

---

## 1단계: 스크립트 의미 단위 분해

### 분해 규칙
- 원문 스크립트를 문장/문단 단위로 나눔
- 각 단위가 전달하는 **핵심 메시지**를 한 줄로 정리

### 의미 분해 시 주의사항
- 원문에 없는 해석을 넣지 않음
- 원문의 논리 흐름을 정확히 반영: 원인 → 결과, 질문 → 답변, 문제 → 해결
- 원문이 말하지 않는 주장을 만들어내지 않음

### 장면 분할 기준
- **의미 단위별로 촘촘하게 쪼갬** — 속도감 있게 화면이 빠르게 전환
- 한 장면당 3~7초, **하나의 키워드/메시지 단위**로 쪼갬
- 너무 짧은 문장은 다음 문장과 합치되, 합쳐도 한 메시지만
- 긴 복문은 의미 전환점에서 과감히 끊음
- 같은 타입이 연속되지 않도록 타입 교차 배치
- 원칙: **한 화면 = 한 메시지, 5초 안에 바로 파악 가능한 분량**

### 시각 표현 판단 (차트 우선)
각 의미 단위에 대해 아래 기준으로 판단:

| 조건 | 시각 표현 |
|------|-----------|
| 구체적인 수치 데이터가 있음 | 차트/그래프 (barChart, donutChart, lineGraph) |
| 비율/퍼센트 언급이 있음 (절반, 두 배 등) | 도넛 차트 또는 원형 프로그레스 |
| A vs B 비교 + 수치 | 막대 차트 (barChart) |
| A vs B 비교 (수치 없음) | compare |
| 시계열/추이/변화 | 라인 그래프 (lineGraph) |
| 기능/항목 나열 + 정도 차이 | highlight + bulletValues (원형 프로그레스) |
| 기능/항목 나열 (수치 없음) | highlight (카드 그리드) |
| 순서/과정/단계 | timeline |
| 순수 메시지 전달 | text |

**핵심 원칙:**
- **차트/그래프를 최우선으로 사용** — text만 나열하지 말 것
- 스크립트에서 "절반", "두 배", "거의 동일" 등의 표현은 수치로 변환 가능
- 근거 없는 수치를 완전히 만들어내지는 않되, 스크립트의 표현에서 합리적으로 추론 가능한 수치는 사용

---

## 디자인 원칙

### 배경
- **순수 검정(#000000) 단색 배경** — 아무런 장식 없음
- 별/우주/그라데이션 사용 금지 — StarfieldBackground 사용하지 않음
- 각 Scene 컴포넌트의 배경은 `transparent` (부모가 #000000)

### 레이아웃
- **모든 요소 가운데 정렬** (수직/수평 모두)
- 16:9 비율 (1920x1080)
- 장면 전환: 페이드 인/아웃
- **캐릭터 위치**: `right: 5%` (화면 우측 가장자리 근접 배치) — `right: 12%`는 텍스트/차트와 너무 가까워 금지
- **캐릭터-콘텐츠 간 여유 공간 확보 필수**: 텍스트와 캐릭터 사이에 최소 5% 이상의 빈 공간 유지

### 폰트 스타일
- **폰트**: `SCDream` (에스코어 드림) — 모든 장면에서 통일
  - 파일: `public/fonts/SCDream5.otf` (Medium), `SCDream7.otf` (ExtraBold)
  - CSS: `@font-face`로 Root.tsx에서 `staticFile()` 경로로 등록
- **굵은 텍스트 (메인 타이틀, subtitle)**: `fontWeight: 700` (SCDream 7 ExtraBold)
- **일반 텍스트 (description, 범례, 카드 설명)**: `fontWeight: 500` (SCDream 5 Medium)
- 크기 기준:
  - 메인 타이틀 (text 장면): 96px
  - 메인 타이틀 (chart/highlight): 58~70px
  - subtitle: 64px
  - description: 32~36px
  - 카드 라벨: 44px
  - 카드 부연: 26px
  - 차트 범례/라벨: 36~38px

### description 줄바꿈 규칙
- description에 2가지 이상의 정보를 넣을 때는 반드시 `\n`으로 줄바꿈 분리
- 한 줄에 서로 다른 성격의 정보를 `|`나 `,`로 이어붙이지 않음
- 모든 description 렌더링 요소에 `whiteSpace: "pre-line"` 적용 필수
- 예시:
  - ❌ "100% 유청 가성비 최강 | 트렌드 제품 담기 시 추가 7%"
  - ✅ "100% 유청 가성비 최강\n트렌드 제품 담기 시 추가 7% 할인"

### 모션 원칙 (필수)
- **모든 장면에 움직임이 있어야 함** — 정적 장면 금지
- 각 장면은 점진적 확대 또는 축소를 기본 적용
- scale 범위: 1.0 ↔ 1.05 (미세하고 느리게, 과하지 않게)
- 텍스트는 일반 spring 등장 (damping 14, stiffness 90)
- subtitle은 딜레이 후 아래에서 슬라이드 업
- 요소별 순차 등장 + spring 애니메이션
- **장면 최소 길이: 5초** (3초 이하 금지, 읽을 시간 확보)

### compare 장면 디자인
- **타이틀 박스**: accent 색상 테두리 + 투명 배경
- **설명 영역**: 테두리/박스/배경 없음 — 순수 텍스트만 표시
- 화살표로 타이틀 → 설명 연결

### 인포그래픽 원칙
- **모든 장면에 가능한 한 시각 요소를 추가**
- 차트/그래프가 가능한 장면에는 반드시 사용
- highlight: bulletValues가 있으면 원형 프로그레스, 없으면 카드 그리드
- **단순 텍스트 나열보다 구조화된 레이아웃 우선**

### 화면 풍성도 원칙
- **모든 장면에 부연설명(description) 추가 권장**
- text 타입: 메인 텍스트 + subtitle + description (3단 구조)
- highlight 타입: 메인 텍스트 + description + bulletDescriptions
- compare 타입: 메인 텍스트 + description + 좌우 설명
- 원칙: **인포그래픽 느낌** = "왜/뭘/어떻게"가 화면에 함께 보여야 함

### 사용 금지
- **별/우주/그라데이션 배경 금지**
- **상단 뱃지/태그 금지**
- **반복 아이콘 금지**
- **장식용 소형 텍스트 금지**
- **근거 없는 수치 금지** — 스크립트에 없는 숫자를 만들어 차트에 넣지 않음
- **정적 장면 금지**
- **compare 설명 영역에 테두리/박스/배경 금지**

### 텍스트 장면 워딩 규칙
- **대본(나레이션)을 그대로 화면에 넣지 않음**
- 대본은 구어체 → 화면 텍스트는 **프레젠테이션 스타일**로 변환
- 핵심 키워드만 추출하여 짧고 임팩트 있게 구성
- **문장 종결은 명사형/체언 종결**

---

## 장면 타입 (SceneType)

### `text`
- 핵심 메시지 전달
- 테두리/카드 없음 — 순수 텍스트만 배치
- 메인 텍스트 (82px, 흰색) + subtitle (56px, accent) + description (32px, 회색)
- 일반 spring 등장 + subtitle 딜레이 슬라이드 업

### `barChart`
- **막대 차트** — 실제 수치 데이터가 있을 때만 사용
- `barData` 필수: `{ label, value, color }[]`
- 바가 아래에서 올라오는 spring 애니메이션

### `donutChart`
- **도넛 차트** — 비율 데이터가 있을 때만 사용
- `donutData` 필수: `{ label, value, color }[]`
- 각 세그먼트가 순차적으로 그려지는 애니메이션

### `lineGraph`
- **라인 그래프** — 시계열/추이 데이터가 있을 때만 사용
- `lineData` 필수: `{ label, value }[]`
- 선이 왼→오 그려지는 애니메이션

### `highlight`
- 강조 메시지 + 하단 키워드 카드 그리드 또는 원형 프로그레스
- bulletValues가 있으면 원형 프로그레스 모드
- bulletValues가 없으면 카드 그리드 모드

### `compare`
- **좌우 비교 장면**
- 타이틀: accent 테두리 박스
- 설명: 테두리 없이 순수 텍스트만 (화살표로 연결)

### `timeline`
- **시간순 단계 표시**
- 각 단계가 연결선과 함께 순차적으로 등장

---

## 최소 폰트 사이즈 (절대 기준)
| 요소 | 최소 사이즈 | 권장 사이즈 |
|------|:----------:|:----------:|
| 장면 메인 텍스트 | 50px | 54~82px |
| 차트 X축/Y축 라벨 | 26px | 28~32px |
| 차트 값 숫자 | 28px | 30~40px |
| 키워드 리스트 항목 | 38px | 42px |

**규칙: 화면에 표시되는 어떤 텍스트도 26px 미만이면 안 됩니다.**

---

## 색상 팔레트 추천

| 용도 | 색상 |
|------|------|
| 긍정/성장 | #00b894, #55efc4, #00cec9 |
| 경고/감소 | #e17055, #d63031, #ff7675 |
| 강조/하이라이트 | #ffd93d, #fdcb6e, #f39c12 |
| 정보/안내 | #6c5ce7, #a29bfe, #74b9ff |
| 브랜드/신뢰 | #4A90D9, #5BA0E0, #3D7FC2 |

---

## 캐릭터 이미지 제작 (Higgsfield MCP)

### 개요
각 장면에 캐릭터 이미지를 배치하여 영상의 몰입감과 브랜딩을 강화합니다.
Higgsfield MCP를 통해 이미지를 생성하고, 배경을 제거한 뒤 Remotion에서 렌더링합니다.

### 제작 흐름
1. **이미지 생성**: OpenAI `gpt-image-2` API `/v1/images/edits` 엔드포인트 사용
   - `public/character-v2.png`를 **참조 이미지로 반드시 함께 전송** (`image[]` 파라미터)
   - 참조 이미지 없이 생성하면 캐릭터 외형이 달라짐 — 절대 빠뜨리지 않기
2. **배경 제거**: rembg 라이브러리로 투명 PNG 변환 (`python -c "from rembg import remove..."`)
3. **저장**: `public/char-01.png` ~ `char-10.png`
4. **배치**: Scene 데이터의 `characterImage` 필드에 파일명 지정

### API 설정
- **엔드포인트**: `https://api.openai.com/v1/images/edits` (참조 이미지 포함 시)
- **모델**: `gpt-image-2`
- **Quality**: `high`
- **API 키 위치**: `.env` 파일 (`OPENAI_API_KEY=sk-...`)
- **참조 이미지**: `public/character-v2.png` (항상 함께 전송)
- **응답 형식**: Base64 PNG (b64_json)
- **크기**: `1024x1536` (세로형)
- **배경**: `solid black background` → rembg로 투명 변환

### 병렬 생성 방식 (PowerShell Jobs)
```powershell
# 10개 동시 병렬 생성 후 rembg 일괄 배경 제거
$jobs = @()
for ($i = 0; $i -lt 10; $i++) {
    $jobs += Start-Job -ScriptBlock {
        param($key, $prompt, $num, $imgPath)
        curl.exe -s -X POST "https://api.openai.com/v1/images/edits" `
            -H "Authorization: Bearer $key" `
            -F "model=gpt-image-2" -F "prompt=$prompt" `
            -F "size=1024x1536" -F "quality=high" `
            -F "image[]=@$imgPath" -o "public/char-$num-raw.b64"
        # ... base64 디코딩 + 저장
    } -ArgumentList $key, $prompt, $num, $imgPath
}
$jobs | Wait-Job | Receive-Job
# 이후 python rembg로 일괄 배경 제거
```

### 참조 이미지 정보
- **파일 위치**: `public/character-v2.png`
- **특징**: 은색 메탈릭 바디, 눈코입 없는 매끈한 실버 얼굴, HMAD 검정 캡
- ⚠️ 생성 시 반드시 함께 전송 — 없으면 외형 불일치

### 프롬프트 규칙
- **캐릭터 묘사**: "Same character as reference image exactly: silver metallic muscular bodybuilder with smooth featureless silver face without eyes nose or mouth, HMAD black cap, shirtless, black shorts, white sneakers"
- **얼굴**: "smooth featureless silver face without eyes nose or mouth" (까만 얼굴이나 고개 숙임 X)
- **포즈**: 반드시 보디빌딩 공식 포즈명 또는 자연스러운 포즈 사용 (주머니에 손 넣기, 팔짱 등)
- **샷 타입**: 전신/상반신/하반신 골고루 혼합
  - 전신: "full body head to toe"
  - 상반신: "upper body shot cropped at waist, showing torso and above only"
  - 하반신: "lower body shot from waist down only, legs and shorts visible"
- **배경**: "solid black background, dramatic studio lighting"
- **프롬프트 끝**: "ultra high quality, 8K detail, photorealistic metallic texture"

### 이미지 생성 규칙
- **모델**: OpenAI `gpt-image-2` — `/v1/images/edits` 엔드포인트 + 참조 이미지 필수
- **비율**: `1024x1536` (세로형)
- **배경**: 검정 배경으로 생성 → rembg로 투명 변환
- **참조 이미지**: `public/character-v2.png` 반드시 함께 전송 (`image[]` 파라미터)
- **프롬프트 배경 강화**: 프롬프트 끝에 반드시 추가 → `solid black background, dramatic studio lighting, ultra high quality, 8K detail, photorealistic metallic texture`
- **검증**: 생성 후 rembg 처리, RGBA 모드 확인
- **★ 컴팩트 포즈 필수**: 캐릭터의 팔, 손, 다리, 발이 모두 이미지 프레임 안에 완전히 들어와야 함. 팔을 넓게 벌리거나 프레임 밖으로 나가는 포즈 금지. 프롬프트에 반드시 "all limbs visible within frame, compact pose, not extending arms outward" 포함
- **프롬프트 필수 요소**:
  - 참조 이미지의 외형 특징 명시 (은색 메탈릭 바디, HMAD 검정 캡, 얼굴 없음 등)
  - 포즈: 근육 자랑, 플렉스, 포인팅 등 자유로운 프리 포즈
  - 전신샷 또는 상반신샷 다양하게 혼용
  - `solid pure white background` (배경 제거 용이)
- **배경 제거**: 생성 후 반드시 `remove_background` 적용
- **병렬 생성**: 여러 장면 동시에 생성 요청하여 시간 절약

### 레이아웃 규칙
- **캐릭터 있는 장면**: 콘텐츠(텍스트/차트/카드)를 왼쪽 77% 영역에 배치 (`right: 23%`), 캐릭터는 오른쪽 (`right: 5%`, `height: 95%`)
- **캐릭터 없는 장면**: 기존 중앙 정렬 유지 (텍스트가 화면 전체 사용)
- **텍스트와 캐릭터 간 여유 공간 필수** — 최소 5% 이상의 간격, 겹침 및 근접 배치 금지
- **캐릭터는 크게** — 화면 위아래를 거의 가득 채우는 크기
- **전신 또는 상반신(반신) 모두 가능** — 상반신만 나오는 이미지도 좋음 (5번 장면처럼)
- **겹침 방지 필수**: 콘텐츠 영역과 캐릭터 영역이 절대 겹치면 안 됨
  - 모든 장면 타입(text, compare, donutChart, barChart, highlight, timeline)에서 동일하게 적용
  - 콘텐츠는 `right: 23%` 영역 안에서만 렌더링
  - 캐릭터는 `right: 12%` position absolute로 콘텐츠 영역 바깥에 배치
- **★ 캐릭터는 모든 장면에 필수 생성** — 영상 전체에 캐릭터가 항상 등장해야 함

### 검증 체크리스트 (생성 후 필수)
- [ ] 텍스트가 캐릭터 이미지와 겹치지 않는가?
- [ ] 16:9 화면 안에서 전체적 균형감이 맞는가?
- [ ] 캐릭터가 너무 세로로 길거나 찌그러지지 않았는가?
- [ ] 차트/그래프가 잘리지 않고 콘텐츠 영역 안에 들어가는가?
- [ ] **highlight 카드 그리드**: 캐릭터가 있으면 최대 2열 (`hasChar ? repeat(2, auto)`)
- [ ] 콘텐츠 영역에 `overflow: hidden` 또는 `maxWidth: 100%` 적용됐는가?

### 겹침 발생 원인과 해결
- **원인**: highlight 타입에서 카드가 3열(`repeat(3, auto)`)로 배치되면 콘텐츠 영역(77%)을 초과하여 캐릭터 영역으로 침범
- **해결**: 캐릭터가 있는 장면(`hasChar`)에서는 카드 그리드를 최대 2열로 강제 제한
- **예방**: 모든 콘텐츠 컨테이너에 `maxWidth: 100%`, `overflow: hidden` 적용

### 캐릭터 이미지 재사용 전략 (효율화)
- **핵심 원칙**: 장면 수만큼 이미지를 매번 생성하지 않음
- **방법**: 10개의 다양한 포즈 이미지를 선생성하고, 장면에 순환 배정
  - 포즈 풀에서 10개를 골라 생성 → `public/char-01.png` ~ `char-10.png`
  - 장면 N번에는 `char-0${((N-1) % 10) + 1}.png` 배정 (1~10 순환)
- **API 호출**: PowerShell Jobs로 **10개 동시 병렬 생성** (gpt-image-2는 동시 요청 제한 관대함)
- **모델**: `gpt-image-2` + `quality: "high"` + 검정 배경 → rembg로 투명 처리
- **구현**: script.ts 작성 시 characterImage를 순환 패턴으로 자동 배정
- **장점**: 생성 시간 80% 절약, 크레딧 절약, 포즈 다양성은 유지
- **파일 네이밍**: `public/char-01.png` ~ `char-10.png` (고정 풀, 10개)
- **포즈 선택**: 영상 주제에 맞는 포즈로 선택 (등 운동 영상 → 등 포즈, 하체 영상 → 하체 포즈)
- **이미지 크기 규칙**:
  - 전신샷: 화면에 좀 작게 들어가도록 (캐릭터가 화면의 70~80% 높이)
  - 상반신/하반신 반신샷: 몸이 이미지 프레임을 꽉 채우도록 (캐릭터가 화면의 95~100% 높이)
  - 프롬프트에 "tightly cropped, filling the entire frame" (반신) 또는 "with some space around, not filling entire frame" (전신) 명시

### Remotion 시퀀스 채번 규칙
- 모든 Sequence에 `name` prop으로 장면 번호 + 타입 표시
- 형식: `Scene 1 - text`, `Scene 2 - barChart`, `Scene 3 - compare` ...
- Studio 타임라인에서 각 장면을 번호로 식별 가능
- 구현: `<Sequence name={\`Scene ${index + 1} - ${scene.type}\`} ...>`

### 서브에이전트 위임 규칙
- 이미지 생성, 다운로드 등 반복적이고 독립적인 작업은 서브에이전트에 위임 가능
- 메인 에이전트는 script.ts 작성 + 검증에 집중
- 서브에이전트 위임 가능 작업: 이미지 생성 API 호출, 파일 다운로드, 빌드 검증

### 포즈 다양성 가이드
| 장면 톤 | 추천 포즈 |
|---------|-----------|
| 인트로/질문 | 프론트 더블 바이셉 플렉스, 팔짱 |
| 경고/주의 | 손가락 포인팅, 팔 뻗기 |
| 긍정/성장 | 사이드 체스트, 모스트 머스큘러 |
| 설명/분석 | 상반신 크로스암, 턱 괴기 |
| 결론/마무리 | 라떼 스프레드, 승리 포즈 |

**포즈 프롬프트 규칙:**
- "근육을 자랑하는 포즈"로 넓게 지시하면 자연스럽게 다양한 결과 생성
- 동일한 프롬프트를 여러 장면에 반복하지 않음 — 장면마다 포즈 키워드를 다르게
- 전신샷과 상반신샷을 혼용하여 시각적 리듬감 부여
- **상반신(반신)이 나와도 매우 좋음** — 전신만 고집하지 않기

### 포즈 프롬프트 풀 (10개)
아래에서 장면마다 돌려가며 선택. 공통 프리픽스를 붙여서 사용:

**공통 프리픽스** (항상 앞에 붙임):
```
Same character as reference: silver metallic muscular bodybuilder with HMAD black cap covering face, no visible face, shirtless, black shorts, white sneakers.
```

| # | 포즈 프롬프트 (프리픽스 뒤에 붙임) | 샷 타입 |
|---|---|---|
| 1 | `Pose: back double biceps, rear view showing massive back muscles and lats spread wide, full body head to toe, solid pure white background, studio lighting` | 전신 뒷모습 |
| 2 | `Pose: arms crossed over chest confidently, upper body shot from waist up, looking slightly to the left, solid pure white background, studio lighting` | 상반신 팔짱 |
| 3 | `Pose: side chest pose, one arm flexed showing bicep peak, upper body shot from waist up, solid pure white background, dramatic studio lighting` | 상반신 사이드체스트 |
| 4 | `Pose: rear lat spread, back facing camera showing V-taper and wide lats, full body head to toe, solid pure white background, studio lighting` | 전신 뒷모습 래트스프레드 |
| 5 | `Pose: most muscular crab pose, arms tensed showing vascularity, powerful wide stance, full body head to toe, solid pure white background, dramatic studio lighting` | 전신 크랩포즈 |
| 6 | `Pose: front relaxed stance with hands on hips, showing quad sweep and leg definition, full body head to toe, solid pure white background, studio lighting` | 전신 하체 강조 |
| 7 | `Pose: side tricep pose, one arm behind showing tricep and shoulder, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 사이드트라이셉 |
| 8 | `Pose: front double bicep flex, powerful wide stance, full body head to toe, solid pure white background, dramatic studio lighting` | 전신 더블바이셉 |
| 9 | `Pose: vacuum pose showing tiny waist and broad shoulders, hands behind head, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 바큠포즈 |
| 10 | `Pose: walking towards camera confidently with slight turn, showing quad definition, full body head to toe, solid pure white background, studio lighting` | 전신 워킹 |
| 11 | `Pose: rear view looking over shoulder, showing thick traps and rear delts, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 뒤돌아보기 |
| 12 | `Pose: seated on invisible bench leaning forward, forearms on knees, showing upper back thickness, upper body shot, solid pure white background, studio lighting` | 상반신 앉은자세 |
| 13 | `Pose: one arm raised overhead showing serratus and obliques, other hand on hip, full body head to toe, solid pure white background, studio lighting` | 전신 한팔올리기 |
| 14 | `Pose: lunging forward showing quad separation and hamstring, dynamic athletic stance, full body head to toe, solid pure white background, studio lighting` | 전신 런지 하체 |
| 15 | `Pose: hands clasped behind back pulling shoulders open, showing full chest and front delt, upper body shot from waist up, solid pure white background, studio lighting` | 상반신 가슴열기 |

---

## 실행 명령어

```bash
npm start          # Remotion Studio (미리보기)
npm run render     # MP4로 렌더링 → out/video.mp4
```

---

## 오디오 트림 (무음 구간 제거)

### 개요
녹음 완료된 스크립트 음성 파일에서 숨쉬는 구간, 말 없는 구간(무음)을 자동으로 잘라내는 작업.

### 폴더 구조
- **원본 업로드**: `audio/` (루트 하위)
- **결과물 저장**: `audio/result/`

### 사용 라이브러리
- `pydub` (Python) — 오디오 분할 및 합성
- `ffmpeg` (시스템) — pydub 백엔드 디코딩/인코딩

### 트림 설정값
| 파라미터 | 값 | 설명 |
|---------|-----|------|
| `silence_thresh` | -35 dB | 이 데시벨 이하를 무음으로 판단 |
| `min_silence_len` | 300 ms | 최소 이 시간 이상 지속되는 무음만 잘라냄 |
| `keep_silence` | 70 ms | 각 청크 앞뒤에 유지하는 여유 (자연스러운 이음) |
| `bitrate` | 320k | 출력 MP3 비트레이트 |

### 실행 방법
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
- 너무 빡빡하게 잘림 → `silence_thresh`를 올린다 (-35 → -30)
- 아직 빈 구간 많음 → `silence_thresh`를 낮춘다 (-35 → -40)
- 말 시작/끝이 잘림 → `keep_silence`를 올린다 (50 → 100)
- 짧은 숨소리도 잘라야 함 → `min_silence_len`을 줄인다 (300 → 200)
