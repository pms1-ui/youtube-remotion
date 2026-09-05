import { Scene } from "./script";

export const SHORTS_SCENES: Scene[] = [
  // 장면 1: 후킹 — 힘들지 않은데 개수 폭발
  {
    type: "text",
    text: "매일 푸쉬업 하는데\n힘과 개수가 미친 듯이 느는 법",
    subtitle: "소련 특수부대 교관이 개발",
    durationInSeconds: 5,
    accent: "#e17055",
  },

  // 장면 2: GTG 소개
  {
    type: "text",
    text: "GTG 푸쉬업",
    subtitle: "Grease the Groove",
    description: "파벨 차졸린 개발",
    durationInSeconds: 5,
    accent: "#6c5ce7",
  },

  // 장면 3: 핵심 원리 — 최대의 절반만
  {
    type: "barChart",
    text: "최대 개수의 절반만\n하루 5∼8번 나눠서",
    description: "최대 30개면 → 15개씩 틈틈이",
    durationInSeconds: 5,
    accent: "#00b894",
    barData: [
      { label: "1회", value: 15, color: "#00b894" },
      { label: "2회", value: 15, color: "#55efc4" },
      { label: "3회", value: 15, color: "#00b894" },
      { label: "4회", value: 15, color: "#55efc4" },
      { label: "5회", value: 15, color: "#00b894" },
    ],
  },

  // 장면 4: 일반 훈련과의 차이
  {
    type: "splitFact",
    text: "실패지점 훈련과\n완전히 다른 구조",
    durationInSeconds: 5,
    accent: "#fdcb6e",
    compareData: {
      left: { title: "일반 훈련", description: "근육 파괴\n근비대 목적" },
      right: { title: "GTG", description: "신경계 강화\n근력+개수 폭발" },
    },
  },

  // 장면 5: 선순환 구조
  {
    type: "timeline",
    text: "선순환 구조",
    durationInSeconds: 5,
    accent: "#6c5ce7",
    steps: [
      { label: "근신경계 발달" },
      { label: "근력 강화" },
      { label: "벤치 중량↑" },
      { label: "근비대 달성" },
    ],
  },

  // 장면 6: 실제 결과 데이터
  {
    type: "progressCards",
    text: "2∼3주 만에",
    description: "최대 개수 30∼50% 증가",
    durationInSeconds: 5,
    accent: "#e17055",
    progressCards: [
      { label: "20개 → 28개", value: 40, color: "#e17055", description: "+40%" },
      { label: "30개 → 45개", value: 50, color: "#6c5ce7", description: "+50%" },
      { label: "50개 → 65개", value: 30, color: "#00b894", description: "+30%" },
    ],
  },

  // 장면 7: 실전 타이밍
  {
    type: "highlight",
    text: "생활 틈새에 끼워넣기",
    description: "따로 시간 안 내도 됨",
    durationInSeconds: 5,
    accent: "#74b9ff",
    bullets: ["출근 전", "점심 전", "화장실 갈 때", "퇴근 후"],
    bulletDescriptions: ["15개", "15개", "15개", "15개"],
  },

  // 장면 8: 마무리 CTA
  {
    type: "text",
    text: "오늘 최대 개수 세고\n내일부터 절반씩",
    subtitle: "2∼3주면 놀랍니다",
    durationInSeconds: 5,
    accent: "#ffd93d",
  },
];
