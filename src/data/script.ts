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
  { type: "splitFact", characterImage: "char-01.png", text: "아웃타이 = 부끄러운 기구?", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "고정관념", description: "여성·에겐남\n전용 기구" }, right: { title: "현실", description: "전신 출력\n극대화 핵심" } } },
  { type: "iconList", characterImage: "char-02.png", text: "놓치고 있던 기회", durationInSeconds: 10, accent: "#00b894", bullets: ["스쿼트 중량 폭발", "데드리프트 자세 교정", "무릎·허리 통증 해결", "코어 안정성 강화"] },
  { type: "compare", characterImage: "char-03.png", text: "아웃타이의 진실", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "오해", description: "에겐남 기구\n부끄러운 운동" }, right: { title: "진실", description: "하체·코어·전신\n출력 극대화" } } },
  { type: "text", characterImage: "char-04.png", text: "스쿼트 100kg\n정체기 탈출", subtitle: "아웃타이가 열쇠", durationInSeconds: 10, accent: "#4A90D9" },
  { type: "text", characterImage: "char-05.png", text: "오늘 끝까지\n보셔야 합니다", subtitle: "하체·코어·전신의 비밀", durationInSeconds: 10, accent: "#e17055" },

  // ===== 파트 2: 중둔근의 중요성 (7장면) =====
  { type: "text", characterImage: "char-06.png", text: "중둔근", subtitle: "골반 균형의 핵심 근육", durationInSeconds: 10, accent: "#4A90D9" },
  { type: "highlight", characterImage: "char-07.png", text: "중둔근의 역할", description: "척추·골반을 잡아주는 동적 안정화 스위치", durationInSeconds: 10, accent: "#4A90D9", bullets: ["척추·골반 고정", "동적 안정화", "현대인 필수 근육", "좌우 균형 유지"], bulletDescriptions: ["기둥 역할", "움직임 중 지지", "좌식 생활 약화", "한쪽 무너짐 방지"] },
  { type: "donutChart", characterImage: "char-08.png", text: "만성 허리 통증 환자", description: "ACSM 연구 결과\n중둔근 약화 비율", durationInSeconds: 10, accent: "#e17055", donutData: [{ label: "중둔근 약화", value: 80, color: "#e17055" }, { label: "기타 원인", value: 20, color: "#555555" }] },
  { type: "splitFact", characterImage: "char-09.png", text: "중둔근 약화 시", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "1차 증상", description: "골반 틀어짐\n허리 휨" }, right: { title: "2차 결과", description: "외반슬 발생\n무릎 안으로 무너짐" } } },
  { type: "iconList", characterImage: "char-10.png", text: "이런 증상이면 주목", durationInSeconds: 10, accent: "#e17055", bullets: ["스쿼트 시 무릎 모임", "데드 시 허리 말림", "중량 정체기", "무릎·허리 통증"] },
  { type: "barChart", characterImage: "char-01.png", text: "문제의 실제 원인", description: "하체 힘 부족이 아닌 안정성 부족", durationInSeconds: 10, accent: "#4A90D9", barData: [{ label: "하체 힘 부족", value: 30, color: "#74b9ff" }, { label: "중둔근 약화", value: 70, color: "#e17055" }] },
  { type: "text", characterImage: "char-02.png", text: "힘이 아니라\n안정성 문제", subtitle: "중둔근이 버티지 못함", durationInSeconds: 10, accent: "#e17055" },

  // ===== 파트 3: 중량 증가 효과 (6장면) =====
  { type: "text", characterImage: "char-03.png", text: "중둔근 강화 =\n중량 증가?", subtitle: "2022 JSCR 메타분석", durationInSeconds: 10, accent: "#4A90D9" },
  { type: "barChart", characterImage: "char-04.png", text: "스쿼트 1RM 변화 (8주)", description: "힙 어브덕션 추가 그룹 vs 대조군", durationInSeconds: 10, accent: "#00b894", barData: [{ label: "대조군", value: 5, color: "#74b9ff" }, { label: "아웃타이 추가", value: 15, color: "#00b894" }] },
  { type: "splitFact", characterImage: "char-05.png", text: "왜 중량이 오르나", durationInSeconds: 10, accent: "#00b894", compareData: { left: { title: "원인", description: "골반 하부 구조\n단단하게 고정" }, right: { title: "결과", description: "힘 손실 차단\n출력 온전히 전달" } } },
  { type: "iconList", characterImage: "char-06.png", text: "골반 안정성 영향 범위", durationInSeconds: 10, accent: "#4A90D9", bullets: ["스쿼트 하체 출력", "데드리프트 허리 보호", "벤치 레그 드라이브", "OHP 코어 지지력"] },
  { type: "text", characterImage: "char-07.png", text: "상하체 불문\n출력 극대화", subtitle: "마법의 버튼", durationInSeconds: 10, accent: "#00b894" },
  { type: "donutChart", characterImage: "char-08.png", text: "힘 전달 효율", description: "골반 안정 여부에 따른 출력 전달률", durationInSeconds: 10, accent: "#00b894", donutData: [{ label: "골반 안정 시", value: 95, color: "#00b894" }, { label: "불안정 시", value: 65, color: "#e17055" }] },

  // ===== 파트 4: 3단계 자세 (9장면) =====
  { type: "text", characterImage: "char-09.png", text: "효과 100% 보는\n3단계 자세", subtitle: "정확한 폼이 필수", durationInSeconds: 10, accent: "#6c5ce7" },
  { type: "highlight", characterImage: "char-10.png", text: "1단계: 엉덩이 밀착", description: "패드 깊숙이 + 척추 중립", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["패드 깊숙이 밀착", "요추 말림 방지", "척추 중립 유지"], bulletDescriptions: ["엉덩이 빠짐 X", "허리 둥글게 X", "생체역학적 안정"] },
  { type: "splitFact", characterImage: "char-01.png", text: "상체 숙이기?", durationInSeconds: 10, accent: "#ffd93d", compareData: { left: { title: "장점", description: "자극감 ↑\n중둔근 스트레치" }, right: { title: "단점", description: "골반 고정력 ↓\n고중량 안정성 ↓" } } },
  { type: "text", characterImage: "char-02.png", text: "목표는 힙업 아님", subtitle: "골반 고정력 = 고중량 안정성", durationInSeconds: 10, accent: "#6c5ce7" },
  { type: "highlight", characterImage: "char-03.png", text: "2단계: 고관절 외전", description: "무릎이 아닌 고관절이 회전축", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["고관절 외전 의식", "엉덩이 옆상단 타겟", "허벅지 힘 X"], bulletDescriptions: ["무릎으로 밀지 않기", "중둔근 정확히 수축", "대퇴 개입 최소화"] },
  { type: "iconList", characterImage: "char-04.png", text: "3단계: 템포 제어", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["1초 수축 (벌리기)", "3초 신장성 수축 (모으기)", "반동 절대 금지", "쾅 소리 X"] },
  { type: "compare", characterImage: "char-05.png", text: "올바른 vs 잘못된 수행", durationInSeconds: 10, accent: "#e17055", compareData: { left: { title: "올바른", description: "고립·템포\n중둔근 집중" }, right: { title: "잘못된", description: "반동·상체흔들림\n허리 부상" } } },
  { type: "highlight", characterImage: "char-06.png", text: "실전 세팅", description: "아웃타이 최적 프로토콜", durationInSeconds: 10, accent: "#00b894", bullets: ["15~20회 반복", "고립 집중", "원레그 추천", "웜업 3세트"], bulletDescriptions: ["가동범위 충분히", "중둔근만 의식", "골반 불균형 시", "스쿼트 전 필수"] },
  { type: "timeline", characterImage: "char-07.png", text: "아웃타이 실전 루틴", durationInSeconds: 10, accent: "#6c5ce7", steps: [{ label: "웜업 아웃타이", description: "3세트 15~20회" }, { label: "스쿼트 메인", description: "골반 안정 확인" }, { label: "데드리프트", description: "허리 말림 방지" }, { label: "마무리 원레그", description: "좌우 균형 교정" }] },

  // ===== 파트 5: 결론 (5장면) =====
  { type: "splitFact", characterImage: "char-08.png", text: "아웃타이의 정체", durationInSeconds: 10, accent: "#6c5ce7", compareData: { left: { title: "오해", description: "여성·에겐남\n전유물" }, right: { title: "사실", description: "전신 출력 극대화\n필수 기구" } } },
  { type: "text", characterImage: "char-09.png", text: "내일 헬스장 가면", subtitle: "웜업으로 아웃타이 3세트", durationInSeconds: 10, accent: "#00b894" },
  { type: "iconList", characterImage: "char-10.png", text: "바뀌는 것들", durationInSeconds: 10, accent: "#00b894", bullets: ["하체 단단함", "고중량 안정감", "허리 보호", "무릎 보호", "쇠질 수명 연장"] },
  { type: "text", characterImage: "char-01.png", text: "엉덩이가 튼튼해야\n모든 게 산다", subtitle: "허리·무릎·근육량 떡상", durationInSeconds: 10, accent: "#6c5ce7" },

  // ===== 파트 6: 아웃트로 (2장면) =====
  { type: "iconList", characterImage: "char-02.png", text: "영상이 유익했다면", durationInSeconds: 10, accent: "#6c5ce7", bullets: ["구독", "좋아요", "알림 설정", "하이프"] },
  { type: "text", characterImage: "char-03.png", text: "헬마드 구독자 여러분", subtitle: "부상 없이 득근하세요", durationInSeconds: 10, accent: "#6c5ce7" },
];
