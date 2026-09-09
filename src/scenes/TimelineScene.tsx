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
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const steps = scene.steps || [];
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  // 장면 전체 slow zoom out
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.05, 1.0], {
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

  // 2행 배치: 상단/하단 나누기 (4개 이상이면 2행)
  const useGrid = steps.length > 4;
  const topRow = useGrid ? steps.slice(0, Math.ceil(steps.length / 2)) : steps;
  const bottomRow = useGrid ? steps.slice(Math.ceil(steps.length / 2)) : [];

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
          padding: "60px 100px",
        }}
      >
        {/* 배경 글로우 */}
        <div
          style={{
            position: "absolute",
            width: 1200,
            height: 600,
            borderRadius: 300,
            background: `radial-gradient(ellipse, ${accent}08 0%, transparent 50%)`,
          }}
        />

        {/* 메인 텍스트 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: isVertical ? 90 : 58,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            marginBottom: isVertical ? 50 : 60,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {/* 타임라인 그리드 — 2행 배치 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {/* 상단 행 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 12,
              width: "100%",
            }}
          >
            {topRow.map((step, i) => {
              const stepDelay = 20 + i * 18;
              return (
                <TimelineNode
                  key={i}
                  step={step}
                  index={i}
                  total={steps.length}
                  accent={accent}
                  frame={frame}
                  fps={fps}
                  delay={stepDelay}
                  isLast={!useGrid && i === steps.length - 1}
                  showConnector={i < topRow.length - 1}
                />
              );
            })}
          </div>

          {/* 하단 행 (5개 이상일 때) */}
          {bottomRow.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 12,
                width: "100%",
              }}
            >
              {bottomRow.map((step, i) => {
                const globalIndex = topRow.length + i;
                const stepDelay = 20 + globalIndex * 18;
                return (
                  <TimelineNode
                    key={i}
                    step={step}
                    index={globalIndex}
                    total={steps.length}
                    accent={accent}
                    frame={frame}
                    fps={fps}
                    delay={stepDelay}
                    isLast={globalIndex === steps.length - 1}
                    showConnector={i < bottomRow.length - 1}
                  />
                );
              })}
            </div>
          )}
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

// 개별 타임라인 노드 컴포넌트
const TimelineNode: React.FC<{
  step: { label: string; description?: string };
  index: number;
  total: number;
  accent: string;
  frame: number;
  fps: number;
  delay: number;
  isLast: boolean;
  showConnector: boolean;
}> = ({ step, index, accent, frame, fps, delay, isLast, showConnector }) => {
  const stepOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const stepScale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const lineDelay = delay + 8;
  const lineProgress = interpolate(frame, [lineDelay, lineDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseOpacity = isLast
    ? interpolate(frame % 60, [0, 30, 60], [0.5, 1, 0.5])
    : 1;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* 단계 노드 */}
      <div
        style={{
          opacity: stepOpacity,
          transform: `scale(${stepScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          minWidth: 140,
          maxWidth: 160,
        }}
      >
        {/* 원형 노드 */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: isLast ? accent : `${accent}25`,
            border: `3px solid ${accent}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: isLast ? `0 0 16px ${accent}60` : `0 0 6px ${accent}15`,
            opacity: pulseOpacity,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: isLast ? "#0a0a0a" : accent,
              fontFamily: "SCDream",
            }}
          >
            {index + 1}
          </span>
        </div>

        {/* 라벨 */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: isLast ? "#ffffff" : "#d0d0d0",
            fontFamily: "SCDream",
            textAlign: "center",
            wordBreak: "keep-all" as const,
            lineHeight: 1.3,
          }}
        >
          {step.label}
        </div>

        {/* 설명 */}
        {step.description && (
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "#888888",
              fontFamily: "SCDream",
              textAlign: "center",
              maxWidth: 140,
              lineHeight: 1.3,
              wordBreak: "keep-all" as const,
            }}
          >
            {step.description}
          </div>
        )}
      </div>

      {/* 연결선 */}
      {showConnector && (
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: accent,
            opacity: lineProgress * 0.5,
            transformOrigin: "left center",
            transform: `scaleX(${lineProgress})`,
            marginTop: -50,
            boxShadow: `0 0 6px ${accent}30`,
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
};
