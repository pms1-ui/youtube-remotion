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
  const { fps } = useVideoConfig();
  const accent = scene.accent || "#ffffff";

  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const lineWidth = interpolate(frame, [0, 20], [0, 200], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at center, #12121a 0%, #0a0a0a 70%)`,
        }}
      />

      <div
        style={{
          width: lineWidth,
          height: 5,
          backgroundColor: accent,
          borderRadius: 3,
          marginBottom: 50,
          boxShadow: `0 0 20px ${accent}60`,
        }}
      />

      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          fontSize: 64,
          fontWeight: 700,
          color: "#f5f5f5",
          fontFamily: "sans-serif",
          lineHeight: 1.7,
          whiteSpace: "pre-line",
          textAlign: "center",
          maxWidth: 1500,
        }}
      >
        {scene.text}
      </div>
    </AbsoluteFill>
  );
};
