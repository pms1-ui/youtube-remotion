import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Scene } from "../data/script";

// 키워드 카드 — 보라색 테두리, 투명 배경
const KeywordCard: React.FC<{
  label: string;
  desc?: string;
  index: number;
  frame: number;
  fps: number;
  delay: number;
}> = ({ label, desc, index, frame, fps, delay }) => {
  const cardScale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slideX = interpolate(frame, [delay, delay + 18], [-50, 0], {
    extrapolateRight: "clamp",
  });

  // 글로우 활성화
  const glowActive = interpolate(frame, [delay + 12, delay + 22], [0, 1], {
    extrapolateRight: "clamp",
  });

  const borderColor = `rgba(108, 92, 231, ${0.3 + glowActive * 0.4})`;
  const shadowColor = `rgba(108, 92, 231, ${glowActive * 0.3})`;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale}) translateX(${slideX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 32px",
        borderRadius: 16,
        border: `2px solid ${borderColor}`,
        backgroundColor: "transparent",
        boxShadow: glowActive > 0.5 ? `0 0 20px ${shadowColor}` : "none",
        minWidth: 240,
      }}
    >
      {/* 인덱스 */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(108, 92, 231, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#6c5ce7",
            fontFamily: "sans-serif",
          }}
        >
          {index + 1}
        </span>
      </div>

      {/* 라벨 + 부연 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#f0f0f0",
            fontFamily: "sans-serif",
            wordBreak: "keep-all" as const,
          }}
        >
          {label}
        </span>
        {desc && (
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#888888",
              fontFamily: "sans-serif",
              wordBreak: "keep-all" as const,
            }}
          >
            {desc}
          </span>
        )}
      </div>
    </div>
  );
};

export const HighlightScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const bullets = scene.bullets || [];
  const bulletDescs = scene.bulletDescriptions || [];
  const hasValues = Boolean(scene.bulletValues && scene.bulletValues.length > 0);

  // 장면 전체 slow zoom in
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.4], {
    extrapolateRight: "clamp",
  });

  // 메인 텍스트 등장
  const titleScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 600,
          borderRadius: 300,
          opacity: interpolate(frame % 100, [0, 50, 100], [0.15, 0.4, 0.15]),
          background: `radial-gradient(ellipse, ${accent}0c 0%, transparent 60%)`,
        }}
      />

      {/* 메인 텍스트 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontSize: 60,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "sans-serif",
          textAlign: "center",
          lineHeight: 1.5,
          whiteSpace: "pre-line",
          maxWidth: 1200,
          marginBottom: 12,
          wordBreak: "keep-all" as const,
        }}
      >
        {scene.text}
      </div>

      {/* 부연설명 */}
      {scene.description && (
        <div
          style={{
            opacity: interpolate(frame, [18, 32], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 30,
            fontWeight: 400,
            color: "#888888",
            fontFamily: "sans-serif",
            textAlign: "center",
            marginBottom: 45,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.description}
        </div>
      )}
      {!scene.description && <div style={{ marginBottom: 45 }} />}

      {/* 키워드 카드 그리드 — 보라색 테두리, 투명 배경 */}
      {bullets.length > 0 && !hasValues && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: bullets.length <= 3 ? `repeat(${bullets.length}, auto)` : "repeat(2, auto)",
            gap: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {bullets.map((bullet, i) => (
            <KeywordCard
              key={i}
              label={bullet}
              desc={bulletDescs[i]}
              index={i}
              frame={frame}
              fps={fps}
              delay={30 + i * 14}
            />
          ))}
        </div>
      )}

      {/* 원형 프로그레스 모드 */}
      {bullets.length > 0 && hasValues && (
        <div
          style={{
            display: "flex",
            gap: 60,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {bullets.map((bullet, i) => {
            const delay = 35 + i * 10;
            const targetValue = scene.bulletValues?.[i] ?? 50;
            const progress = interpolate(
              frame,
              [delay, delay + 35],
              [0, targetValue / 100],
              { extrapolateRight: "clamp" }
            );
            const itemOpacity = interpolate(
              frame,
              [delay, delay + 10],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            return (
              <div key={i} style={{ opacity: itemOpacity }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
                  <div style={{ position: "relative", width: 180, height: 180 }}>
                    <svg width={180} height={180}>
                      <circle cx={90} cy={90} r={74} fill="none" stroke="#ffffff0a" strokeWidth={12} />
                      <circle
                        cx={90} cy={90} r={74} fill="none"
                        stroke={accent} strokeWidth={12}
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 74}
                        strokeDashoffset={(2 * Math.PI * 74) * (1 - progress)}
                        transform="rotate(-90 90 90)"
                        style={{ filter: `drop-shadow(0 0 10px ${accent}80)` }}
                      />
                    </svg>
                    <div
                      style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        display: "flex", justifyContent: "center", alignItems: "center",
                        fontSize: 38, fontWeight: 900, color: accent, fontFamily: "sans-serif",
                      }}
                    >
                      {Math.round(progress * 100)}%
                    </div>
                  </div>
                  <span style={{ fontSize: 34, fontWeight: 700, color: "#e0e0e0", fontFamily: "sans-serif", wordBreak: "keep-all" as const }}>
                    {bullet}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
