/**
 * 영상 믹스 장면 데이터
 * mix/260811.mp4를 ffmpeg scene detection으로 분할한 결과
 * 무작위 섞기용 데이터
 */

export type MixScene = {
  id: number;
  start: number; // seconds
  end: number; // seconds
  duration: number; // seconds
};

export type MixData = {
  source: string;
  fps: number;
  totalDuration: number;
  scenes: MixScene[];
};

export const MIX_DATA: MixData = {
  source: "260811.mp4",
  fps: 24,
  totalDuration: 669.625,
  scenes: [
    { id: 1, start: 0, end: 3.67, duration: 3.67 },
    { id: 2, start: 3.67, end: 11.79, duration: 8.12 },
    { id: 3, start: 11.79, end: 15.71, duration: 3.92 },
    { id: 4, start: 15.71, end: 23.96, duration: 8.25 },
    { id: 5, start: 23.96, end: 28.42, duration: 4.46 },
    { id: 6, start: 28.42, end: 35.96, duration: 7.54 },
    { id: 7, start: 35.96, end: 56.54, duration: 20.58 },
    { id: 8, start: 56.54, end: 61.96, duration: 5.42 },
    { id: 9, start: 61.96, end: 74.38, duration: 12.42 },
    { id: 10, start: 74.38, end: 79.62, duration: 5.24 },
    { id: 11, start: 79.62, end: 84.83, duration: 5.21 },
    { id: 12, start: 84.83, end: 95.54, duration: 10.71 },
    { id: 13, start: 95.54, end: 100.92, duration: 5.38 },
    { id: 14, start: 100.92, end: 104.75, duration: 3.83 },
    { id: 15, start: 104.75, end: 107.92, duration: 3.17 },
    { id: 16, start: 107.92, end: 111.5, duration: 3.58 },
    { id: 17, start: 111.5, end: 116.92, duration: 5.42 },
    { id: 18, start: 116.92, end: 124.83, duration: 7.91 },
    { id: 19, start: 124.83, end: 129.46, duration: 4.63 },
    { id: 20, start: 129.46, end: 155.67, duration: 26.21 },
    { id: 21, start: 155.67, end: 159.62, duration: 3.95 },
    { id: 22, start: 159.62, end: 186.08, duration: 26.46 },
    { id: 23, start: 186.08, end: 191.62, duration: 5.54 },
    { id: 24, start: 191.62, end: 203.17, duration: 11.55 },
    { id: 25, start: 203.17, end: 206.79, duration: 3.62 },
    { id: 26, start: 206.79, end: 212.25, duration: 5.46 },
    { id: 27, start: 212.25, end: 228.08, duration: 15.83 },
    { id: 28, start: 228.08, end: 231.83, duration: 3.75 },
    { id: 29, start: 231.83, end: 241.46, duration: 9.63 },
    { id: 30, start: 241.46, end: 245.42, duration: 3.96 },
    { id: 31, start: 245.42, end: 257.42, duration: 12.0 },
    { id: 32, start: 257.42, end: 262.58, duration: 5.16 },
    { id: 33, start: 262.58, end: 269.0, duration: 6.42 },
    { id: 34, start: 269.0, end: 275.88, duration: 6.88 },
    { id: 35, start: 275.88, end: 283.88, duration: 8.0 },
    { id: 36, start: 283.88, end: 290.5, duration: 6.62 },
    { id: 37, start: 290.5, end: 300.0, duration: 9.5 },
    { id: 38, start: 300.0, end: 307.88, duration: 7.88 },
    { id: 39, start: 307.88, end: 313.21, duration: 5.33 },
    { id: 40, start: 313.21, end: 329.12, duration: 15.91 },
    { id: 41, start: 329.12, end: 337.46, duration: 8.34 },
    { id: 42, start: 337.46, end: 344.54, duration: 7.08 },
    { id: 43, start: 344.54, end: 357.88, duration: 13.34 },
    { id: 44, start: 357.88, end: 361.12, duration: 3.24 },
    { id: 45, start: 361.12, end: 364.42, duration: 3.3 },
    { id: 46, start: 364.42, end: 370.88, duration: 6.46 },
    { id: 47, start: 370.88, end: 375.29, duration: 4.41 },
    { id: 48, start: 375.29, end: 379.58, duration: 4.29 },
    { id: 49, start: 379.58, end: 388.46, duration: 8.88 },
    { id: 50, start: 388.46, end: 406.83, duration: 18.37 },
    { id: 51, start: 406.83, end: 413.58, duration: 6.75 },
    { id: 52, start: 413.58, end: 419.21, duration: 5.63 },
    { id: 53, start: 419.21, end: 422.83, duration: 3.62 },
    { id: 54, start: 422.83, end: 427.54, duration: 4.71 },
    { id: 55, start: 427.54, end: 448.46, duration: 20.92 },
    { id: 56, start: 448.46, end: 452.42, duration: 3.96 },
    { id: 57, start: 452.42, end: 459.62, duration: 7.2 },
    { id: 58, start: 459.62, end: 472.29, duration: 12.67 },
    { id: 59, start: 472.29, end: 475.58, duration: 3.29 },
    { id: 60, start: 475.58, end: 481.33, duration: 5.75 },
    { id: 61, start: 481.33, end: 496.92, duration: 15.59 },
    { id: 62, start: 496.92, end: 503.0, duration: 6.08 },
    { id: 63, start: 503.0, end: 507.33, duration: 4.33 },
    { id: 64, start: 507.33, end: 512.92, duration: 5.59 },
    { id: 65, start: 512.92, end: 522.21, duration: 9.29 },
    { id: 66, start: 522.21, end: 528.21, duration: 6.0 },
    { id: 67, start: 528.21, end: 531.46, duration: 3.25 },
    { id: 68, start: 531.46, end: 558.25, duration: 26.79 },
    { id: 69, start: 558.25, end: 608.96, duration: 50.71 },
    { id: 70, start: 608.96, end: 624.92, duration: 15.96 },
    { id: 71, start: 624.92, end: 635.58, duration: 10.66 },
    { id: 72, start: 635.58, end: 643.58, duration: 8.0 },
    { id: 73, start: 643.58, end: 664.96, duration: 21.38 },
    { id: 74, start: 664.96, end: 669.62, duration: 4.66 },
  ],
};

/**
 * Fisher-Yates shuffle with seed for reproducibility
 */
export function shuffleScenes(scenes: MixScene[], seed: number): MixScene[] {
  const shuffled = [...scenes];
  let m = shuffled.length;
  let s = seed;

  while (m) {
    // Simple seeded random
    s = (s * 1664525 + 1013904223) % 4294967296;
    const i = s % m--;
    [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
  }

  return shuffled;
}
