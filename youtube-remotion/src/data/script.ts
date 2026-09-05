export type SceneType =
  | "text"
  | "barChart"
  | "donutChart"
  | "lineGraph"
  | "highlight"
  | "compare"
  | "timeline"
  | "iconList"
  | "splitFact"
  | "radarChart"
  | "progressCards"
  | "muscleMap";

export type BarData = { label: string; value: number; color: string };
export type DonutData = { label: string; value: number; color: string };
export type LineData = { label: string; value: number };
export type CompareData = {
  left: { title: string; description: string };
  right: { title: string; description: string };
};
export type StepData = { label: string; description?: string };
export type RadarData = { axis: string; value: number };
export type ProgressCardData = {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  description?: string;
};
export type MuscleData = {
  name: string;
  activation: number;
  color: string;
};

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
  radarData?: RadarData[];
  progressCards?: ProgressCardData[];
  muscleData?: MuscleData[];
};

export const SCENES: Scene[] = [
  // 1. 훅
  {
    type: "text",
    text: "\"무겁게 안 들면\n근육 안 큰다\"",
    subtitle: "이 말, 철석같이 믿으셨죠?",
    description: "근데 최신 연구들은 정반대를 말합니다",
    durationInSeconds: 3.1,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },

  // 2. 인사
  {
    type: "text",
    text: "헬스 건강 정보\n헬마드",
    subtitle: "오늘 주제 — 무게의 진실",
    durationInSeconds: 5.1,
    accent: "#4A90D9",
    characterImage: "char-02.png",
  },

  // 3. 공감
  {
    type: "compare",
    text: "혹시 이런 경험\n있으신가요?",
    durationInSeconds: 9.5,
    accent: "#e17055",
    characterImage: "char-04.png",
    compareData: {
      left: { title: "무리한 고중량", description: "허리 삐끗\n부상 위험" },
      right: { title: "이 악물고 고중량만", description: "어깨·팔꿈치\n통증" },
    },
  },

  // 4. 후킹 질문
  {
    type: "text",
    text: "무겁게 안 들어도\n근육은 똑같이 큰다면?",
    subtitle: "상식을 뒤집는 얘기",
    description: "끝까지 보셔야 합니다",
    durationInSeconds: 8.4,
    accent: "#fdcb6e",
    characterImage: "char-05.png",
  },

  // 5. 핵심
  {
    type: "text",
    text: "근육 크기에\n무게는 결정적 변수가 아니다",
    subtitle: "핵심은 이겁니다",
    durationInSeconds: 4.5,
    accent: "#00b894",
    characterImage: "char-03.png",
  },

  // 6. 몬튼 실험 설계
  {
    type: "compare",
    text: "2016 몬튼 연구팀\n12주 실험",
    description: "평소 운동하던 남성 대상",
    durationInSeconds: 9.9,
    accent: "#6c5ce7",
    characterImage: "char-06.png",
    compareData: {
      left: { title: "고중량", description: "무겁게\n8~12회" },
      right: { title: "저중량", description: "가볍게\n20~25회" },
    },
  },

  // 7. 조건 — 실패지점
  {
    type: "text",
    text: "양쪽 다\n실패지점까지",
    subtitle: "더는 못 들 때까지 밀어붙임",
    description: "조건은 딱 하나였습니다",
    durationInSeconds: 5.0,
    accent: "#e17055",
    characterImage: "char-10.png",
  },

  // 8. 결과 — 근육 크기 동일 (barChart)
  {
    type: "barChart",
    text: "결과 — 근육 크기 증가\n두 그룹 사실상 동일",
    description: "가볍게 든 쪽도 똑같이 자랐다\n2016 Morton et al.",
    durationInSeconds: 3.0,
    accent: "#00b894",
    characterImage: "char-01.png",
    barData: [
      { label: "고중량", value: 100, color: "#4A90D9" },
      { label: "저중량", value: 98, color: "#00b894" },
    ],
  },

  // 9. 왜? — 스위치
  {
    type: "text",
    text: "성장 스위치는\n무게가 아니다",
    subtitle: "근섬유가 한계까지 동원되느냐",
    durationInSeconds: 5.5,
    accent: "#ffd93d",
    characterImage: "char-02.png",
  },

  // 10. 근섬유 동원 원리 (timeline)
  {
    type: "timeline",
    text: "근섬유 동원 순서",
    durationInSeconds: 9.3,
    accent: "#6c5ce7",
    steps: [
      { label: "작은 근섬유", description: "먼저 사용" },
      { label: "반복 누적", description: "앞쪽 지침" },
      { label: "큰 근섬유 총동원", description: "마지막에 깨어남" },
    ],
  },

  // 11. 근육은 무게가 아니라 자극을 느낌
  {
    type: "splitFact",
    text: "근육은 kg 숫자를\n읽지 않는다",
    durationInSeconds: 9.7,
    accent: "#fdcb6e",
    characterImage: "char-07.png",
    compareData: {
      left: { title: "무게 숫자", description: "근육은\n모른다" },
      right: { title: "쥐어짜인 정도", description: "이걸\n느낀다" },
    },
  },

  // 12. 함정 — 실패지점 필수
  {
    type: "text",
    text: "단, 함정이 있다",
    subtitle: "가볍게 들면 반드시 실패지점까지",
    description: "대충 끝내면 큰 근섬유 동원 전에 세트 종료 → 자극 급감",
    durationInSeconds: 9.3,
    accent: "#d63031",
    characterImage: "char-08.png",
  },

  // 13. 반전 — 최대 근력
  {
    type: "text",
    text: "그런데 여기서\n끝이 아닙니다",
    subtitle: "'힘', 최대 근력으로 가면 뒤집힌다",
    durationInSeconds: 5.5,
    accent: "#e17055",
    characterImage: "char-03.png",
  },

  // 14. 효과크기 비교 (barChart)
  {
    type: "barChart",
    text: "최대 근력 향상\n효과 크기",
    description: "고중량이 두 배 넘게 우세\n여러 메타분석 종합",
    durationInSeconds: 9.1,
    accent: "#4A90D9",
    characterImage: "char-09.png",
    barData: [
      { label: "고중량", value: 0.82, color: "#4A90D9" },
      { label: "저중량", value: 0.39, color: "#636e72" },
    ],
  },

  // 15. 2017 연구 — 전기신호
  {
    type: "compare",
    text: "2017 연구\n80% vs 30%",
    description: "근육 두께는 비슷하게 증가",
    durationInSeconds: 12.4,
    accent: "#6c5ce7",
    characterImage: "char-06.png",
    compareData: {
      left: { title: "80% 고중량", description: "근섬유 동원\n전기신호 ↑" },
      right: { title: "30% 저중량", description: "전기신호\n변화 미미" },
    },
  },

  // 16. 무거운 무게 = 신경계 훈련
  {
    type: "text",
    text: "무거운 무게 =\n신경계 훈련",
    subtitle: "첫 반복부터 강한 근섬유 빠르게 총동원",
    durationInSeconds: 5.1,
    accent: "#00cec9",
    characterImage: "char-01.png",
  },

  // 17. 빠르게 치고 빠지기 vs 글리코겐 고갈
  {
    type: "compare",
    text: "왜 힘엔 무거운 게\n유리할까",
    durationInSeconds: 11.9,
    accent: "#00b894",
    characterImage: "char-05.png",
    compareData: {
      left: { title: "무겁게 (몇 회)", description: "피로 전에\n빠르게 치고 빠짐" },
      right: { title: "가볍게 (오래)", description: "글리코겐 고갈\n젖산 축적" },
    },
  },

  // 18. 힘 훈련 실전 팁 — 짧고 굵게 + 충분히 쉬기
  {
    type: "text",
    text: "짧고 굵게,\n충분히 쉬기",
    subtitle: "지치기 전에 강한 근섬유 동원",
    description: "몇 회 안에 끝내고 세트 사이 충분히 휴식",
    durationInSeconds: 5.4,
    accent: "#00cec9",
    characterImage: "char-06.png",
  },

  // 19. 실전 정리 — 목표별 (compare)
  {
    type: "compare",
    text: "목표에 따라\n이렇게",
    durationInSeconds: 8.6,
    accent: "#fdcb6e",
    characterImage: "char-02.png",
    compareData: {
      left: { title: "근육 크기", description: "통제 가능한 무게\n실패지점까지" },
      right: { title: "최대 근력", description: "5~8회 안팎\n고중량 비중 ↑" },
    },
  },

  // 19. 강도 = 무게? 오해
  {
    type: "text",
    text: "강도 = 무게?\n이게 큰 오해입니다",
    subtitle: "무게 못 올려도 강도 올리는 법은 많다",
    durationInSeconds: 6.3,
    accent: "#ffd93d",
    characterImage: "char-04.png",
  },

  // 20. 방법 1 — 쉬는 시간
  {
    type: "barChart",
    text: "강도 올리기 ①\n쉬는 시간 줄이기",
    description: "같은 무게도 훨씬 빡세진다",
    durationInSeconds: 4.4,
    accent: "#e17055",
    characterImage: "char-07.png",
    barData: [
      { label: "2분 휴식", value: 60, color: "#636e72" },
      { label: "1분 휴식", value: 100, color: "#e17055" },
    ],
  },

  // 21. 방법 2 — 동작 난이도 (스미스<바벨<덤벨)
  {
    type: "barChart",
    text: "강도 올리기 ②\n동작을 어렵게",
    description: "안정성이 낮을수록 난이도 ↑\n스미스 < 바벨 < 덤벨",
    durationInSeconds: 10.5,
    accent: "#6c5ce7",
    characterImage: "char-10.png",
    barData: [
      { label: "스미스", value: 40, color: "#636e72" },
      { label: "바벨", value: 70, color: "#4A90D9" },
      { label: "덤벨", value: 100, color: "#6c5ce7" },
    ],
  },

  // 22. 덤벨 — 힘 17%↓ 근활성↑
  {
    type: "compare",
    text: "덤벨의 반전",
    durationInSeconds: 8.5,
    accent: "#00b894",
    characterImage: "char-03.png",
    compareData: {
      left: { title: "낼 수 있는 힘", description: "바벨보다\n17% 낮음" },
      right: { title: "근육 활성도", description: "오히려\n더 높음" },
    },
  },

  // 23. 정체기 대응
  {
    type: "highlight",
    text: "정체기가 왔다면",
    description: "무게 강박 대신 이렇게",
    durationInSeconds: 5.0,
    accent: "#00cec9",
    characterImage: "char-08.png",
    bullets: ["쉬는 시간 줄이기", "더 어려운 종목으로", "실패지점까지"],
  },

  // 24. 마무리
  {
    type: "text",
    text: "무게 강박,\n오늘 내려놓으시죠",
    subtitle: "구독·좋아요·알림·하이프 부탁드립니다",
    description: "헬마드, 오늘도 득근하는 하루 되세요",
    durationInSeconds: 7.2,
    accent: "#4A90D9",
    characterImage: "char-09.png",
  },
];
