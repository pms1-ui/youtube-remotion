import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Scene } from "../data/script";

// 화살표가 박스에서 나와 설명을 가리키는 구조
const CompareCard: React.FC<{
  title: string;
  description: string;
  color: string;
  frame: number;
  fps: number;
  delay: number;
  side: "left" | "right";
}> = ({ title, description, color, frame, fps, delay, side }) => {
  // 박스 등장
  const boxScale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const boxOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 화살표 등장 (박스 뒤에)
  const arrowDelay = delay + 20;
  const arrowLength = interpolate(frame, [arrowDelay, arrowDelay + 25], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowOpacity = interpolate(frame, [arrowDelay, arrowDelay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 설명 텍스트 등장 (화살표 뒤에)
  const textDelay = arrowDelay + 15;
  const textOpacity = interpolate(frame, [textDelay, textDelay + 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textSlide = interpolate(frame, [textDelay, textDelay + 15], [20, 0], {
    extrapolateRight: "clamp",
  });

  // 글로우 펄스
  const glowPulse = interpolate(frame % 90, [0, 45, 90], [0.3, 0.8, 0.3]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        minWidth: 380,
      }}
    >
      {/* 타이틀 박스 */}
      <div
        style={{
          opacity: boxOpacity,
          transform: `scale(${boxScale})`,
          padding: "18px 32px",
          borderRadius: 16,
          border: `2px solid ${color}`,
          backgroundColor: "transparent",
          boxShadow: `0 0 ${20 * glowPulse}px ${color}30`,
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#f0f0f0",
            fontFamily: "sans-serif",
          }}
        >
          {title}
        </span>
      </div>

      {/* 화살표 (박스 아래에서 나옴) */}
      <div
        style={{
          opacity: arrowOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: -2,
        }}
      >
        {/* 세로 선 */}
        <div
          style={{
            width: 3,
            height: arrowLength,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
        {/* 화살표 머리 */}
        <svg width="24" height="16" viewBox="0 0 24 16">
          <path
            d="M2 2 L12 13 L22 2"
            fill="none"
            stroke={color}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
          />
        </svg>
      </div>

      {/* 설명 텍스트 */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textSlide}px)`,
          marginTop: 16,
          padding: "16px 32px",
          borderRadius: 14,
          backgroundColor: `${color}0a`,
          border: `1px solid ${color}30`,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#e8e8e8",
            fontFamily: "sans-serif",
            textAlign: "center",
            display: "block",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
};

export const CompareScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = "#6c5ce7"; // 항상 보라색 테두리
  const compareData = scene.compareData;

  // 장면 전체 slow zoom in
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.4], {
    extrapolateRight: "clamp",
  });

  if (!compareData) return null;

  const { left, right } = compareData;

  // 메인 텍스트
  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: 1600,
          height: 900,
          borderRadius: 400,
          background: `radial-gradient(ellipse, ${accent}05 0%, transparent 50%)`,
        }}
      />

      {/* 메인 텍스트 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 54,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "sans-serif",
          textAlign: "center",
          marginBottom: 70,
        }}
      >
        {scene.text}
      </div>

      {/* 비교 카드 영역 */}
      <div
        style={{
          display: "flex",
          gap: 120,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <CompareCard
          title={left.title}
          description={left.description}
          color={accent}
          frame={frame}
          fps={fps}
          delay={15}
          side="left"
        />

        <CompareCard
          title={right.title}
          description={right.description}
          color={accent}
          frame={frame}
          fps={fps}
          delay={45}
          side="right"
        />
      </div>
    </AbsoluteFill>
  );
};
