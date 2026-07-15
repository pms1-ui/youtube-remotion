export type SceneType =
  | "intro"
  | "text"
  | "barChart"
  | "donutChart"
  | "lineGraph"
  | "highlight"
  | "outro";

export type BarData = { label: string; value: number; color: string };
export type DonutData = { label: string; value: number; color: string };
export type LineData = { label: string; value: number };

export type Scene = {
  type: SceneType;
  title?: string;
  text: string;
  durationInSeconds: number;
  accent?: string;
  barData?: BarData[];
  donutData?: DonutData[];
  lineData?: LineData[];
  bullets?: string[];
};

export const SCENES: Scene[] = [
  // 1. 인트로
  {
    type: "intro",
    title: "헬마드",
    text: "안녕하세요.\n헬스 건강 정보 헬마드입니다.",
    durationInSeconds: 6,
    accent: "#00e5ff",
  },

  // 2. 30대 변화 — 도넛 차트
  {
    type: "donutChart",
    title: "30대의 변화",
    text: "30대가 되면 나타나는 몸의 변화들",
    durationInSeconds: 10,
    accent: "#ff6b6b",
    donutData: [
      { label: "체지방 증가", value: 72, color: "#ff6b6b" },
      { label: "근육량 감소", value: 58, color: "#feca57" },
      { label: "시력 저하", value: 45, color: "#48dbfb" },
      { label: "잇몸 질환", value: 38, color: "#ff9ff3" },
    ],
  },

  // 3. 긍정 메시지
  {
    type: "text",
    title: "",
    text: "물론 20대보다 더 강하고 좋은 몸을\n만드는 30대, 40대도 얼마든지 있습니다.",
    durationInSeconds: 8,
    accent: "#4ecdc4",
  },

  // 4. 핵심 포인트 — 막대 차트
  {
    type: "barChart",
    title: "생활 습관의 영향",
    text: "30대부터 습관 차이가 몸에 쌓입니다",
    durationInSeconds: 10,
    accent: "#ffd93d",
    barData: [
      { label: "근력", value: 85, color: "#ffd93d" },
      { label: "회복력", value: 70, color: "#ff9f43" },
      { label: "시력", value: 55, color: "#ee5a24" },
      { label: "혈압", value: 60, color: "#e056fd" },
      { label: "수면질", value: 45, color: "#7158e2" },
    ],
  },

  // 5. 방법 안내
  {
    type: "text",
    title: "",
    text: "지금 30대라면\n앞으로를 젊고 건강하게 살 수 있는\n방법을 알려드리겠습니다.",
    durationInSeconds: 7,
    accent: "#a29bfe",
  },

  // 6. 운동 영역 — 도넛 차트
  {
    type: "donutChart",
    title: "운동의 영역",
    text: "운동이 커버하는 것들",
    durationInSeconds: 10,
    accent: "#00b894",
    donutData: [
      { label: "근육·체력", value: 90, color: "#00b894" },
      { label: "혈당 조절", value: 75, color: "#00cec9" },
      { label: "정신 건강", value: 80, color: "#55efc4" },
    ],
  },

  // 7. 운동으로 안 되는 것 — 막대 차트
  {
    type: "barChart",
    title: "운동만으로는 부족",
    text: "운동 외 별도 관리가 필요한 영역",
    durationInSeconds: 10,
    accent: "#e17055",
    barData: [
      { label: "수정체", value: 95, color: "#e17055" },
      { label: "잇몸", value: 88, color: "#fab1a0" },
      { label: "혈압수치", value: 82, color: "#fdcb6e" },
      { label: "콜레스테롤", value: 78, color: "#ffeaa7" },
    ],
  },

  // 8. 오늘의 주제 하이라이트
  {
    type: "highlight",
    title: "오늘의 주제",
    text: "30~40대가 신경 써야 할\n몸의 변화 4가지와 관리 우선순위",
    durationInSeconds: 8,
    accent: "#fd79a8",
    bullets: ["근력 변화", "시력 관리", "구강 건강", "혈액 수치"],
  },

  // 9. 근력 변화 라인 그래프
  {
    type: "lineGraph",
    title: "근력과 수행 능력의 변화",
    text: "근육량·근력은 30~35세 전후 정점 후 서서히 감소",
    durationInSeconds: 10,
    accent: "#6c5ce7",
    lineData: [
      { label: "20대", value: 82 },
      { label: "30초", value: 100 },
      { label: "30후", value: 91 },
      { label: "40대", value: 76 },
      { label: "50대", value: 62 },
      { label: "60대", value: 48 },
    ],
  },

  // 10. 감소 요인 — 막대 차트
  {
    type: "barChart",
    title: "감소를 가속하는 요인",
    text: "나쁜 습관이 겹치면 차이가 벌어집니다",
    durationInSeconds: 10,
    accent: "#fdcb6e",
    barData: [
      { label: "좌식생활", value: 92, color: "#fdcb6e" },
      { label: "수면부족", value: 85, color: "#f39c12" },
      { label: "불규칙식사", value: 78, color: "#e74c3c" },
      { label: "운동부족", value: 88, color: "#d63031" },
    ],
  },
];
