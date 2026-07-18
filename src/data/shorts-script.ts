import { Scene } from "./script";

export const SHORTS_SCENES: Scene[] = [
  // 머신 vs 프리웨이트 숏폼 (텍스트 타입 미사용, 모든 장면 시각적 타입)

  // 1. 고정관념 vs 현실
  { type: "splitFact", text: "근육 성장의 정석?", durationInSeconds: 6, accent: "#6c5ce7", compareData: { left: { title: "고정관념", description: "프리웨이트만이\n정석이다" }, right: { title: "현실", description: "머신이 고립에선\n훨씬 우위" } } },

  // 2. 프리웨이트의 한계
  { type: "iconList", text: "프리웨이트의 문제점", durationInSeconds: 6, accent: "#e17055", bullets: ["근육 안 붙고 노동만", "주변 근육 과다 개입", "자세 흔들림으로 분산"] },

  // 3. 머신의 장점 — 고립 극대화
  { type: "highlight", text: "머신의 핵심 강점", description: "몸통·코어·자세를 고정", durationInSeconds: 7, accent: "#00b894", bullets: ["코어 고정", "주변 근육 차단", "타겟 근육 집중", "궤적 최적화"], bulletDescriptions: ["몸통 흔들림 제거", "팔·어깨 간섭 제거", "자극 정확도 극대화", "파나타 등 설계된 동선"] },

  // 4. 고립도 비교 — 막대 차트
  { type: "barChart", text: "타겟 근육 고립도", description: "등 운동 시 광배근 자극 비율", durationInSeconds: 7, accent: "#4A90D9", barData: [{ label: "프리웨이트", value: 65, color: "#e17055" }, { label: "머신", value: 95, color: "#00b894" }] },

  // 5. 팩폭 — 필 히스 사례
  { type: "splitFact", text: "올림피아 챔피언의 진실", durationInSeconds: 7, accent: "#4A90D9", compareData: { left: { title: "필 히스", description: "역사상 가장\n멋진 몸" }, right: { title: "훈련 방식", description: "커리어 대부분\n머신으로 제작" } } },

  // 6. 근비대의 본질 — 도넛
  { type: "donutChart", text: "근비대의 본질", description: "머신이냐 프리웨이트냐가 아님\n핵심은 지속적 긴장감", durationInSeconds: 7, accent: "#6c5ce7", donutData: [{ label: "지속적 긴장감", value: 60, color: "#6c5ce7" }, { label: "충분한 파괴", value: 40, color: "#a29bfe" }] },

  // 7. 결론 전략
  { type: "iconList", text: "실전 적용 전략", durationInSeconds: 7, accent: "#00b894", bullets: ["고립 필요 → 머신 우선", "근육에 긴장감 유지", "잘 찢어냈는지가 핵심", "도구보다 자극이 본질"] },

  // 8. 마무리
  { type: "compare", text: "최종 결론", description: "도구가 아닌 자극의 질", durationInSeconds: 5, accent: "#6c5ce7", compareData: { left: { title: "프리웨이트", description: "코어·협응\n스트렝스" }, right: { title: "머신", description: "고립·집중\n근비대 극대화" } } },
];
