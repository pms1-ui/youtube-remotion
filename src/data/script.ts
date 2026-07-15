export type SceneType =
  | "text"
  | "barChart"
  | "donutChart"
  | "lineGraph"
  | "highlight"
  | "compare"
  | "timeline";

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
  description?: string; // 메인 텍스트 아래 부연설명 (작은 글씨)
  durationInSeconds: number;
  accent?: string;
  barData?: BarData[];
  donutData?: DonutData[];
  lineData?: LineData[];
  bullets?: string[];
  bulletDescriptions?: string[]; // 각 bullet의 부연설명
  bulletValues?: number[];
  compareData?: CompareData;
  steps?: StepData[];
};

export const SCENES: Scene[] = [
  // 1. 공감 — 30대 변화 시작
  {
    type: "text",
    text: "30대,\n달라지기 시작하는 몸",
    durationInSeconds: 4,
    accent: "#6c5ce7",
  },

  // 2. 증상 나열 + 각 부연설명
  {
    type: "highlight",
    text: "몸이 보내는 신호",
    description: "30대부터 시작되는 대표적 변화",
    durationInSeconds: 7,
    accent: "#ff6b6b",
    bullets: ["체지방 증가", "근육 성장 둔화", "시력 저하", "잇몸 출혈"],
    bulletDescriptions: ["같은 식단인데 살이 붙음", "운동해도 반응이 느림", "눈이 침침해짐", "양치할 때 피가 남"],
  },

  // 3. 왜? + 하지만 가능성 있음
  {
    type: "text",
    text: "왜?",
    subtitle: "나이도 원인, 하지만 그게 전부는 아님",
    description: "20대보다 강한 30~40대도 얼마든지 존재",
    durationInSeconds: 5,
    accent: "#6c5ce7",
  },

  // 4. 핵심 원인 = 습관
  {
    type: "text",
    text: "결정적 차이",
    subtitle: "생활 습관",
    description: "30대부터 습관의 차이가 몸에 쌓이기 시작",
    durationInSeconds: 5,
    accent: "#6c5ce7",
  },

  // 5. 체감 영역 + 부연설명
  {
    type: "highlight",
    text: "습관이 드러나는 영역",
    description: "30대 중후반~40대에 분명하게 체감",
    durationInSeconds: 7,
    accent: "#fdcb6e",
    bullets: ["근력", "회복력", "시야", "건강 수치"],
    bulletDescriptions: ["같은 무게가 버거워짐", "운동 후 회복 지연", "가까운 글씨가 흐릿", "혈압·콜레스테롤 변화"],
  },

  // 6. 30대 → 40대 체감 심화
  {
    type: "compare",
    text: "시간이 지나면",
    description: "차이가 점점 분명해짐",
    durationInSeconds: 6,
    accent: "#fdcb6e",
    compareData: {
      left: { title: "30대 중후반", description: "서서히 느껴짐" },
      right: { title: "40대", description: "일상에서 체감" },
    },
  },

  // 7. 방향 제시 — 로드맵
  {
    type: "timeline",
    text: "건강 관리 로드맵",
    description: "지금 30대라면, 앞으로의 전략",
    durationInSeconds: 6,
    accent: "#6c5ce7",
    steps: [
      { label: "인지", description: "변화 파악" },
      { label: "실천", description: "습관 구축" },
      { label: "유지", description: "장기 건강" },
    ],
  },
];
