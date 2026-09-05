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

const ProgressCard: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
  description?: string;
  index: number;
  frame: number;
  fps: number;
  delay: number;
}> = ({ label, value, maxValue, color, description, index, frame, fps, delay }) => {
  const cardScale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 프로그레스 바 채워지는 애니메이션
  const barFill = interpolate(
    frame,
    [delay + 12, delay + 45],
    [0, value / maxValue],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 숫자 카운트업
  const countUp = interpolate(
    frame,
    [delay + 12, delay + 45],
    [0, value],
    { extrapolateRight: "clamp" }
  );

  const barWidth = 380;
  const barHeight = 16;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "20px 28px",
        borderRadius: 16,
        border: `1px solid ${color}30`,
        backgroundColor: `${color}08`,
        minWidth: 420,
      }}
    >
      {/* 상단: 라벨 + 수치 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#f0f0f0",
            fontFamily: "SCDream",
            wordBreak: "keep-all" as const,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 34,
            fontWeight: 700,
            color,
            fontFamily: "SCDream",
          }}
        >
          {Math.round(countUp)}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div
        style={{
          width: barWidth,
          height: barHeight,
          borderRadius: barHeight / 2,
          backgroundColor: "#ffffff0a",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: barWidth * barFill,
            height: "100%",
            borderRadius: barHeight / 2,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}60`,
            transition: "none",
          }}
        />
      </div>

      {/* 부연 설명 */}
      {description && (
        <span
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "#888",
            fontFamily: "SCDream",
            wordBreak: "keep-all" as const,
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
};

export const ProgressCardsScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#4A90D9";
  const cards = scene.progressCards || [];
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.05], {
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

  const maxVal = Math.max(...cards.map((c) => c.maxValue || 100));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        transform: `scale(${sceneZoom})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isVertical ? "18%" : 0,
          left: 0,
          right: hasChar ? "23%" : 0,
          bottom: isVertical ? "18%" : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "20px 40px" : 60,
        }}
      >
        {/* 메인 텍스트 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: isVertical ? 100 : 62,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            marginBottom: 16,
            wordBreak: "keep-all" as const,
            whiteSpace: "pre-line",
          }}
        >
          {scene.text}
        </div>

        {scene.description && (
          <div
            style={{
              opacity: interpolate(frame, [15, 28], [0, 1], { extrapolateRight: "clamp" }),
              fontSize: 32,
              fontWeight: 500,
              color: "#888",
              fontFamily: "SCDream",
              textAlign: "center",
              marginBottom: 40,
              wordBreak: "keep-all" as const,
              whiteSpace: "pre-line",
            }}
          >
            {scene.description}
          </div>
        )}
        {!scene.description && <div style={{ marginBottom: 40 }} />}

        {/* 카드 리스트 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 700,
            alignItems: "center",
          }}
        >
          {cards.map((card, i) => (
            <ProgressCard
              key={i}
              label={card.label}
              value={card.value}
              maxValue={card.maxValue || maxVal}
              color={card.color}
              description={card.description}
              index={i}
              frame={frame}
              fps={fps}
              delay={25 + i * 14}
            />
          ))}
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
