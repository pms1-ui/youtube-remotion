import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
} from "remotion";
import { Scene } from "../data/script";

const CompareCard: React.FC<{
  title: string;
  description: string;
  color: string;
  frame: number;
  fps: number;
  delay: number;
  side: "left" | "right";
}> = ({ title, description, color, frame, fps, delay }) => {
  const boxScale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const boxOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const arrowDelay = delay + 20;
  const arrowLength = interpolate(frame, [arrowDelay, arrowDelay + 25], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowOpacity = interpolate(frame, [arrowDelay, arrowDelay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textDelay = arrowDelay + 15;
  const textOpacity = interpolate(frame, [textDelay, textDelay + 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textSlide = interpolate(frame, [textDelay, textDelay + 15], [20, 0], {
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(frame % 90, [0, 45, 90], [0.3, 0.8, 0.3]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        minWidth: 260,
      }}
    >
      <div
        style={{
          opacity: boxOpacity,
          transform: `scale(${boxScale})`,
          padding: "18px 32px",
          borderRadius: 16,
          border: `2px solid ${color}`,
          backgroundColor: "transparent",
          boxShadow: `0 0 ${20 * glowPulse}px ${color}30`,
        }}
      >
        <span style={{ fontSize: 38, fontWeight: 700, color: "#f0f0f0", fontFamily: "sans-serif", wordBreak: "keep-all" as const }}>
          {title}
        </span>
      </div>

      <div style={{ opacity: arrowOpacity, display: "flex", flexDirection: "column", alignItems: "center", marginTop: -2 }}>
        <div style={{ width: 3, height: arrowLength, backgroundColor: color, boxShadow: `0 0 8px ${color}60` }} />
        <svg width="24" height="16" viewBox="0 0 24 16">
          <path d="M2 2 L12 13 L22 2" fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color}80)` }} />
        </svg>
      </div>

      <div style={{ opacity: textOpacity, transform: `translateY(${textSlide}px)`, marginTop: 16, padding: "16px 0" }}>
        <span style={{ fontSize: 34, fontWeight: 700, color: "#e8e8e8", fontFamily: "sans-serif", textAlign: "center", display: "block", lineHeight: 1.5, whiteSpace: "pre-line", wordBreak: "keep-all" as const }}>
          {description}
        </span>
      </div>
    </div>
  );
};

export const CompareScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const compareData = scene.compareData;
  const hasChar = Boolean(scene.characterImage);

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  if (!compareData) return null;
  const { left, right } = compareData;

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", transform: `scale(${sceneZoom})` }}>
      {/* 콘텐츠 영역 — 캐릭터가 있으면 왼쪽으로 밀기 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: hasChar ? "23%" : 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div style={{ opacity: titleOpacity, transform: `scale(${titleScale})`, fontSize: 54, fontWeight: 800, color: "#ffffff", fontFamily: "sans-serif", textAlign: "center", marginBottom: 50, wordBreak: "keep-all" as const }}>
          {scene.text}
        </div>

        {scene.description && (
          <div style={{ opacity: interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" }), fontSize: 28, fontWeight: 400, color: "#999", fontFamily: "sans-serif", textAlign: "center", marginBottom: 40, wordBreak: "keep-all" as const }}>
            {scene.description}
          </div>
        )}

        <div style={{ display: "flex", gap: 80, justifyContent: "center", alignItems: "flex-start" }}>
          <CompareCard title={left.title} description={left.description} color={accent} frame={frame} fps={fps} delay={15} side="left" />
          <CompareCard title={right.title} description={right.description} color={accent} frame={frame} fps={fps} delay={45} side="right" />
        </div>
      </div>

      {/* 캐릭터 */}
      {hasChar && (
        <Img
          src={staticFile(scene.characterImage!)}
          style={{
            position: "absolute",
            right: "12%",
            bottom: 0,
            height: "95%",
            opacity: interpolate(frame, [3, 15], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [3, 15], [40, 0], { extrapolateRight: "clamp" })}px)`,
            objectFit: "contain",
            objectPosition: "center bottom",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
