import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const TransitionOverlay: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  // 장면 시작: 페이드인 (0.5초 = 15프레임)
  const fadeIn = interpolate(frame, [0, 15], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 장면 끝: 페이드아웃 (0.5초 = 15프레임)
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp" }
  );

  const opacity = Math.max(fadeIn, fadeOut);

  if (opacity === 0) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};
