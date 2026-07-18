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

export const IconListScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const bullets = scene.bullets || [];
  const hasChar = Boolean(scene.characterImage);

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.1], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", transform: `scale(${sceneZoom})` }}>
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
          padding: "60px 80px",
        }}
      >
        {/* 메인 텍스트 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 70,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            marginBottom: 50,
            wordBreak: "keep-all" as const,
            whiteSpace: "pre-line",
          }}
        >
          {scene.text}
        </div>

        {/* 세로 리스트 — 넘버링 + 키워드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 700 }}>
          {bullets.map((bullet, i) => {
            const delay = 20 + i * 12;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
              extrapolateRight: "clamp",
            });
            const slideX = interpolate(frame, [delay, delay + 15], [-40, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${slideX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "16px 28px",
                  borderLeft: `4px solid ${accent}`,
                  backgroundColor: `${accent}08`,
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: accent,
                    fontFamily: "SCDream",
                    minWidth: 36,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: 38,
                    fontWeight: 500,
                    color: "#f0f0f0",
                    fontFamily: "SCDream",
                    wordBreak: "keep-all" as const,
                  }}
                >
                  {bullet}
                </span>
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
