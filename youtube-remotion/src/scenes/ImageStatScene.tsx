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

// 이미지 + 큰 수치 하나 강조 — 화면 중앙에 나란히, 중앙 균형
export const ImageStatScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#00b894";
  const isVertical = width < 1200;

  const imgZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });
  const imgOpacity = interpolate(frame, [2, 16], [0, 1], { extrapolateRight: "clamp" });
  const imgSlide = interpolate(frame, [2, 18], [-24, 0], { extrapolateRight: "clamp" });

  const statScale = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const statOpacity = interpolate(frame, [16, 28], [0, 1], { extrapolateRight: "clamp" });

  const labelDelay = 30;
  const labelOpacity = interpolate(frame, [labelDelay, labelDelay + 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const labelSlide = interpolate(frame, [labelDelay, labelDelay + 14], [20, 0], {
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
        gap: isVertical ? 30 : 70,
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
              maxHeight: isVertical ? "38vh" : "78vh",
              maxWidth: isVertical ? "66%" : "40vw",
              objectFit: "contain",
              filter: "drop-shadow(0 16px 44px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      )}

      {/* 수치 그룹 — 항상 가운데 */}
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
        {scene.text && (
          <div
            style={{
              opacity: labelOpacity,
              transform: `translateY(${labelSlide}px)`,
              fontSize: isVertical ? 60 : 50,
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "SCDream",
              marginBottom: 10,
              lineHeight: 1.3,
              whiteSpace: "pre-line",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.text}
          </div>
        )}

        {scene.statValue && (
          <div
            style={{
              opacity: statOpacity,
              transform: `scale(${statScale})`,
              fontSize: isVertical ? 200 : 220,
              fontWeight: 700,
              color: accent,
              fontFamily: "SCDream",
              lineHeight: 1,
            }}
          >
            {scene.statValue}
          </div>
        )}

        {scene.statLabel && (
          <div
            style={{
              opacity: labelOpacity,
              transform: `translateY(${labelSlide}px)`,
              marginTop: 16,
              fontSize: isVertical ? 52 : 42,
              fontWeight: 500,
              color: "#cccccc",
              fontFamily: "SCDream",
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.statLabel}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
