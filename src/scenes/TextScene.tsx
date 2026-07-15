import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Scene } from "../data/script";

export const TextScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";

  // 장면 전체 slow zoom out (1.4 → 1.0)
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.4, 1.0], {
    extrapolateRight: "clamp",
  });

  // 메인 텍스트 등장
  const textOpacity = interpolate(frame, [10, 28], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // subtitle (딜레이 등장, 아래에서 올라옴)
  const subDelay = 40;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subSlide = interpolate(frame, [subDelay, subDelay + 18], [30, 0], {
    extrapolateRight: "clamp",
  });
  const subScale = spring({
    frame: Math.max(0, frame - subDelay),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* 메인 텍스트 — 카드/테두리 없이 순수 텍스트 */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          fontSize: 82,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "sans-serif",
          lineHeight: 1.4,
          whiteSpace: "pre-line",
          textAlign: "center",
          maxWidth: 1400,
        }}
      >
        {scene.text}
      </div>

      {/* subtitle — 메인 아래에 accent 색상, 크기 차이로 구분 */}
      {scene.subtitle && (
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subSlide}px) scale(${subScale})`,
            fontSize: 56,
            fontWeight: 700,
            color: accent,
            fontFamily: "sans-serif",
            marginTop: 30,
            textAlign: "center",
            textShadow: `0 0 30px ${accent}50`,
          }}
        >
          {scene.subtitle}
        </div>
      )}

      {/* 부연설명 */}
      {scene.description && (
        <div
          style={{
            opacity: interpolate(frame, [55, 72], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [55, 72], [15, 0], { extrapolateRight: "clamp" })}px)`,
            fontSize: 32,
            fontWeight: 400,
            color: "#999999",
            fontFamily: "sans-serif",
            marginTop: 28,
            textAlign: "center",
            maxWidth: 1000,
          }}
        >
          {scene.description}
        </div>
      )}
    </AbsoluteFill>
  );
};
