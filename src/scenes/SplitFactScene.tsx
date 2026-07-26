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

export const SplitFactScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const hasChar = Boolean(scene.characterImage);
  const compareData = scene.compareData;

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.1, 1.0], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  if (!compareData) return null;

  // 상단 (원인/오해) — 빨간 톤
  const topDelay = 15;
  const topOpacity = interpolate(frame, [topDelay, topDelay + 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const topSlide = interpolate(frame, [topDelay, topDelay + 12], [-30, 0], {
    extrapolateRight: "clamp",
  });

  // 하단 (결과/진실) — 초록/파란 톤
  const botDelay = 35;
  const botOpacity = interpolate(frame, [botDelay, botDelay + 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const botSlide = interpolate(frame, [botDelay, botDelay + 12], [30, 0], {
    extrapolateRight: "clamp",
  });

  // 화살표 등장
  const arrowDelay = 28;
  const arrowOpacity = interpolate(frame, [arrowDelay, arrowDelay + 10], [0, 1], {
    extrapolateRight: "clamp",
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
          gap: 0,
        }}
      >
        {/* 타이틀 */}
        <div
          style={{
            opacity: titleOpacity,
            fontSize: 58,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            marginBottom: 40,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {/* 상단 블록 — 원인/오해 */}
        <div
          style={{
            opacity: topOpacity,
            transform: `translateY(${topSlide}px)`,
            padding: "20px 36px",
            borderRadius: 16,
            border: `2px solid #e1705560`,
            backgroundColor: "#e1705508",
            width: "100%",
            maxWidth: 650,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 500, color: "#e17055", fontFamily: "SCDream", marginBottom: 8 }}>
            {compareData.left.title}
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#ffffff", fontFamily: "SCDream", wordBreak: "keep-all" as const, whiteSpace: "pre-line" }}>
            {compareData.left.description}
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ opacity: arrowOpacity, margin: "12px 0" }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M20 8 L20 28 M12 22 L20 30 L28 22" fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 하단 블록 — 결과/진실 */}
        <div
          style={{
            opacity: botOpacity,
            transform: `translateY(${botSlide}px)`,
            padding: "20px 36px",
            borderRadius: 16,
            border: `2px solid ${accent}60`,
            backgroundColor: `${accent}08`,
            width: "100%",
            maxWidth: 650,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 500, color: accent, fontFamily: "SCDream", marginBottom: 8 }}>
            {compareData.right.title}
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#ffffff", fontFamily: "SCDream", wordBreak: "keep-all" as const, whiteSpace: "pre-line" }}>
            {compareData.right.description}
          </div>
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
