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
  | "muscleMap"
  | "imageShowcase"
  | "imageText"
  | "imageStat"
  | "beforeAfterChart";

export type BarData = { label: string; value: number; color: string };
// 전후 비교(개수/수치 기반): 항목별 before → after 그룹 막대
export type BeforeAfterData = {
  label: string; // 운동명 (예: 푸시업)
  before: number;
  after: number;
};
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
  // 장면 특화 그래픽 이미지 (캐릭터와 별개, 크게 배치)
  sceneImage?: string;
  // imageStat 타입용: 이미지 위/옆에 얹는 큰 수치
  statValue?: string;
  statLabel?: string;
  barData?: BarData[];
  // 전후 비교 그룹 막대 (개수/수치). unit으로 단위 표기(예: "회")
  beforeAfterData?: BeforeAfterData[];
  unit?: string;
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
  // ============ 인트로 ============
  // 1. 파병 군인·죄수 인트로 (0~4.82)
  {
    type: "imageShowcase",
    text: "군인도, 죄수도\n하는 운동",
    subtitle: "환경의 제약 속에서도",
    durationInSeconds: 4.82,
    accent: "#6c5ce7",
    sceneImage: "scene-intro-soldier.png",
  },

  // 2. 과학으로 증명 + 프로그램 소개 (4.82~9.6)
  {
    type: "imageText",
    text: "과학으로\n증명된 운동",
    subtitle: "환경 제약 속 필수 루틴",
    durationInSeconds: 4.78,
    accent: "#4A90D9",
    sceneImage: "scene-victory-strong.png",
  },

  // 3. 하체·코어 발달 최고 (9.6~15.2)
  {
    type: "imageStat",
    text: "하체 · 코어 발달",
    statValue: "최고",
    statLabel: "이보다 효과적일 수 없다",
    durationInSeconds: 5.6,
    accent: "#00b894",
    sceneImage: "scene-victory-strong.png",
  },

  // 4. 시공간 제약 없음 (15.2~19.28)
  {
    type: "highlight",
    text: "필요 없는 것들",
    bullets: ["헬스장", "긴 시간", "장비"],
    durationInSeconds: 4.08,
    accent: "#e17055",
    characterImage: "char-07.png",
  },

  // 5. 방바닥 하나 20분 → 강철 하체 (19.28~26.2)
  {
    type: "imageStat",
    text: "방바닥 하나면",
    statValue: "20분",
    statLabel: "강철 하체 · 코어 · 허리",
    durationInSeconds: 6.92,
    accent: "#ffd93d",
    sceneImage: "scene-core-strong.png",
  },

  // 6. 방바닥+벽 하나면 끝 (26.2~28.44)
  {
    type: "text",
    text: "방바닥 하나,\n벽 하나면 끝",
    durationInSeconds: 2.24,
    accent: "#74b9ff",
    characterImage: "char-01.png",
  },

  // 7. 6동작 서킷 소개 (28.44~33.52)
  {
    type: "highlight",
    text: "하체 · 코어\n동시 폭파",
    subtitle: "6개 동작 서킷",
    durationInSeconds: 5.08,
    accent: "#00cec9",
    characterImage: "char-09.png",
  },

  // 8. 왜 이 6개, 왜 이 순서, 자세 (33.52~39.66)
  {
    type: "highlight",
    text: "오늘 다룰 3가지",
    bullets: ["왜 이 6개", "왜 이 순서", "자세는?"],
    durationInSeconds: 6.14,
    accent: "#a29bfe",
    characterImage: "char-08.png",
  },

  // ============ 프로그램 순서 ============
  // 9. 프로그램 순서 (39.66~44.46)
  {
    type: "timeline",
    text: "프로그램 순서",
    durationInSeconds: 4.8,
    accent: "#4A90D9",
    steps: [
      { label: "스쿼트 스러스트" },
      { label: "할로우 홀드" },
      { label: "리버스 런지" },
    ],
  },

  // 10. 6동작 나열 (44.46~49.34)
  {
    type: "timeline",
    text: "6개 동작",
    durationInSeconds: 4.88,
    accent: "#6c5ce7",
    steps: [
      { label: "플랭크" },
      { label: "점프 스쿼트" },
      { label: "월 싯 홀드" },
    ],
  },

  // 11. 각 동작 40초 (49.34~54.06)
  {
    type: "imageStat",
    text: "각 동작",
    statValue: "40초",
    statLabel: "동작 사이 15초 휴식",
    durationInSeconds: 4.72,
    accent: "#ffd93d",
    characterImage: "char-06.png",
  },

  // 12. 6개=1라운드, 라운드 사이 60초 (54.06~58.22)
  {
    type: "imageStat",
    text: "6개 = 1라운드",
    statValue: "3R",
    statLabel: "라운드 사이 60초",
    durationInSeconds: 4.16,
    accent: "#00b894",
    characterImage: "char-02.png",
  },

  // 13. 15~20분 소요 (58.22~60.32)
  {
    type: "imageStat",
    text: "총 소요 시간",
    statValue: "15~20분",
    statLabel: "",
    durationInSeconds: 2.1,
    accent: "#fdcb6e",
    characterImage: "char-01.png",
  },

  // 14. 동작 하나하나 효과·자세·주의 (60.32~69.06)
  {
    type: "text",
    text: "이제 하나씩\n뜯어봅니다",
    subtitle: "효과 · 자세 · 주의사항",
    durationInSeconds: 8.74,
    accent: "#4A90D9",
    characterImage: "char-08.png",
  },

  // ============ 1. 스쿼트 스러스트 ============
  // 15. 첫 번째 동작 소개 (69.06~73.12)
  {
    type: "imageText",
    text: "1. 스쿼트 스러스트",
    subtitle: "버피에서\n팔굽혀펴기만 뺀 동작",
    durationInSeconds: 4.06,
    accent: "#e17055",
    sceneImage: "scene-squat-thrust.png",
  },

  // 16. 동작 방법 (73.12~78.7)
  {
    type: "imageText",
    text: "동작 방법",
    subtitle: "손 짚고 다리 뒤로,\n다시 당기기 반복",
    durationInSeconds: 5.58,
    accent: "#4A90D9",
    sceneImage: "scene-squat-thrust.png",
  },

  // 17. 일어서거나 엎드린 채 반복 (78.7~83.68)
  {
    type: "imageText",
    text: "두 가지 방식",
    subtitle: "일어서거나\n엎드린 채 반복",
    durationInSeconds: 4.98,
    accent: "#74b9ff",
    sceneImage: "scene-squat-thrust.png",
  },

  // 18. 맨 앞에 두는 이유 = 전신 시동 (83.68~89.16)
  {
    type: "imageText",
    text: "왜 맨 앞?",
    subtitle: "전신 동작으로\n심박수 시동 걸기",
    durationInSeconds: 5.48,
    accent: "#00cec9",
    sceneImage: "scene-circuit-loop.png",
  },

  // 19. 주의: 허리 꺼짐 금지 (89.16~96.62)
  {
    type: "imageText",
    text: "주의사항",
    subtitle: "엉덩이 솟거나\n허리 꺼지면 안 됨",
    durationInSeconds: 7.46,
    accent: "#d63031",
    sceneImage: "scene-plank.png",
  },

  // 20. 머리~발끝 일직선, 배에 힘 (96.62~103.1)
  {
    type: "imageText",
    text: "핵심 자세",
    subtitle: "머리~발끝 일직선\n엉덩이 · 배에 힘",
    durationInSeconds: 6.48,
    accent: "#00b894",
    sceneImage: "scene-plank.png",
  },

  // ============ 2. 할로우 홀드 ============
  // 21. 두 번째 동작 (103.1~107.34)
  {
    type: "imageText",
    text: "2. 할로우 홀드",
    subtitle: "이번엔 가만히 버티기",
    durationInSeconds: 4.24,
    accent: "#6c5ce7",
    sceneImage: "scene-hollow-hold.png",
  },

  // 22. 깊은 코어 정적 조임 (107.34~111.56)
  {
    type: "imageText",
    text: "복부 깊은 코어",
    subtitle: "팔다리 들고\n배에 힘 준 채 버티기",
    durationInSeconds: 4.22,
    accent: "#4A90D9",
    sceneImage: "scene-hollow-hold.png",
  },

  // 23. 연구: 코어 안정성 → 허리 건강 (111.56~117.2)
  {
    type: "imageText",
    text: "허리 건강에 최고",
    subtitle: "2019 스포츠 헬스\n코어 안정성 훈련",
    durationInSeconds: 5.64,
    accent: "#00b894",
    sceneImage: "scene-core-strong.png",
  },

  // 24. 핵심 자세 하나 = 허리 바닥 밀착 (117.2~124.14)
  {
    type: "imageText",
    text: "핵심은 하나",
    subtitle: "허리를 바닥에\n딱 붙이기",
    durationInSeconds: 6.94,
    accent: "#ffd93d",
    sceneImage: "scene-hollow-hold.png",
  },

  // 25. 허리 뜨면 코어 운동 안 됨 (124.14~129.42)
  {
    type: "imageText",
    text: "주의",
    subtitle: "허리 뜨면\n코어 운동 안 됨",
    durationInSeconds: 5.28,
    accent: "#d63031",
    sceneImage: "scene-hollow-hold.png",
  },

  // 26. 배꼽 눌러넣기, 몸 떨리면 정답 (129.42~136.02)
  {
    type: "imageText",
    text: "이렇게",
    subtitle: "배꼽 눌러넣고\n몸이 떨리면 정답",
    durationInSeconds: 6.6,
    accent: "#00cec9",
    sceneImage: "scene-hollow-hold.png",
  },

  // 27. 어려우면 무릎 굽히기 (136.02~140.5)
  {
    type: "imageText",
    text: "어렵다면?",
    subtitle: "무릎을 살짝\n굽혀서 수행",
    durationInSeconds: 4.48,
    accent: "#74b9ff",
    sceneImage: "scene-hollow-hold.png",
  },

  // ============ 3. 리버스 런지 ============
  // 28. 세 번째 동작 (140.5~144.54)
  {
    type: "imageText",
    text: "3. 리버스 런지",
    subtitle: "이제 한 다리씩 집중",
    durationInSeconds: 4.04,
    accent: "#6c5ce7",
    sceneImage: "scene-reverse-lunge.png",
  },

  // 29. 왜 뒤로 빼는가 = 무릎부담↓ 엉덩이·뒷벅지 (144.54~149.94)
  {
    type: "imageText",
    text: "왜 뒤로 빼나?",
    subtitle: "무릎 부담 적고\n엉덩이 · 뒷벅지 집중",
    durationInSeconds: 5.4,
    accent: "#4A90D9",
    sceneImage: "scene-reverse-lunge.png",
  },

  // 30. 좌우 따로 → 불균형 잡고 코어까지 (149.94~158.3)
  {
    type: "imageText",
    text: "코어까지 덤",
    subtitle: "좌우 불균형 교정\n균형 잡느라 코어 동원",
    durationInSeconds: 8.36,
    accent: "#00b894",
    sceneImage: "scene-reverse-lunge.png",
  },

  // 31. 근전도: 단측 하체 = 코어 안정근 더 동원 (158.3~165.54)
  {
    type: "barChart",
    text: "코어 안정근 동원",
    description: "근전도(EMG) 연구",
    durationInSeconds: 7.24,
    accent: "#6c5ce7",
    barData: [
      { label: "양다리 운동", value: 62, color: "#636e72" },
      { label: "한다리 운동", value: 88, color: "#6c5ce7" },
    ],
  },

  // 32. 자세: 앞무릎 발끝 안 넘게 (165.54~173.04)
  {
    type: "imageText",
    text: "자세 포인트",
    subtitle: "앞 무릎이\n발끝 넘지 않게",
    durationInSeconds: 7.5,
    accent: "#d63031",
    sceneImage: "scene-reverse-lunge.png",
  },

  // 33. 엉덩이 아래로, 상체 세우고 (173.04~182.78)
  {
    type: "imageText",
    text: "이렇게",
    subtitle: "엉덩이 아래로,\n상체는 세우고",
    durationInSeconds: 9.74,
    accent: "#00cec9",
    sceneImage: "scene-reverse-lunge.png",
  },

  // ============ 4. 플랭크 ============
  // 34. 네 번째 동작 (182.78~188.32)
  {
    type: "imageText",
    text: "4. 플랭크",
    subtitle: "다리 터질 때\n다시 정적으로",
    durationInSeconds: 5.54,
    accent: "#6c5ce7",
    sceneImage: "scene-plank.png",
  },

  // 35. 움직이는 코어 vs 버티는 코어 (188.32~194.56)
  {
    type: "compare",
    text: "코어를 두 번",
    durationInSeconds: 6.24,
    accent: "#4A90D9",
    compareData: {
      left: { title: "스쿼트 스러스트", description: "움직이는 코어" },
      right: { title: "플랭크", description: "버티는 코어" },
    },
  },

  // 36. 팔꿈치 어깨 아래, 관건은 엉덩이 (194.56~200.0)
  {
    type: "imageText",
    text: "관건은 엉덩이",
    subtitle: "솟으면 쉬워지고\n처지면 허리 상함",
    durationInSeconds: 5.44,
    accent: "#d63031",
    sceneImage: "scene-plank.png",
  },

  // 37. 머리~발뒤꿈치 일직선 (200.0~205.98)
  {
    type: "imageText",
    text: "핵심 자세",
    subtitle: "머리~발뒤꿈치\n일직선 유지",
    durationInSeconds: 5.98,
    accent: "#00b894",
    sceneImage: "scene-plank.png",
  },

  // ============ 5. 점프 스쿼트 ============
  // 38. 다섯 번째 = 서킷의 정점 (205.98~209.78)
  {
    type: "imageShowcase",
    text: "5. 점프 스쿼트",
    subtitle: "오늘 서킷의 정점",
    durationInSeconds: 3.8,
    accent: "#ff7675",
    sceneImage: "scene-jump-squat.png",
  },

  // 39. 지친 하체에 폭발력 → 속근 동원 (209.78~215.46)
  {
    type: "imageText",
    text: "속근 동원",
    subtitle: "지친 하체에\n마지막 폭발력",
    durationInSeconds: 5.68,
    accent: "#e17055",
    sceneImage: "scene-jump-squat.png",
  },

  // 40. 연구: 하체 파워 발달 우위 (215.46~223.92)
  {
    type: "barChart",
    text: "하체 파워 발달",
    description: "2016 JSCR 연구",
    durationInSeconds: 8.46,
    accent: "#ff7675",
    barData: [
      { label: "일반 스쿼트", value: 65, color: "#636e72" },
      { label: "점프 스쿼트", value: 92, color: "#ff7675" },
    ],
  },

  // 41. 착지가 생명, 탄력적으로 흡수 (223.92~231.78)
  {
    type: "imageText",
    text: "착지가 생명",
    subtitle: "용수철처럼\n탄력적으로 흡수",
    durationInSeconds: 7.86,
    accent: "#ffd93d",
    sceneImage: "scene-jump-squat.png",
  },

  // 42. 무릎 안 모이게, 아프면 일반 스쿼트 (231.78~238.56)
  {
    type: "imageText",
    text: "무릎 주의",
    subtitle: "안으로 모이지 않게\n아프면 일반 스쿼트",
    durationInSeconds: 6.78,
    accent: "#d63031",
    sceneImage: "scene-jump-squat.png",
  },

  // ============ 6. 월 싯 홀드 ============
  // 43. 여섯 번째 = 벽에 기대 버티기 (238.56~244.52)
  {
    type: "imageText",
    text: "6. 월 싯 홀드",
    subtitle: "마지막은\n벽에 기대 버티기",
    durationInSeconds: 5.96,
    accent: "#6c5ce7",
    sceneImage: "scene-wall-sit.png",
  },

  // 44. 선피로 후 정적 수축 (244.52~256.6)
  {
    type: "imageText",
    text: "선피로 후 정적 수축",
    subtitle: "남은 힘까지 쥐어짜\n근육 완전 소진",
    durationInSeconds: 12.08,
    accent: "#00cec9",
    sceneImage: "scene-wall-sit.png",
  },

  // 45. 무릎 90도, 발목 위 (256.6~263.04)
  {
    type: "imageStat",
    text: "무릎 각도",
    statValue: "90°",
    statLabel: "무릎이 발목 바로 위",
    durationInSeconds: 6.44,
    accent: "#ffd93d",
    sceneImage: "scene-wall-sit.png",
  },

  // 46. 무릎 발끝 넘으면 발 앞으로, 다리로만 (263.04~272.4)
  {
    type: "imageText",
    text: "자세 조절",
    subtitle: "발 앞으로 빼고\n다리로만 버티기",
    durationInSeconds: 9.36,
    accent: "#00b894",
    sceneImage: "scene-wall-sit.png",
  },

  // ============ 원리 종합 ============
  // 47. 다시 전체 순서 보기 (272.4~277.64)
  {
    type: "text",
    text: "특징이\n느껴지시나요?",
    subtitle: "전체 순서 다시 보기",
    durationInSeconds: 5.24,
    accent: "#4A90D9",
    characterImage: "char-08.png",
  },

  // 48. 운동 사이사이 홀드 동작 (277.64~285.64)
  {
    type: "compare",
    text: "동적 ↔ 홀드 교대",
    durationInSeconds: 8.0,
    accent: "#6c5ce7",
    compareData: {
      left: { title: "동적 동작", description: "스러스트 · 런지 · 점프" },
      right: { title: "홀드 동작", description: "할로우 · 플랭크 · 월싯" },
    },
  },

  // 49. TUT 극대화 (285.64~288.74)
  {
    type: "imageText",
    text: "TUT 극대화",
    subtitle: "근육 가동시간\n(Time Under Tension)",
    durationInSeconds: 3.1,
    accent: "#a29bfe",
    sceneImage: "scene-core-strong.png",
  },

  // 50. TUT 증대 → 근비대·힘줄 강화 (288.74~294.04)
  {
    type: "highlight",
    text: "TUT가 늘면",
    bullets: ["근비대 ↑", "힘줄 강화"],
    durationInSeconds: 5.3,
    accent: "#00b894",
    characterImage: "char-09.png",
  },

  // 51. 심박수 유지 (294.04~299.86)
  {
    type: "imageText",
    text: "심박수 계속 유지",
    subtitle: "높은 수치를\n끝까지 유지",
    durationInSeconds: 5.82,
    accent: "#e17055",
    sceneImage: "scene-circuit-loop.png",
  },

  // 52. 서로 다른 각도 → 균형 발달 (299.86~306.14)
  {
    type: "imageText",
    text: "균형적 발달",
    subtitle: "하체 · 코어를\n다른 각도로 자극",
    durationInSeconds: 6.28,
    accent: "#00cec9",
    sceneImage: "scene-victory-strong.png",
  },

  // ============ 결과 (연구 수치) ============
  // 53. 꾸준히 하면? 실제 연구 수치 (306.14~314.2)
  {
    type: "text",
    text: "꾸준히 하면\n뭐가 달라질까?",
    subtitle: "실제 연구 수치로",
    durationInSeconds: 8.06,
    accent: "#4A90D9",
    characterImage: "char-10.png",
  },

  // 54. 2017 연구 + 같은 동작, 주3회 9주, 식단 동일 (314.2~324.94)
  {
    type: "imageText",
    text: "2017 프론티어스\n연구",
    subtitle: "같은 동작 · 주3회 9주\n식단은 동일 유지",
    durationInSeconds: 10.74,
    accent: "#6c5ce7",
    sceneImage: "scene-victory-strong.png",
  },

  // 55. 체지방 -1.9kg (324.94~335.12)
  {
    type: "imageStat",
    text: "순수 체지방",
    statValue: "-1.9kg",
    statLabel: "대조군 대비\n(체중 약 -2kg)",
    durationInSeconds: 10.18,
    accent: "#00b894",
    sceneImage: "scene-core-strong.png",
  },

  // 56. 지방만 빠지고 근육은 늘었다 (335.12~338.54)
  {
    type: "text",
    text: "지방만 빠지고\n근육은 늘었다",
    durationInSeconds: 3.42,
    accent: "#55efc4",
    characterImage: "char-09.png",
  },

  // 57. 근지구력: 푸시업 2.6배 등 (338.54~347.3)
  {
    type: "beforeAfterChart",
    text: "근지구력 향상",
    description: "9주 전후 (반복 횟수)",
    durationInSeconds: 8.76,
    accent: "#ffd93d",
    unit: "회",
    beforeAfterData: [
      { label: "푸시업", before: 7.5, after: 19.6 },
      { label: "버피", before: 9, after: 25 },
      { label: "한다리 스쿼트", before: 18, after: 37 },
    ],
  },

  // 58. 심폐(VO2max) +10% (347.3~353.88)
  {
    type: "imageStat",
    text: "심폐 능력 (VO2max)",
    statValue: "+10%",
    statLabel: "최대 산소 섭취량",
    durationInSeconds: 6.58,
    accent: "#74b9ff",
    sceneImage: "scene-circuit-loop.png",
  },

  // 59. 단 9주로 다 잡았다 (353.88~359.68)
  {
    type: "highlight",
    text: "단 9주, 주 3회",
    bullets: ["체지방 ↓", "근육 유지", "근지구력 2배", "심폐 ↑"],
    durationInSeconds: 5.8,
    accent: "#00b894",
    characterImage: "char-01.png",
  },

  // ============ 정리 ============
  // 60. 정리: 6동작 (359.68~369.8)
  {
    type: "timeline",
    text: "정리 — 6동작",
    durationInSeconds: 10.12,
    accent: "#4A90D9",
    steps: [
      { label: "스쿼트 스러스트" },
      { label: "할로우 홀드" },
      { label: "리버스 런지" },
      { label: "플랭크" },
      { label: "점프 스쿼트" },
      { label: "월 싯 홀드" },
    ],
  },

  // 61. 3라운드 / 동작 15초 / 라운드 60초 (369.8~378.92)
  {
    type: "highlight",
    text: "실행 규칙",
    bullets: ["3라운드", "동작 사이 15초", "라운드 사이 60초"],
    durationInSeconds: 9.12,
    accent: "#6c5ce7",
    characterImage: "char-06.png",
  },

  // 62. 15~20분이면 돌덩이 하체·코어 (378.92~383.58)
  {
    type: "imageStat",
    text: "딱 15~20분",
    statValue: "돌덩이",
    statLabel: "하체 · 코어 완성",
    durationInSeconds: 4.66,
    accent: "#ffd93d",
    sceneImage: "scene-victory-strong.png",
  },

  // ============ 광고 (마이프로틴) ============
  // 63. 강도 높게 털었다면 단백질 필수 (383.58~394.46)
  {
    type: "text",
    text: "확실한 성장엔\n단백질이 필수",
    subtitle: "마이프로틴 임팩트 위크",
    durationInSeconds: 10.88,
    accent: "#00cec9",
    characterImage: "char-09.png",
  },

  // 64. 타임세일 기간 (394.46~405.68)
  {
    type: "highlight",
    text: "타임세일",
    bullets: ["9/8(화) 저녁 7시", "~ 9/9(수) 새벽 1시"],
    durationInSeconds: 11.22,
    accent: "#e17055",
    characterImage: "char-08.png",
  },

  // 65. 최대 80% + 코드 TEAMMP 41% (405.68~413.7)
  {
    type: "imageStat",
    text: "기본 최대 80% 할인",
    statValue: "+41%",
    statLabel: "코드 'TEAMMP' 입력 시\n추가 할인",
    durationInSeconds: 8.02,
    accent: "#d63031",
    characterImage: "char-01.png",
  },

  // 66. 트렌드 5% + 사은품 2개 (413.7~428.18)
  {
    type: "highlight",
    text: "추가 혜택",
    bullets: ["트렌드 제품 5% 추가", "사은품 최대 2개"],
    durationInSeconds: 14.48,
    accent: "#fdcb6e",
    characterImage: "char-07.png",
  },

  // 67. 앱 12만원↑ 1만원 지원금 (428.18~435.0)
  {
    type: "imageStat",
    text: "앱 12만원 이상",
    statValue: "1만원",
    statLabel: "제품 지원금 자동 적용",
    durationInSeconds: 6.82,
    accent: "#6c5ce7",
    characterImage: "char-02.png",
  },

  // 68. 환율 이슈, 할인 때 사면 쌉니다 (435.0~444.68)
  {
    type: "text",
    text: "할인할 때\n쟁여두세요",
    subtitle: "고정 댓글 링크",
    durationInSeconds: 9.68,
    accent: "#4A90D9",
    characterImage: "char-10.png",
  },

  // 69. 6동작 서킷과 함께 몸 만들기 (444.68~454.46)
  {
    type: "text",
    text: "6동작 서킷과 함께\n확실하게",
    subtitle: "몸 만들어 봅시다",
    durationInSeconds: 9.78,
    accent: "#00b894",
    characterImage: "char-09.png",
  },

  // 70. 구독·좋아요·알림·하이프 (454.46~461.61)
  {
    type: "text",
    text: "구독 · 좋아요\n알림 · 하이프",
    subtitle: "오늘도 득근하세요",
    durationInSeconds: 7.15,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
];
