import { Scene } from "./script";

export const SHORTS_SCENES: Scene[] = [
  // 바벨컬 vs 덤벨컬 숏폼 — 문장 단위 분할, 총 36초, text 타입 미사용

  // 1. 후킹 — 대결 구도 (3초)
  { type: "compare", text: "바벨컬 vs 덤벨컬", description: "팔 운동 효율 대장은?", durationInSeconds: 3, accent: "#ffd93d", compareData: { left: { title: "바벨컬", description: "고중량\n안정성" }, right: { title: "덤벨컬", description: "고립\n활성도" } } },

  // 2. 바벨컬 중량 우위 (4초)
  { type: "barChart", text: "바벨컬이 15~20%\n더 무겁게 가능", description: "양손 결합 → 안정성 확보", durationInSeconds: 4, accent: "#4A90D9", barData: [{ label: "바벨컬", value: 118, color: "#4A90D9" }, { label: "덤벨컬", value: 100, color: "#e17055" }] },

  // 3. 질문 던지기 (3초)
  { type: "splitFact", text: "그런데 왜?", durationInSeconds: 3, accent: "#6c5ce7", compareData: { left: { title: "보디빌더들", description: "덤벨컬을\n필수 루틴" }, right: { title: "이유", description: "이두 고립\n극대화" } } },

  // 4. 바벨컬 한계 (4초)
  { type: "splitFact", text: "바벨컬의 한계", durationInSeconds: 4, accent: "#e17055", compareData: { left: { title: "이두근 본래 기능", description: "회외 작용\n(손목 바깥 비틀기)" }, right: { title: "바벨컬", description: "그립 고정\n회외 불가" } } },

  // 5. 덤벨컬 강점 (4초)
  { type: "highlight", text: "덤벨컬 수축 시", description: "손목을 바깥으로 비틀면", durationInSeconds: 4, accent: "#00b894", bullets: ["회외 작용 활성화", "이두근 활성도 폭발", "피크 수축 극대화"], bulletDescriptions: ["손목 비틀기 동작", "바벨 대비 +14%", "최대 가동범위에서"] },

  // 6. 수치 비교 (5초)
  { type: "barChart", text: "최대 수축 자극 비교", description: "가동범위 끝단 이두 활성도", durationInSeconds: 5, accent: "#00b894", barData: [{ label: "바벨컬", value: 86, color: "#74b9ff" }, { label: "덤벨컬", value: 100, color: "#00b894" }] },

  // 7. 덤벨컬 장점 정리 (4초)
  { type: "iconList", text: "덤벨컬 강점 정리", durationInSeconds: 4, accent: "#00b894", bullets: ["회외 작용 100% 활용", "수축 자극 +14% 우수", "좌우 균형 교정 탁월"] },

  // 8. 짝짝이 균형 (3초)
  { type: "highlight", text: "짝짝이 균형 잡기", description: "좌우 독립 자극으로 교정", durationInSeconds: 3, accent: "#4A90D9", bullets: ["왼팔 약하면 왼팔만 집중", "좌우 대칭 완성"], bulletDescriptions: ["독립 부하 조절 가능", "바벨로는 불가능"] },

  // 9. 결론 공식 (3초)
  { type: "splitFact", text: "결론: 이두 루틴 공식", durationInSeconds: 3, accent: "#ffd93d", compareData: { left: { title: "1번째", description: "바벨컬\n중량 치기" }, right: { title: "2번째", description: "덤벨컬\n이두 찢기" } } },

  // 10. 마무리 (3초)
  { type: "compare", text: "이게 정답입니다", description: "바벨 중량 + 덤벨 고립 = 최강 조합", durationInSeconds: 3, accent: "#ffd93d", compareData: { left: { title: "바벨컬", description: "중량 자극\n기초 볼륨" }, right: { title: "덤벨컬", description: "피크 수축\n이두 완성" } } },
];
