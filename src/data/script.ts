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
  // ===== 파트 1: 인트로 (5장면) =====
  { type: "text", characterImage: "char-01.png", text: "등 운동,\n한 세트에 몇 회?", subtitle: "반복 횟수의 과학", durationInSeconds: 10, accent: "#6c5ce7" },
  { type: "compare", characterImage: "char-02.png", text: "세트당 반복 횟수", description: "어떤 전략이 더 효과적?", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "8회", description: "무겁게\n스트렝스" }, right: { title: "14회", description: "가볍게\n자극 위주" } } },
  { type: "iconList", characterImage: "char-03.png", text: "반복 횟수의 고민", durationInSeconds: 10, accent: "#a29bfe", bullets: ["피라미드", "어센딩", "디센딩", "평균 몇 회?"] },
  { type: "splitFact", characterImage: "char-04.png", text: "등 운동의 상식", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "기존 상식", description: "반복 횟수는\n크게 상관없다" }, right: { title: "과학적 사실", description: "등 운동은\n완전히 다르다" } } },
  { type: "text", characterImage: "char-05.png", text: "두 배 빠른 등 성장", subtitle: "압도적 프레임 장착", durationInSeconds: 10, accent: "#00b894" },

  // ===== 파트 2: Schoenfeld 메타분석 (4장면) =====
  { type: "text", characterImage: "char-06.png", text: "Brad Schoenfeld\n메타분석", subtitle: "세계적 스포츠 과학자", durationInSeconds: 10, accent: "#4A90D9" },
  { type: "barChart", characterImage: "char-07.png", text: "근비대 수치 비교", description: "실패 지점까지 수행 시 차이 미미", durationInSeconds: 10, accent: "#4A90D9", barData: [{ label: "8회 고중량", value: 95, color: "#4A90D9" }, { label: "14회 저중량", value: 93, color: "#74b9ff" }] },
  { type: "splitFact", characterImage: "char-08.png", text: "볼륨설의 한계", durationInSeconds: 10, accent: "#ffd93d", compareData: { left: { title: "볼륨설", description: "횟수 상관없이\n볼륨만 채우면 된다" }, right: { title: "현실", description: "단관절·하체 운동\n통계일 뿐" } } },
  { type: "text", characterImage: "char-09.png", text: "등 운동은\n이야기가 다름", subtitle: "치명적 병목 존재", durationInSeconds: 10, accent: "#e17055" },

  // ===== 파트 3: 그립 피로 병목 (6장면) =====
  { type: "iconList", characterImage: "char-10.png", text: "약한 고리 먼저 탈락", durationInSeconds: 10, accent: "#e17055", bullets: ["전완근 악력 저하", "이두근 피로 누적", "광배근은 아직 쌩쌩"] },
  { type: "barChart", characterImage: "char-01.png", text: "반복 횟수별 악력 변화", description: "10회 초과 시 급격한 감소", durationInSeconds: 10, accent: "#e17055", barData: [{ label: "1~8회", value: 100, color: "#00b894" }, { label: "9~10회", value: 85, color: "#ffd93d" }, { label: "11~14회", value: 70, color: "#e17055" }] },
  { type: "splitFact", characterImage: "char-02.png", text: "11회째 현상", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "등 근육", description: "아직 쌩쌩" }, right: { title: "전완근", description: "이미 풀려버림" } } },
  { type: "highlight", characterImage: "char-03.png", text: "남은 횟수의 실체", description: "등이 아닌 반동과 팔 힘으로 당김", durationInSeconds: 10, accent: "#e17055", bullets: ["몸 반동", "팔 힘 의존", "장력 분산", "광배 이탈"], bulletDescriptions: ["억지로 당기는 동작", "이두가 대신 작동", "타겟에 안 감", "주인공이 빠짐"] },
  { type: "donutChart", characterImage: "char-04.png", text: "고반복 시 광배근 자극률", description: "나머지 30%는 반동·팔로 분산", durationInSeconds: 10, accent: "#e17055", donutData: [{ label: "광배근", value: 70, color: "#e17055" }, { label: "반동·팔", value: 30, color: "#333333" }] },
  { type: "highlight", characterImage: "char-05.png", text: "고반복의 치명적 병목", description: "14회 고집 시 마주하는 한계", durationInSeconds: 10, accent: "#e17055", bullets: ["전완근 피로", "그립 탈락", "광배 자극 감소", "보상 작용"], bulletValues: [85, 70, 45, 80] },

  // ===== 파트 4: 왜 8회인가 (4장면) =====
  { type: "donutChart", characterImage: "char-06.png", text: "광배근 근섬유 구성", description: "조직 검사 연구 (남성 기준)", durationInSeconds: 10, accent: "#4A90D9", donutData: [{ label: "속근 (Type II)", value: 71, color: "#4A90D9" }, { label: "지근 (Type I)", value: 29, color: "#555555" }] },
  { type: "iconList", characterImage: "char-07.png", text: "속근의 특성", durationInSeconds: 10, accent: "#4A90D9", bullets: ["폭발적 힘 생산", "무거운 부하에서 활성", "가벼운 무게에는 미반응"] },
  { type: "highlight", characterImage: "char-08.png", text: "등 운동 황금 범위", description: "전완 피로 최소 + 고역치 단위 활성", durationInSeconds: 10, accent: "#00b894", bullets: ["75~80% 1RM", "8회 수행", "고역치 운동단위", "전완 피로 최소"], bulletDescriptions: ["최대 중량 기준", "간신히 채울 무게", "큰 근섬유 동원", "그립 탈락 전 완료"] },
  { type: "text", characterImage: "char-09.png", text: "8회의 법칙", subtitle: "전완 피로 전에 광배 파괴", description: "고역치 운동 단위 폭발적 동원", durationInSeconds: 10, accent: "#00b894" },

  // ===== 파트 5: 풀업 EMG (2장면) =====
  { type: "barChart", characterImage: "char-10.png", text: "풀업 근전도(EMG)", description: "상체 전반의 협응 요구\n광배근 활성도 100% 초과", durationInSeconds: 10, accent: "#4A90D9", barData: [{ label: "광배근", value: 100, color: "#4A90D9" }, { label: "이두근", value: 78, color: "#74b9ff" }, { label: "하부승모", value: 65, color: "#a29bfe" }] },
  { type: "compare", characterImage: "char-01.png", text: "풀업: 8회 vs 14회+", description: "자세 유지 여부가 결과를 결정", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "고강도 8회", description: "자세 유지\n텐션 극대화" }, right: { title: "맨몸 14회+", description: "자세 무너짐\n어깨 부상 위험" } } },

  // ===== 파트 6: 이원화 전략 (4장면) =====
  { type: "donutChart", characterImage: "char-02.png", text: "하부승모·기립근 섬유 구성", description: "안정화 근육은 지근 위주", durationInSeconds: 10, accent: "#a29bfe", donutData: [{ label: "지근 (Type I)", value: 70, color: "#a29bfe" }, { label: "속근 (Type II)", value: 30, color: "#555555" }] },
  { type: "splitFact", characterImage: "char-03.png", text: "보조 운동의 위험", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "원인", description: "속근 개입 시도\n자세 틀어짐" }, right: { title: "결과", description: "회전근개 손상\n충돌 증후군" } } },
  { type: "compare", characterImage: "char-04.png", text: "등 운동 이원화 전략", description: "부상 없이 완벽한 입체감", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "메인 운동", description: "랫풀·시티드로우\n8회 고중량" }, right: { title: "보조 운동", description: "하부승모·대원근·후면삼각\n12~14회 경량" } } },
  { type: "iconList", characterImage: "char-05.png", text: "8회의 기준", durationInSeconds: 10, accent: "#00b894", bullets: ["자세가 안 틀어지는 중량", "전완 탈락 전 완료", "광배 속근 최대 동원"] },

  // ===== 파트 7: 스트랩 꿀팁 (2장면) =====
  { type: "barChart", characterImage: "char-06.png", text: "스트랩 사용 효과", description: "전완근 개입 30% 즉각 감소\n팔꿈치로만 당기는 기전 가능", durationInSeconds: 10, accent: "#00b894", barData: [{ label: "전완 개입 (無)", value: 100, color: "#e17055" }, { label: "전완 개입 (有)", value: 70, color: "#00b894" }] },
  { type: "timeline", characterImage: "char-07.png", text: "등 운동 최종 전략", durationInSeconds: 10, accent: "#6c5ce7", steps: [{ label: "스트랩 착용", description: "전완 피로 제거" }, { label: "8회 고중량", description: "메인 운동 광배 파괴" }, { label: "보조 12~14회", description: "하부승모·후면삼각 마무리" }] },

  // ===== 파트 8: 마이프로틴 광고 (10장면) =====
  { type: "text", characterImage: "char-08.png", text: "프로틴 할인 정보", subtitle: "등판만큼 중요한 단백질", durationInSeconds: 10, accent: "#4A90D9" },
  { type: "splitFact", characterImage: "char-09.png", text: "프로틴 가격 현실", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "현실", description: "프로틴 가격\n가파르게 상승" }, right: { title: "해결", description: "마이프로틴\n썸머 타임세일" } } },
  { type: "text", characterImage: "char-10.png", text: "마이프로틴\n썸머 타임세일", subtitle: "딱 이틀간 진행", durationInSeconds: 10, accent: "#4A90D9" },
  { type: "iconList", characterImage: "char-01.png", text: "세일 기간", durationInSeconds: 10, accent: "#4A90D9", bullets: ["7/20 (월) 저녁 7시 시작", "7/21 (화) 밤 11:59 종료", "딱 이틀간만"] },
  { type: "barChart", characterImage: "char-02.png", text: "할인 구조", description: "기본 할인 + 코드 할인 중첩", durationInSeconds: 10, accent: "#00b894", barData: [{ label: "기본 할인", value: 80, color: "#4A90D9" }, { label: "코드 TEAMMP", value: 39, color: "#00b894" }] },
  { type: "highlight", characterImage: "char-03.png", text: "할인코드: TEAMMP", description: "입력 시 추가 39% 할인 적용", durationInSeconds: 10, accent: "#00b894", bullets: ["최대 80% 타임세일", "코드 입력 시 +39%", "중첩 할인 가능"], bulletDescriptions: ["기본 특가", "TEAMMP 입력", "둘 다 적용"] },
  { type: "iconList", characterImage: "char-04.png", text: "추천 제품", durationInSeconds: 10, accent: "#4A90D9", bullets: ["임팩트웨이 프로틴 (WPC)", "임팩트웨이 아이솔레이트 (WPI)", "100% 유청 가성비 최강"] },
  { type: "splitFact", characterImage: "char-05.png", text: "추가 혜택", durationInSeconds: 10, accent: "#00b894", compareData: { left: { title: "트렌드 제품 담기", description: "최종 결제금액\n추가 7% 할인" }, right: { title: "사은품", description: "구매 금액대별\n최대 2개 증정" } } },
  { type: "text", characterImage: "char-06.png", text: "단백질 쟁여두고\n제대로 득근", subtitle: "할인 링크는 더보기란", durationInSeconds: 10, accent: "#00b894" },

  // ===== 파트 9: 아웃트로 (3장면) =====
  { type: "iconList", characterImage: "char-07.png", text: "오늘 영상이\n유익했다면", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["구독", "좋아요", "알림 설정", "Hype"] },
  { type: "text", characterImage: "char-08.png", text: "헬마드 구독자 여러분", subtitle: "오늘도 득근하세요", durationInSeconds: 10, accent: "#6c5ce7" },
];
