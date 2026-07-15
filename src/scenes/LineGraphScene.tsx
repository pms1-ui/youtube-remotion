import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { evolvePath } from "@remotion/paths";
import { Scene } from "../data/script";

export const LineGraphScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const lineData = scene.lineData || [];
  const maxValue = Math.max(...lineData.map((d) => d.value));

  // 장면 전체 slow zoom in
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.4], {
    extrapolateRight: "clamp",
  });

  // 차트 영역
  const chartWidth = 1150;
  const chartHeight = 440;
  const padding = { top: 50, right: 60, bottom: 80, left: 80 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // 데이터 포인트 좌표 — 첫 포인트를 우측으로 오프셋하여 Y축 라벨과 겹침 방지
  const xOffset = 40; // 첫 포인트 우측 시작 오프셋
  const usableWidth = innerWidth - xOffset;
  const points = lineData.map((item, i) => ({
    x: padding.left + xOffset + (i / (lineData.length - 1)) * usableWidth,
    y: padding.top + innerHeight - (item.value / maxValue) * innerHeight,
    ...item,
  }));

  // 베지어 곡선 패스
  const curvePath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpx = (prev.x + p.x) / 2;
      return `C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  // 영역 패스
  const areaPath = `${curvePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  // 라인 드로잉
  const lineProgress = interpolate(frame, [25, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineEvolution = evolvePath(lineProgress, curvePath);

  // 영역 페이드
  const areaOpacity = interpolate(frame, [70, 100], [0, 0.15], {
    extrapolateRight: "clamp",
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
        padding: 60,
        transform: `scale(${sceneZoom})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center bottom, ${accent}06 0%, transparent 50%)`,
        }}
      />

      {/* 메인 텍스트 */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 50,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "sans-serif",
          marginBottom: 50,
          textAlign: "center",
          lineHeight: 1.5,
          whiteSpace: "pre-line",
        }}
      >
        {scene.text}
      </div>

      {/* SVG 라인 그래프 */}
      <svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
        {/* Y축 그리드 — 라벨을 왼쪽 바깥으로 충분히 이격 */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = padding.top + innerHeight - (val / maxValue) * innerHeight;
          return (
            <g key={val}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + innerWidth}
                y2={y}
                stroke="#ffffff08"
                strokeWidth={1}
                strokeDasharray="8 6"
              />
              <text
                x={padding.left - 24}
                y={y + 6}
                fill="#555"
                fontSize={22}
                fontFamily="sans-serif"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* X축 */}
        <line
          x1={padding.left}
          y1={padding.top + innerHeight}
          x2={padding.left + innerWidth}
          y2={padding.top + innerHeight}
          stroke="#ffffff15"
          strokeWidth={2}
        />

        {/* 영역 채우기 */}
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity={0.4} />
            <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" opacity={areaOpacity} />

        {/* 그래프 라인 */}
        <path
          d={curvePath}
          fill="none"
          stroke={accent}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={lineEvolution.strokeDasharray}
          strokeDashoffset={lineEvolution.strokeDashoffset}
          style={{ filter: `drop-shadow(0 0 10px ${accent}90)` }}
        />

        {/* 데이터 포인트 */}
        {points.map((p, i) => {
          const pointDelay = 35 + i * 10;
          const pointScale = spring({
            frame: Math.max(0, frame - pointDelay),
            fps,
            config: { damping: 10, stiffness: 140 },
          });
          const labelOpacity = interpolate(
            frame,
            [pointDelay + 5, pointDelay + 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={18 * pointScale}
                fill={accent}
                opacity={0.15}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={10 * pointScale}
                fill={accent}
                stroke="#0a0a0a"
                strokeWidth={4}
              />
              {/* 값 — 정점(최대값)은 아래에 표시, 그 외 위에 표시 */}
              <text
                x={p.x}
                y={p.value === maxValue ? p.y + 50 : p.y - 30}
                fill="#ffffff"
                fontSize={30}
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
                opacity={labelOpacity}
              >
                {p.value}%
              </text>
              {/* X축 라벨 */}
              <text
                x={p.x}
                y={padding.top + innerHeight + 45}
                fill="#bbb"
                fontSize={28}
                fontWeight="600"
                fontFamily="sans-serif"
                textAnchor="middle"
                opacity={labelOpacity}
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* 정점 표시 — 값 텍스트 아래에 배치 (겹침 방지) */}
        {frame > 70 && points.length > 1 && (() => {
          const peakIdx = points.findIndex((p) => p.value === maxValue);
          if (peakIdx === -1) return null;
          const peak = points[peakIdx];
          return (
            <g
              opacity={interpolate(frame, [70, 85], [0, 1], {
                extrapolateRight: "clamp",
              })}
            >
              <rect
                x={peak.x - 55}
                y={peak.y + 65}
                width={110}
                height={34}
                rx={10}
                fill="#00cec918"
                stroke="#00cec950"
                strokeWidth={2}
              />
              <text
                x={peak.x}
                y={peak.y + 88}
                fill="#00cec9"
                fontSize={22}
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                ▲ 정점
              </text>
            </g>
          );
        })()}
      </svg>
    </AbsoluteFill>
  );
};
