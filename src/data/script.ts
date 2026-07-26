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
  // ===== 인트로 (3장면) =====
  { type: "text", characterImage: "image_2026/char-01.png", text: "그리스 신 체형을\n집에서 만들었다", subtitle: "맨몸운동 + 최소 장비 + 시스템", durationInSeconds: 10, accent: "#ffd93d" },
  { type: "barChart", characterImage: "image_2026/char-02.png", text: "맨몸 vs 웨이트 근비대", description: "12주 제지방량 증가율 (2022 시스테매틱 리뷰)", durationInSeconds: 10, accent: "#4A90D9", barData: [{ label: "맨몸운동", value: 3.2, color: "#00b894" }, { label: "웨이트", value: 3.5, color: "#4A90D9" }] },
  { type: "text", characterImage: "image_2026/char-03.png", text: "도구가 아니라\n자극의 질이 핵심", subtitle: "통계적 유의차 없음", durationInSeconds: 10, accent: "#00b894" },

  // ===== 시작 — 바닥에서 (3장면) =====
  { type: "iconList", characterImage: "image_2026/char-04.png", text: "가진 것 = 세 가지", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["내 몸", "내 방", "변하겠다는 의지"] },
  { type: "splitFact", characterImage: "image_2026/char-05.png", text: "시작점 → 현재", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "시작", description: "푸시업 15개\n하위 5% 수준" }, right: { title: "현재", description: "그리스 신 체형\n완전 변환" } } },
  { type: "barChart", characterImage: "image_2026/char-06.png", text: "8주 맨몸운동 효과", description: "초보자 근력 향상 (2023 BJSM)", durationInSeconds: 10, accent: "#00b894", barData: [{ label: "상체 근력", value: 28, color: "#4A90D9" }, { label: "하체 근력", value: 23, color: "#00b894" }] },

  // ===== 벌킹 실수 (3장면) =====
  { type: "text", characterImage: "image_2026/char-07.png", text: "크게 먹어야\n크게 된다?", subtitle: "인터넷 벌킹 신화의 함정", durationInSeconds: 10, accent: "#e17055" },
  { type: "barChart", characterImage: "image_2026/char-08.png", text: "벌킹의 현실", description: "12주 벌킹 후 체성분 변화\n(2020 국제비만학회지)", durationInSeconds: 10, accent: "#e17055", barData: [{ label: "근육 증가", value: 2.1, color: "#00b894" }, { label: "체지방 증가", value: 3.8, color: "#e17055" }] },
  { type: "compare", characterImage: "image_2026/char-09.png", text: "원래 목표 vs 현실", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "원래 목표", description: "강하고 날씬하고\n운동 능력 있는 몸" }, right: { title: "벌킹 결과", description: "무겁고 느리고\n체지방률 +4.2%p" } } },

  // ===== 기본으로 복귀 + 시스템 (3장면) =====
  { type: "iconList", characterImage: "image_2026/char-01.png", text: "기본 4가지 동작", durationInSeconds: 10, accent: "#4A90D9", bullets: ["푸시업", "풀업", "딥스", "딥 스쿼트"] },
  { type: "splitFact", characterImage: "image_2026/char-02.png", text: "운동 vs 훈련", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "전 (운동)", description: "랜덤 운동\n매일 뭐 할지 고민" }, right: { title: "후 (훈련)", description: "계획 존재\n답이 이미 있음" } } },
  { type: "barChart", characterImage: "image_2026/char-03.png", text: "계획의 힘", description: "운동 지속률 비교\n(2019 심리학 프론티어)", durationInSeconds: 10, accent: "#00b894", barData: [{ label: "계획 있음", value: 91, color: "#00b894" }, { label: "계획 없음", value: 47, color: "#e17055" }] },

  // ===== 핵심 원칙 1: 점진적 과부하 (2장면) =====
  { type: "barChart", characterImage: "image_2026/char-04.png", text: "점진적 과부하 효과", description: "12주 후 둘레 증가 비교\n(2020 EJSS)", durationInSeconds: 10, accent: "#4A90D9", barData: [{ label: "맨몸 팔", value: 1.8, color: "#00b894" }, { label: "웨이트 팔", value: 2.0, color: "#4A90D9" }, { label: "맨몸 가슴", value: 2.3, color: "#00cec9" }, { label: "웨이트 가슴", value: 2.5, color: "#6c5ce7" }] },
  { type: "highlight", characterImage: "image_2026/char-05.png", text: "과부하 적용 방법", description: "주당 볼륨 5~10% 증가", durationInSeconds: 10, accent: "#ffd93d", bullets: ["더 어려운 변형", "템포 조절 3초+1초", "세트 간 휴식 단축", "반복 수 점진 증가"], bulletDescriptions: ["아처→원암 푸시업", "하강 3초 정지 1초", "90초→60초→45초", "매주 2회씩 추가"] },

  // ===== 핵심 원칙 2: 고반복 (2장면) =====
  { type: "barChart", characterImage: "image_2026/char-06.png", text: "고반복 vs 저반복 근비대", description: "근섬유 단면적 증가 비교\n(2021 스포츠의학 저널)", durationInSeconds: 10, accent: "#6c5ce7", barData: [{ label: "고반복(15~40회)", value: 7.1, color: "#6c5ce7" }, { label: "저반복(6~12회)", value: 7.6, color: "#4A90D9" }] },
  { type: "highlight", characterImage: "image_2026/char-07.png", text: "고반복의 추가 이점", description: "근비대는 동일 + 보너스 효과", durationInSeconds: 10, accent: "#00b894", bullets: ["근지구력 +18.3%", "체지방 -1.4%p", "기능적 근육 형성", "일석삼조 효과"], bulletValues: [83, 71, 90, 95] },

  // ===== 핵심 원칙 3: 시스템 (2장면) =====
  { type: "barChart", characterImage: "image_2026/char-08.png", text: "시스템 vs 동기부여", description: "6개월 내 탈락률 비교\n(2023 행동과학 연구)", durationInSeconds: 10, accent: "#e17055", barData: [{ label: "동기부여 기반", value: 73, color: "#e17055" }, { label: "시스템 기반", value: 26, color: "#00b894" }] },
  { type: "iconList", characterImage: "image_2026/char-09.png", text: "시스템 구축법", durationInSeconds: 10, accent: "#4A90D9", bullets: ["월수금: 상체 (푸시업+딥스)", "화목토: 하체+당기기", "매주 반복 수 기록", "5~10% 점진 증가"] },

  // ===== 6개월 변화 + 내면 변화 (3장면) =====
  { type: "highlight", characterImage: "image_2026/char-01.png", text: "6개월 맨몸운동 결과", description: "하버드 보건대학원 2022", durationInSeconds: 10, accent: "#00b894", bullets: ["체지방 -4.7%p", "악력 +19%", "유연성 +23%", "자기효능감 +34%"], bulletValues: [47, 19, 23, 34] },
  { type: "text", characterImage: "image_2026/char-02.png", text: "가장 큰 변화는\n몸이 아니라 내면", subtitle: "자존감 +0.47 SD (항우울제 수준)", durationInSeconds: 10, accent: "#6c5ce7" },
  { type: "iconList", characterImage: "image_2026/char-03.png", text: "운동이 바꾸는 것들", durationInSeconds: 10, accent: "#ffd93d", bullets: ["자신감", "자세", "규율", "인생을 대하는 태도"] },

  // ===== 결론 & 아웃트로 (3장면) =====
  { type: "highlight", characterImage: "image_2026/char-04.png", text: "정리: 3가지 원칙", description: "집에서 그리스 신 체형 만들기", durationInSeconds: 10, accent: "#4A90D9", bullets: ["점진적 과부하", "고반복 훈련", "시스템 구축"], bulletDescriptions: ["주당 5~10% 볼륨↑", "근비대+체지방↓+지구력↑", "요일별 고정 + 기록"] },
  { type: "text", characterImage: "image_2026/char-05.png", text: "여러분의 몸이\n최고의 장비다", subtitle: "오늘 밤 푸시업 한 세트부터", durationInSeconds: 10, accent: "#ffd93d" },
  { type: "iconList", characterImage: "image_2026/char-06.png", text: "영상이 유익했다면", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["구독", "좋아요", "알림 설정", "하이프"] },
];
