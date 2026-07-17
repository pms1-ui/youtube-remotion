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
  description?: string;
  durationInSeconds: number;
  accent?: string;
  characterImage?: string; // public/ 폴더 내 이미지 파일명
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
  // ===== 파트 1: 인트로 & 질문 =====

  // 1. 인트로 질문
  {
    type: "text",
    text: "등 운동,\n한 세트에 몇 회?",
    subtitle: "반복 횟수의 과학",
    durationInSeconds: 4,
    accent: "#6c5ce7",
    characterImage: "char-s1.png",
  },

  // 2. 8회 vs 14회
  {
    type: "compare",
    text: "무엇이 더 효과적?",
    description: "피라미드, 어센딩, 디센딩… 평균 반복 횟수의 고민",
    durationInSeconds: 5,
    accent: "#6c5ce7",
    characterImage: "char-s2.png",
    compareData: {
      left: { title: "8회", description: "무겁게\n스트렝스 위주" },
      right: { title: "14회", description: "가볍게\n자극 위주" },
    },
  },

  // 3. 상식 전복 예고
  {
    type: "text",
    text: "등 운동의 상식",
    subtitle: "완전히 뒤집힘",
    description: "과학적 연구가 증명하는 충격적 사실",
    durationInSeconds: 4,
    accent: "#6c5ce7",
    characterImage: "char-s3.png",
  },

  // 4. 절반 자극 경고 — 도넛 차트 (스크립트: "딱 절반밖에 자극받지 못했을")
  {
    type: "donutChart",
    text: "잘못된 반복 횟수 선택 시",
    description: "반복 횟수별 근육 쓰임의 차이를 모를 때",
    durationInSeconds: 6,
    accent: "#e17055",
    characterImage: "char-s4.png",
    donutData: [
      { label: "실제 자극", value: 50, color: "#e17055" },
      { label: "손실된 자극", value: 50, color: "#333333" },
    ],
  },

  // 5. 두 배 빠른 성장
  {
    type: "text",
    text: "두 배 빠른 등 성장",
    subtitle: "압도적 프레임 장착",
    durationInSeconds: 4,
    accent: "#00b894",
    characterImage: "char-scene5.png",
  },

  // ===== 파트 2: Schoenfeld 메타분석 =====

  // 6. 메타분석 결과 — 막대 차트 (스크립트: 근성장 수치 거의 비슷)
  {
    type: "barChart",
    text: "Schoenfeld 메타분석 결과",
    description: "실패 지점까지 수행 시, 근비대 차이 미미",
    durationInSeconds: 7,
    accent: "#4A90D9",
    characterImage: "char-s6.png",
    barData: [
      { label: "8회 (고중량)", value: 95, color: "#4A90D9" },
      { label: "14회 (저중량)", value: 93, color: "#74b9ff" },
    ],
  },

  // 7. 이론의 한계
  {
    type: "text",
    text: "단, 조건이 있음",
    subtitle: "단순 단관절·하체 운동 기준",
    description: "전신 통제가 가능한 운동에서의 통계일 뿐",
    durationInSeconds: 5,
    accent: "#ffd93d",
    characterImage: "char-s7.png",
  },

  // 8. 등은 다르다
  {
    type: "text",
    text: "등 운동은\n이야기가 다름",
    subtitle: "치명적 병목 현상 존재",
    durationInSeconds: 4,
    accent: "#e17055",
    characterImage: "char-s8.png",
  },

  // ===== 파트 3: 그립 피로 병목 =====

  // 9. 악력 30% 감소 — 막대 차트 (스크립트: "악력이 최대 30% 이상 급격하게 감소")
  {
    type: "barChart",
    text: "고반복 시 악력 변화",
    description: "10회 초과 시 전완근 피로도 급증",
    durationInSeconds: 6,
    accent: "#e17055",
    barData: [
      { label: "1~8회", value: 100, color: "#00b894" },
      { label: "9~10회", value: 85, color: "#ffd93d" },
      { label: "11~14회", value: 70, color: "#e17055" },
    ],
  },

  // 10. 11회째 뇌정지 현상
  {
    type: "text",
    text: "11회째,\n등은 쌩쌩한데",
    subtitle: "전완근이 먼저 풀림",
    description: "광배근이 지치기 전에 그립이 탈락하는 현상",
    durationInSeconds: 5,
    accent: "#e17055",
  },

  // 11. 광배근 70% 자극 — 도넛 차트 (스크립트: "광배근은 70% 정도밖에 자극하지 못하는")
  {
    type: "donutChart",
    text: "고반복 시 광배근 자극률",
    description: "나머지는 반동·팔 힘으로 분산",
    durationInSeconds: 6,
    accent: "#e17055",
    donutData: [
      { label: "광배근 자극", value: 70, color: "#e17055" },
      { label: "반동·팔 분산", value: 30, color: "#333333" },
    ],
  },

  // ===== 파트 4: 왜 8회인가 — 속근 섬유 =====

  // 12. 광배근 속근 비율 — 도넛 차트 (스크립트: "속근 섬유의 비율이 최대 71%")
  {
    type: "donutChart",
    text: "광배근 근섬유 구성",
    description: "조직 검사 연구 기반 (남성 기준)",
    durationInSeconds: 6,
    accent: "#4A90D9",
    donutData: [
      { label: "속근 (Type II)", value: 71, color: "#4A90D9" },
      { label: "지근 (Type I)", value: 29, color: "#555555" },
    ],
  },

  // 13. 고중량의 이점
  {
    type: "text",
    text: "강한 기계적 장력",
    subtitle: "폭발적 근비대 신호",
    description: "속근 섬유는 무거운 부하에서 최대 활성화",
    durationInSeconds: 5,
    accent: "#4A90D9",
  },

  // 14. 75~80% 1RM 규칙
  {
    type: "highlight",
    text: "등 운동 황금 반복 범위",
    description: "전완근 조기 피로 최소화 + 고역치 운동 단위 활성화",
    durationInSeconds: 6,
    accent: "#00b894",
    bullets: ["75~80% 1RM", "8회 수행", "고역치 운동단위", "전완 피로 최소"],
    bulletDescriptions: [
      "자신의 최대 중량 기준",
      "간신히 채울 수 있는 무게",
      "가장 큰 근섬유 동원",
      "그립 탈락 전 완료",
    ],
  },

  // ===== 파트 5: 풀업 EMG =====

  // 15. 풀업 EMG — 막대 차트 (스크립트: "광배근 활성도가 무려 100% 초과")
  {
    type: "barChart",
    text: "풀업 근전도(EMG) 데이터",
    description: "상체 전반의 협응과 힘을 요구",
    durationInSeconds: 6,
    accent: "#4A90D9",
    barData: [
      { label: "광배근", value: 100, color: "#4A90D9" },
      { label: "이두근", value: 78, color: "#74b9ff" },
      { label: "하부승모", value: 65, color: "#a29bfe" },
    ],
  },

  // 16. 나쁜 자세 풀업 경고
  {
    type: "compare",
    text: "풀업: 8회 vs 14회",
    description: "자세 유지 여부가 결과를 결정",
    durationInSeconds: 5,
    accent: "#e17055",
    compareData: {
      left: { title: "가중 8회", description: "자세 유지\n기계적 텐션 극대화" },
      right: { title: "맨몸 14회+", description: "자세 무너짐\n어깨 부상 위험 증가" },
    },
  },

  // ===== 파트 6: 랫풀다운 30도 =====

  // 17. 랫풀다운 각도 — 막대 차트 (스크립트: "20% 이상 유의미하게 상승")
  {
    type: "barChart",
    text: "랫풀다운 각도별 광배근 활성",
    description: "국제 학술지 근전도 분석 논문 기반",
    durationInSeconds: 6,
    accent: "#00b894",
    barData: [
      { label: "수직 (0°)", value: 80, color: "#74b9ff" },
      { label: "30° 기울임", value: 100, color: "#00b894" },
    ],
  },

  // 18. 8회 + 30도 조합
  {
    type: "text",
    text: "30도 기울임 + 8회",
    subtitle: "광배근 전체 펌핑 극대화",
    description: "전완근 탈락 전에 광배근 미세 손상 유도",
    durationInSeconds: 5,
    accent: "#00b894",
  },

  // ===== 파트 7: 이원화 전략 =====

  // 19. 하부승모 지근 비율 — 도넛 차트 (스크립트: "지근 섬유의 비율이 약 70% 이상")
  {
    type: "donutChart",
    text: "하부승모·기립근 근섬유 구성",
    description: "안정화 근육은 지근 위주로 구성",
    durationInSeconds: 6,
    accent: "#a29bfe",
    donutData: [
      { label: "지근 (Type I)", value: 70, color: "#a29bfe" },
      { label: "속근 (Type II)", value: 30, color: "#555555" },
    ],
  },

  // 20. 이원화 전략 — compare
  {
    type: "compare",
    text: "등 운동 이원화 전략",
    description: "부상 없이 완벽한 입체감 장착",
    durationInSeconds: 6,
    accent: "#6c5ce7",
    compareData: {
      left: { title: "메인 운동", description: "랫풀·시티드로우\n8~10회 고중량" },
      right: { title: "보조 운동", description: "하부승모 타겟\n12~14회 가벼운 부하" },
    },
  },

  // ===== 파트 8: 스트랩 꿀팁 =====

  // 21. 스트랩 효과 — 막대 차트 (스크립트: "전완근 개입도를 30% 이상 즉각 줄이고")
  {
    type: "barChart",
    text: "스트랩 사용 시 효과",
    description: "전완근 개입 30% 감소 → 광배근 집중도 상승",
    durationInSeconds: 6,
    accent: "#00b894",
    barData: [
      { label: "전완근 개입 (無)", value: 100, color: "#e17055" },
      { label: "전완근 개입 (有)", value: 70, color: "#00b894" },
    ],
  },

  // 22. 최종 실전 가이드 — timeline
  {
    type: "timeline",
    text: "등 운동 최종 전략",
    durationInSeconds: 7,
    accent: "#6c5ce7",
    steps: [
      { label: "스트랩 착용", description: "전완 피로 사전 제거" },
      { label: "30° 기울임", description: "랫풀다운 자세 세팅" },
      { label: "8~10회", description: "고중량으로 광배근 집중 파괴" },
      { label: "보조 12~14회", description: "하부승모·기립근 마무리" },
    ],
  },

  // ===== 파트 9: 광고 (마이프로틴) =====

  // 23. 마이프로틴 세일 정보
  {
    type: "highlight",
    text: "마이프로틴 썸머 타임세일",
    description: "7/20(월) 19:00 ~ 7/21(화) 23:59 (이틀간)",
    durationInSeconds: 7,
    accent: "#4A90D9",
    bullets: ["최대 80% 할인", "코드: TEAMMP", "추가 39% 할인", "사은품 최대 2개"],
    bulletDescriptions: [
      "타임세일 기본 특가",
      "할인코드 입력 시",
      "기본 할인에 추가 적용",
      "구매 금액대별 증정",
    ],
  },

  // 24. 추천 제품
  {
    type: "highlight",
    text: "추천 제품",
    description: "100% 유청 WPC·WPI 가성비 최강",
    durationInSeconds: 5,
    accent: "#4A90D9",
    bullets: ["임팩트웨이 프로틴", "임팩트웨이 아이솔레이트", "트렌드 제품 추가 7%"],
    bulletDescriptions: [
      "WPC 스테디셀러",
      "WPI 고순도 유청",
      "이달의 트렌드 상품 담기 시",
    ],
  },

  // ===== 파트 10: 아웃트로 =====

  // 25. 아웃트로
  {
    type: "text",
    text: "오늘도 득근하세요",
    subtitle: "구독 · 좋아요 · 알림 · Hype",
    durationInSeconds: 4,
    accent: "#6c5ce7",
  },
];
