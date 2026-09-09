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

export const RadarChartScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const radarData = scene.radarData || [];
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 레이더 차트 설정
  const chartSize = isVertical ? 420 : 380;
  const cx = chartSize / 2;
  const cy = chartSize / 2;
  const maxRadius = chartSize / 2 - 60;
  const levels = 5;
  const numAxes = radarData.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  // 축 좌표 계산
  const getPoint = (axisIndex: number, value: number) => {
    const angle = angleSlice * axisIndex - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // 데이터 영역 패스 (애니메이션)
  const dataProgress = interpolate(frame, [30, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dataPath = radarData
    .map((item, i) => {
      const animatedValue = item.value * dataProgress;
      const point = getPoint(i, animatedValue);
      return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ") + " Z";

  // 펄스 글로우
  const pulseOpacity = interpolate(frame % 60, [0, 30, 60], [0.3, 0.7, 0.3]);

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
            fontSize: 58,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            marginBottom: 20,
            textAlign: "center",
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {scene.description && (
          <div
            style={{
              opacity: interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" }),
              fontSize: 32,
              fontWeight: 500,
              color: "#999",
              fontFamily: "SCDream",
              textAlign: "center",
              marginBottom: 30,
              wordBreak: "keep-all" as const,
              whiteSpace: "pre-line",
            }}
          >
            {scene.description}
          </div>
        )}

        {/* 레이더 차트 + 범례 */}
        <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
          <svg width={chartSize} height={chartSize} style={{ overflow: "visible" }}>
            {/* 레벨 격자 (거미줄) */}
            {Array.from({ length: levels }).map((_, level) => {
              const levelRadius = ((level + 1) / levels) * maxRadius;
              const levelOpacity = interpolate(
                frame,
                [10 + level * 3, 20 + level * 3],
                [0, 0.3],
                { extrapolateRight: "clamp" }
              );
              const points = Array.from({ length: numAxes })
                .map((_, i) => {
                  const angle = angleSlice * i - Math.PI / 2;
                  return `${cx + levelRadius * Math.cos(angle)},${cy + levelRadius * Math.sin(angle)}`;
                })
                .join(" ");
              return (
                <polygon
                  key={level}
                  points={points}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={1}
                  opacity={levelOpacity}
                />
              );
            })}

            {/* 축 라인 */}
            {radarData.map((_, i) => {
              const endPoint = getPoint(i, 100);
              const axisOpacity = interpolate(
                frame,
                [15 + i * 2, 25 + i * 2],
                [0, 0.2],
                { extrapolateRight: "clamp" }
              );
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke="#ffffff"
                  strokeWidth={1}
                  opacity={axisOpacity}
                />
              );
            })}

            {/* 데이터 영역 */}
            <polygon
              points={radarData
                .map((item, i) => {
                  const animatedValue = item.value * dataProgress;
                  const point = getPoint(i, animatedValue);
                  return `${point.x},${point.y}`;
                })
                .join(" ")}
              fill={`${accent}20`}
              stroke={accent}
              strokeWidth={3}
              style={{ filter: `drop-shadow(0 0 12px ${accent}60)` }}
              opacity={dataProgress}
            />

            {/* 데이터 포인트 */}
            {radarData.map((item, i) => {
              const pointDelay = 40 + i * 8;
              const pointScale = spring({
                frame: Math.max(0, frame - pointDelay),
                fps,
                config: { damping: 10, stiffness: 140 },
              });
              const animatedValue = item.value * dataProgress;
              const point = getPoint(i, animatedValue);
              return (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={8 * pointScale}
                    fill={accent}
                    stroke="#0a0a0a"
                    strokeWidth={3}
                    opacity={dataProgress}
                  />
                </g>
              );
            })}

            {/* 축 라벨 */}
            {radarData.map((item, i) => {
              const labelPoint = getPoint(i, 120);
              const labelOpacity = interpolate(
                frame,
                [50 + i * 5, 65 + i * 5],
                [0, 1],
                { extrapolateRight: "clamp" }
              );
              return (
                <text
                  key={i}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  fill="#e0e0e0"
                  fontSize={28}
                  fontWeight={600}
                  fontFamily="SCDream"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={labelOpacity}
                >
                  {item.axis}
                </text>
              );
            })}
          </svg>

          {/* 범례 (수치 표시) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {radarData.map((item, i) => {
              const delay = 55 + i * 6;
              const legendOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
                extrapolateRight: "clamp",
              });
              const countUp = interpolate(
                frame,
                [delay, delay + 25],
                [0, item.value],
                { extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    opacity: legendOpacity,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 4,
                      backgroundColor: accent,
                      opacity: 0.6 + (i * 0.1),
                    }}
                  />
                  <span
                    style={{
                      fontSize: 30,
                      fontWeight: 500,
                      color: "#ccc",
                      fontFamily: "SCDream",
                      wordBreak: "keep-all" as const,
                    }}
                  >
                    {item.axis}
                  </span>
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: accent,
                      fontFamily: "SCDream",
                    }}
                  >
                    {Math.round(countUp)}%
                  </span>
                </div>
              );
            })}
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
