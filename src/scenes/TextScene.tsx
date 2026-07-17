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
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";

  // 장면 전체 slow zoom out (1.15 → 1.0)
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.15, 1.0], {
    extrapolateRight: "clamp",
  });

  // 메인 텍스트 — 일반 spring 등장
  const textOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textScale = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // subtitle — 딜레이 등장, 아래에서 슬라이드 업
  const subDelay = 30;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subSlide = interpolate(frame, [subDelay, subDelay + 15], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* 텍스트 영역 — 항상 화면 중앙에 모여있는 느낌 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: scene.characterImage ? "23%" : 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 60px",
        }}
      >
        {/* 메인 텍스트 */}
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
            maxWidth: 900,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {/* subtitle — accent 색상 */}
        {scene.subtitle && (
          <div
            style={{
              opacity: subOpacity,
              transform: `translateY(${subSlide}px)`,
              fontSize: 56,
              fontWeight: 700,
              color: accent,
              fontFamily: "sans-serif",
              marginTop: 30,
              textAlign: "center",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.subtitle}
          </div>
        )}

        {/* description */}
        {scene.description && (
          <div
            style={{
              opacity: interpolate(frame, [subDelay + 12, subDelay + 24], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [subDelay + 12, subDelay + 24], [15, 0], { extrapolateRight: "clamp" })}px)`,
              fontSize: 32,
              fontWeight: 400,
              color: "#999999",
              fontFamily: "sans-serif",
              marginTop: 24,
              textAlign: "center",
              maxWidth: 800,
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.description}
          </div>
        )}
      </div>

      {/* 캐릭터 이미지 — 텍스트 바로 옆, 가까이 배치 */}
      {scene.characterImage && (
        <Img
          src={staticFile(scene.characterImage)}
          style={{
            position: "absolute",
            right: "12%",
            bottom: 0,
            height: "95%",
            opacity: interpolate(frame, [3, 15], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateX(${interpolate(frame, [3, 15], [40, 0], { extrapolateRight: "clamp" })}px)`,
            objectFit: "contain",
            objectPosition: "center bottom",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
