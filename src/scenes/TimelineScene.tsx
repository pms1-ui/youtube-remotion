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

export const TimelineScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const steps = scene.steps || [];
  const hasChar = Boolean(scene.characterImage);

  // 장면 전체 slow zoom out
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.1, 1.0], {
    extrapolateRight: "clamp",
  });

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
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* 콘텐츠 영역 */}
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
          padding: 80,
        }}
      >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          width: 1600,
          height: 800,
          borderRadius: 400,
          background: `radial-gradient(ellipse, ${accent}06 0%, transparent 50%)`,
        }}
      />

      {/* 메인 텍스트 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 62,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "SCDream",
          textAlign: "center",
          marginBottom: 80,
          wordBreak: "keep-all" as const,
        }}
      >
        {scene.text}
      </div>

      {/* 타임라인 */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 0,
          justifyContent: "center",
          position: "relative",
        }}
      >
        {steps.map((step, i) => {
          const stepDelay = 25 + i * 25;
          const stepOpacity = interpolate(
            frame,
            [stepDelay, stepDelay + 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const stepScale = spring({
            frame: Math.max(0, frame - stepDelay),
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          // 연결선 드로잉
          const lineDelay = stepDelay + 10;
          const lineProgress = interpolate(
            frame,
            [lineDelay, lineDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // 펄스 효과 (현재 활성 단계)
          const isLast = i === steps.length - 1;
          const pulseOpacity = isLast
            ? interpolate(
                frame % 60,
                [0, 30, 60],
                [0.4, 1, 0.4]
              )
            : 1;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* 단계 노드 */}
              <div
                style={{
                  opacity: stepOpacity,
                  transform: `scale(${stepScale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  minWidth: 200,
                }}
              >
                {/* 원형 노드 */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: isLast ? accent : `${accent}30`,
                    border: `3px solid ${accent}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: isLast
                      ? `0 0 20px ${accent}60`
                      : `0 0 10px ${accent}20`,
                    opacity: pulseOpacity,
                  }}
                >
                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: isLast ? "#0a0a0a" : accent,
                      fontFamily: "SCDream",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* 라벨 */}
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 700,
                    color: isLast ? "#ffffff" : "#cccccc",
                    fontFamily: "SCDream",
                    textAlign: "center",
                    wordBreak: "keep-all" as const,
                  }}
                >
                  {step.label}
                </div>

                {/* 설명 */}
                {step.description && (
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 500,
                      color: "#999999",
                      fontFamily: "SCDream",
                      textAlign: "center",
                      maxWidth: 180,
                      lineHeight: 1.4,
                      wordBreak: "keep-all" as const,
                    }}
                  >
                    {step.description}
                  </div>
                )}
              </div>

              {/* 연결선 */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 80,
                    height: 3,
                    backgroundColor: accent,
                    opacity: lineProgress * 0.6,
                    transformOrigin: "left center",
                    transform: `scaleX(${lineProgress})`,
                    marginTop: -60,
                    boxShadow: `0 0 8px ${accent}40`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      </div>

      {/* 캐릭터 */}
      {hasChar && (
        <Img
          src={staticFile(scene.characterImage!)}
          style={{
            position: "absolute",
            right: "5%",
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
