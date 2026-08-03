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

export const TextScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const isVertical = width < 1200;

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.1, 1.0], {
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textScale = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const subDelay = 25;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subSlide = interpolate(frame, [subDelay, subDelay + 12], [25, 0], {
    extrapolateRight: "clamp",
  });

  // subtitle이 없으면 description을 subtitle 위치에 표시
  const subText = scene.subtitle || scene.description;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", transform: `scale(${sceneZoom})` }}>
      <div
        style={{
          position: "absolute",
          top: isVertical ? "18%" : 0,
          left: 0,
          right: scene.characterImage ? "23%" : 0,
          bottom: isVertical ? "18%" : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "20px 40px" : "80px 60px",
        }}
      >
        {/* 메인 텍스트 — 큰 흰색 */}
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            lineHeight: 1.3,
            whiteSpace: "pre-line",
            textAlign: "center",
            maxWidth: 900,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {/* 서브 텍스트 — accent 색상 (subtitle 또는 description 중 하나만) */}
        {subText && (
          <div
            style={{
              opacity: subOpacity,
              transform: `translateY(${subSlide}px)`,
              fontSize: 52,
              fontWeight: 500,
              color: accent,
              fontFamily: "SCDream",
              marginTop: 28,
              textAlign: "center",
              wordBreak: "keep-all" as const,
              whiteSpace: "pre-line",
            }}
          >
            {subText}
          </div>
        )}
      </div>

      {scene.characterImage && (
        <Img
          src={staticFile(scene.characterImage)}
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
