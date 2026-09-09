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

// 이미지 + 텍스트를 화면 중앙에 나란히 (가로형) / 위아래 (세로형), 중앙 균형
export const ImageTextScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#4A90D9";
  const isVertical = width < 1200;

  const imgZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });
  const imgOpacity = interpolate(frame, [2, 16], [0, 1], { extrapolateRight: "clamp" });
  const imgSlide = interpolate(frame, [2, 18], [-24, 0], { extrapolateRight: "clamp" });

  const titleScale = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(frame, [12, 26], [0, 1], { extrapolateRight: "clamp" });

  const descDelay = 26;
  const descOpacity = interpolate(frame, [descDelay, descDelay + 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const descSlide = interpolate(frame, [descDelay, descDelay + 14], [20, 0], {
    extrapolateRight: "clamp",
  });

  // sceneImage 우선, 없으면 characterImage로 대체
  const imageSrc = scene.sceneImage || scene.characterImage;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 40 : 70,
        padding: isVertical ? "80px 60px" : "60px 100px",
      }}
    >
      {/* 이미지 (sceneImage 우선, 없으면 캐릭터) */}
      {imageSrc && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            opacity: imgOpacity,
            transform: `translateX(${isVertical ? 0 : imgSlide}px) scale(${imgZoom})`,
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              maxHeight: isVertical ? "42vh" : "78vh",
              maxWidth: isVertical ? "70%" : "42vw",
              objectFit: "contain",
              filter: "drop-shadow(0 16px 44px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      )}

      {/* 텍스트 — 항상 가운데 정렬 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          maxWidth: isVertical ? 900 : 620,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: isVertical ? 96 : 76,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            lineHeight: 1.3,
            whiteSpace: "pre-line",
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {scene.subtitle && (
          <div
            style={{
              opacity: descOpacity,
              transform: `translateY(${descSlide}px)`,
              marginTop: 24,
              fontSize: isVertical ? 60 : 48,
              fontWeight: 700,
              color: accent,
              fontFamily: "SCDream",
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.subtitle}
          </div>
        )}

        {scene.description && (
          <div
            style={{
              opacity: descOpacity,
              transform: `translateY(${descSlide}px)`,
              marginTop: 18,
              fontSize: isVertical ? 46 : 34,
              fontWeight: 500,
              color: "#aaaaaa",
              fontFamily: "SCDream",
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.description}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
