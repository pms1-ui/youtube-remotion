import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { Scene } from "../data/script";

// 이미지가 주인공인 장면 — 이미지 + 캡션을 화면 정중앙에 세로 스택
export const ImageShowcaseScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#4A90D9";

  const imgZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });
  const imgOpacity = interpolate(frame, [2, 16], [0, 1], { extrapolateRight: "clamp" });
  const imgSlide = interpolate(frame, [2, 18], [24, 0], { extrapolateRight: "clamp" });

  const capDelay = 18;
  const capOpacity = interpolate(frame, [capDelay, capDelay + 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const capSlide = interpolate(frame, [capDelay, capDelay + 14], [24, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 80px",
        gap: 40,
      }}
    >
      {/* 큰 이미지 */}
      {scene.sceneImage && (
        <div
          style={{
            flex: "0 1 auto",
            minHeight: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: imgOpacity,
            transform: `translateY(${imgSlide}px) scale(${imgZoom})`,
          }}
        >
          <Img
            src={staticFile(scene.sceneImage)}
            style={{
              maxHeight: "62vh",
              maxWidth: "70%",
              objectFit: "contain",
              filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      )}

      {/* 캡션 */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: capOpacity,
          transform: `translateY(${capSlide}px)`,
        }}
      >
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            lineHeight: 1.25,
            whiteSpace: "pre-line",
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>
        {scene.subtitle && (
          <div
            style={{
              marginTop: 18,
              fontSize: 46,
              fontWeight: 500,
              color: accent,
              fontFamily: "SCDream",
              textAlign: "center",
              wordBreak: "keep-all" as const,
              whiteSpace: "pre-line",
            }}
          >
            {scene.subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
