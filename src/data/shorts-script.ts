import { Scene } from "./script";

export const SHORTS_SCENES: Scene[] = [
  // 앤더슨 스쿼트 숏폼 (캐릭터 없음)
  { type: "text", text: "앤더슨 스쿼트", subtitle: "하체 정체기 해결", durationInSeconds: 5, accent: "#6c5ce7" },
  { type: "splitFact", text: "일반 스쿼트 vs 앤더슨", durationInSeconds: 7, accent: "#4A90D9", compareData: { left: { title: "일반 스쿼트", description: "내려갈 때 반동으로\n올라옴" }, right: { title: "앤더슨", description: "최하단 정지 상태에서\n순수 근력으로 시작" } } },
  { type: "text", text: "반동을\n강제 압수당한 상태", subtitle: "순수 근육 힘으로만 밀어올림", durationInSeconds: 6, accent: "#e17055" },
  { type: "barChart", text: "대퇴사두근 동원율", description: "정지 상태 출발 시 초기 근육 동원율", durationInSeconds: 7, accent: "#00b894", barData: [{ label: "일반 스쿼트", value: 70, color: "#74b9ff" }, { label: "앤더슨 스쿼트", value: 100, color: "#00b894" }] },
  { type: "text", text: "+30% 이상\n폭발적 증가", subtitle: "대퇴사두근 초기 동원율", durationInSeconds: 5, accent: "#00b894" },
  { type: "iconList", text: "앤더슨 스쿼트 장점", durationInSeconds: 7, accent: "#4A90D9", bullets: ["하체 정체기 돌파", "순수 스트렝스 강화", "중추신경계 자극", "순간 파워 +40%"] },
  { type: "splitFact", text: "관절 부담", durationInSeconds: 6, accent: "#00b894", compareData: { left: { title: "무릎 반동 X", description: "무릎 관절 부담\n오히려 감소" }, right: { title: "허벅지 집중", description: "근육만\n정확하게 타격" } } },
  { type: "highlight", text: "주의사항", description: "초보자 안전 가이드", durationInSeconds: 7, accent: "#e17055", bullets: ["무릎 대신 허리 부담 가능", "하체 근력 충분 시에만", "중량은 점진적으로"], bulletDescriptions: ["허리 보호 필수", "기초 근력 선행", "무리하지 않기"] },
  { type: "text", text: "하체 정체기?\n앤더슨 스쿼트", subtitle: "순수 스트렝스의 끝판왕", durationInSeconds: 5, accent: "#6c5ce7" },
];
