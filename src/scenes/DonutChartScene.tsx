import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Scene } from "../data/script";

export const DonutChartScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = scene.accent || "#00e5ff";
  const donutData = scene.donutData || [];

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 도넛 차트 크기
  const donutSize = 360;
  const thickness = 36;
  const radius = (donutSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = donutSize / 2;
  const cy = donutSize / 2;

  // 각 세그먼트 계산
  const total = donutData.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercent = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}06 0%, transparent 50%)`,
        }}
      />

      {/* 메인 텍스트 */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 54,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "sans-serif",
          marginBottom: 60,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {scene.text}
      </div>

      {/* 도넛 + 범례 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
          justifyContent: "center",
        }}
      >
        {/* SVG 도넛 차트 */}
        <div style={{ position: "relative", width: donutSize, height: donutSize }}>
          <svg width={donutSize} height={donutSize} style={{ overflow: "visible" }}>
            {/* 배경 링 */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#ffffff08"
              strokeWidth={thickness}
            />

            {/* 세그먼트 */}
            {donutData.map((item, i) => {
              const percent = item.value / total;
              const offset = cumulativePercent;
              cumulativePercent += percent;

              const delay = 30 + i * 12;
              const segmentProgress = interpolate(
                frame,
                [delay, delay + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const dashLength = circumference * percent * segmentProgress;
              const gapLength = circumference - dashLength;
              const rotation = offset * 360 - 90;

              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={thickness}
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${gapLength}`}
                  transform={`rotate(${rotation} ${cx} ${cy})`}
                  style={{ filter: `drop-shadow(0 0 10px ${item.color}60)` }}
                />
              );
            })}
          </svg>

          {/* 중앙 텍스트 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "sans-serif",
              }}
            >
              {donutData.length}
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#888",
                fontFamily: "sans-serif",
              }}
            >
              항목
            </div>
          </div>
        </div>

        {/* 범례 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {donutData.map((item, i) => {
            const delay = 40 + i * 10;
            const legendOpacity = interpolate(
              frame,
              [delay, delay + 15],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const legendX = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 14, stiffness: 100 },
            });
            const translateX = interpolate(legendX, [0, 1], [40, 0]);

            const countUp = interpolate(
              frame,
              [delay + 5, delay + 30],
              [0, item.value],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: legendOpacity,
                  transform: `translateX(${translateX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                {/* 컬러 인디케이터 */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    backgroundColor: item.color,
                    boxShadow: `0 0 12px ${item.color}50`,
                    flexShrink: 0,
                  }}
                />
                {/* 라벨 */}
                <span
                  style={{
                    fontSize: 38,
                    fontWeight: 600,
                    color: "#e0e0e0",
                    fontFamily: "sans-serif",
                    minWidth: 240,
                  }}
                >
                  {item.label}
                </span>
                {/* 값 */}
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: item.color,
                    fontFamily: "sans-serif",
                  }}
                >
                  {Math.round(countUp)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
