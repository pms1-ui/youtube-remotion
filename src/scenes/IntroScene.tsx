import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Scene } from "../data/script";

export const IntroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = scene.accent || "#00e5ff";

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
    durationInFrames: 30,
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [35, 55], [30, 0], {
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [15, 45], [0, 350], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}12 0%, transparent 60%)`,
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "sans-serif",
            letterSpacing: -3,
          }}
        >
          {scene.title}
        </div>
      </div>

      <div
        style={{
          width: lineWidth,
          height: 5,
          backgroundColor: accent,
          marginTop: 40,
          marginBottom: 40,
          borderRadius: 3,
          boxShadow: `0 0 25px ${accent}80`,
        }}
      />

      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 56,
          color: "#dddddd",
          fontFamily: "sans-serif",
          textAlign: "center",
          whiteSpace: "pre-line",
          lineHeight: 1.6,
        }}
      >
        {scene.text}
      </div>
    </AbsoluteFill>
  );
};
