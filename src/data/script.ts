export type SceneType =
  | "text"
  | "barChart"
  | "donutChart"
  | "lineGraph"
  | "highlight"
  | "compare"
  | "timeline"
  | "iconList"
  | "splitFact";

export type BarData = { label: string; value: number; color: string };
export type DonutData = { label: string; value: number; color: string };
export type LineData = { label: string; value: number };
export type CompareData = {
  left: { title: string; description: string };
  right: { title: string; description: string };
};
export type StepData = { label: string; description?: string };

export type Scene = {
  type: SceneType;
  title?: string;
  text: string;
  subtitle?: string;
  description?: string;
  durationInSeconds: number;
  accent?: string;
  characterImage?: string;
  barData?: BarData[];
  donutData?: DonutData[];
  lineData?: LineData[];
  bullets?: string[];
  bulletDescriptions?: string[];
  bulletValues?: number[];
  compareData?: CompareData;
  steps?: StepData[];
};

export const SCENES: Scene[] = [
  // ===== 인트로 — 후킹 (4장면) =====
  { type: "text", characterImage: "image_2026/char-01.png", text: "등 운동 열심히 하는데\nV테이퍼가 안 나온다?", subtitle: "이유가 있습니다", durationInSeconds: 7, accent: "#e17055" },
  { type: "barChart", characterImage: "image_2026/char-02.png", text: "같은 랫풀다운, 그립만 바꿔도", description: "광배근 활성도 차이 (2022 근전도 연구)", durationInSeconds: 8, accent: "#4A90D9", barData: [{ label: "와이드 그립", value: 63, color: "#74b9ff" }, { label: "내로우 중립", value: 100, color: "#00b894" }] },
  { type: "text", characterImage: "image_2026/char-03.png", text: "같은 무게, 같은 반복\n효과가 완전히 다르다", subtitle: "그립·각도·팔꿈치 방향이 핵심", durationInSeconds: 7, accent: "#ffd93d" },
  { type: "iconList", characterImage: "image_2026/char-04.png", text: "오늘의 3가지 등 구역", durationInSeconds: 7, accent: "#6c5ce7", bullets: ["등 하부 너비", "등 상부 너비", "등 두께"] },

  // ===== 등의 문제점 (3장면) =====
  { type: "donutChart", characterImage: "image_2026/char-05.png", text: "등 운동 시 부하 분배", description: "2019년 풀다운 연구 — 팔이 40% 가져감", durationInSeconds: 8, accent: "#e17055", donutData: [{ label: "등 근육", value: 60, color: "#4A90D9" }, { label: "이두+전완", value: 40, color: "#e17055" }] },
  { type: "highlight", characterImage: "image_2026/char-06.png", text: "등 15개+ 근육 구조", description: "강한 근육이 약한 근육을 잡아먹는다", durationInSeconds: 8, accent: "#6c5ce7", bullets: ["광배근", "대원근", "트랩(승모근)", "능형근", "후면 삼각근", "척추기립근"], bulletDescriptions: ["너비 담당", "V라인 보조", "두께 상부", "두께 중부", "후면 볼륨", "자세 안정"] },
  { type: "iconList", characterImage: "image_2026/char-07.png", text: "타겟을 바꾸는 3가지 키", durationInSeconds: 6, accent: "#00b894", bullets: ["그립 너비·방향", "상체 각도", "팔꿈치 궤적"] },

  // ===== 1번 운동: 내로우 그립 랫 풀다운 (5장면) =====
  { type: "text", characterImage: "image_2026/char-08.png", text: "등 하부 너비\n내로우 그립 랫 풀다운", subtitle: "타겟: 광배근 하부 + 대원근", durationInSeconds: 7, accent: "#4A90D9" },
  { type: "splitFact", characterImage: "image_2026/char-09.png", text: "와이드 그립의 함정", durationInSeconds: 8, accent: "#e17055", compareData: { left: { title: "와이드 그립", description: "팔꿈치 벌어짐\n견갑골 주변만 자극" }, right: { title: "내로우 중립", description: "팔꿈치 밀착\n광배근 집중 +22%" } } },
  { type: "highlight", characterImage: "image_2026/char-01.png", text: "실행법 핵심 큐", description: "어깨 너비 뉴트럴 그립", durationInSeconds: 8, accent: "#00b894", bullets: ["팔꿈치로 당기기", "호를 그리며 엉덩이로", "어깨를 귀에서 멀리", "상단에서 풀 스트레칭"], bulletDescriptions: ["손이 아닌 팔꿈치 시각화", "직선 X → 곡선 O", "트랩 개입 차단", "팔 완전히 펴고 어깨 올리기"] },
  { type: "barChart", characterImage: "image_2026/char-02.png", text: "풀 ROM vs 부분 ROM", description: "근비대 차이 (2023 메타분석)", durationInSeconds: 8, accent: "#00b894", barData: [{ label: "부분 ROM", value: 72, color: "#74b9ff" }, { label: "풀 ROM", value: 100, color: "#00b894" }] },
  { type: "text", characterImage: "image_2026/char-03.png", text: "스트레칭 안 하면\n성장의 1/3을 버린다", subtitle: "풀 렙 후 → 상단 하프 렙 추가", durationInSeconds: 7, accent: "#e17055" },

  // ===== 2번 운동: 와이드 그립 케이블 로우 (5장면) =====
  { type: "text", characterImage: "image_2026/char-04.png", text: "등 상부 너비\n와이드 그립 케이블 로우", subtitle: "타겟: 광배근 상부 + 후면 삼각근", durationInSeconds: 7, accent: "#6c5ce7" },
  { type: "barChart", characterImage: "image_2026/char-05.png", text: "전완 각도와 이두 개입", description: "45도 이상 기울면 이두 +34% (2020 연구)", durationInSeconds: 8, accent: "#e17055", barData: [{ label: "전완 평행", value: 66, color: "#00b894" }, { label: "전완 45도↑", value: 100, color: "#e17055" }] },
  { type: "iconList", characterImage: "image_2026/char-06.png", text: "핵심 수정 3가지", durationInSeconds: 8, accent: "#4A90D9", bullets: ["어깨보다 약간 넓은 그립", "상체 약간 앞으로 기울임", "전완 바닥과 평행 유지"] },
  { type: "splitFact", characterImage: "image_2026/char-07.png", text: "견갑골 움직임", durationInSeconds: 7, accent: "#00b894", compareData: { left: { title: "당길 때", description: "견갑골 모으기\n광배근 수축" }, right: { title: "돌아갈 때", description: "견갑골 최대 열기\n풀 스트레칭" } } },
  { type: "text", characterImage: "image_2026/char-08.png", text: "전완 평행 유지 =\n이두 차단 핵심", subtitle: "너무 많이 구부려 당기지 않는다", durationInSeconds: 7, accent: "#6c5ce7" },

  // ===== 3번 운동: 원암 덤벨 로우 (5장면) =====
  { type: "text", characterImage: "image_2026/char-09.png", text: "등 두께\n원암 덤벨 로우", subtitle: "타겟: 트랩 + 능형근 + 광배근 전체", durationInSeconds: 7, accent: "#ffd93d" },
  { type: "highlight", characterImage: "image_2026/char-01.png", text: "원암 로우의 장점", description: "바벨 로우 대비 가동범위 +19%", durationInSeconds: 8, accent: "#4A90D9", bullets: ["좌우 독립 자극", "불균형 교정", "넓은 가동범위", "흉추 가동성 보완"], bulletDescriptions: ["한쪽씩 집중", "약한 쪽 보강", "바벨 대비 +19%", "등 깊숙이 자극"] },
  { type: "iconList", characterImage: "image_2026/char-02.png", text: "실행법", durationInSeconds: 8, accent: "#00b894", bullets: ["인클라인 벤치 한 팔 기대기", "반대쪽 뒷다리 옆으로", "바닥 쓸어올리듯 호 그리기", "상단 1초 홀드 → 풀 스트레칭"] },
  { type: "text", characterImage: "image_2026/char-03.png", text: "더 못 당기면\n가동범위 줄여 실패지점", subtitle: "쥐어짜듯 끝내면 등 폭발 펌핑", durationInSeconds: 7, accent: "#e17055" },
  { type: "compare", characterImage: "image_2026/char-04.png", text: "원암 로우 vs 바벨 로우", durationInSeconds: 8, accent: "#ffd93d", compareData: { left: { title: "바벨 로우", description: "양손 고정\n가동범위 제한" }, right: { title: "원암 덤벨 로우", description: "독립 자극\nROM +19%" } } },

  // ===== 결론 (3장면) =====
  { type: "highlight", characterImage: "image_2026/char-05.png", text: "오늘의 3가지 정리", description: "등 너비 + 두께 동시에", durationInSeconds: 8, accent: "#4A90D9", bullets: ["내로우 풀다운", "와이드 케이블 로우", "원암 덤벨 로우"], bulletDescriptions: ["광배근 하부 + 대원근", "광배근 상부 + 승모근 + 후삼각", "트랩 + 능형근 + 광배근 전체"] },
  { type: "text", characterImage: "image_2026/char-06.png", text: "다음 등 운동 때\n바로 적용해 보세요", subtitle: "분명 차이 느끼실 겁니다", durationInSeconds: 7, accent: "#00b894" },
  { type: "iconList", characterImage: "image_2026/char-07.png", text: "영상이 유익했다면", durationInSeconds: 7, accent: "#6c5ce7", bullets: ["구독", "좋아요", "알림 설정", "하이프"] },
];
