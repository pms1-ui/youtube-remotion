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

export const BarChartScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#ffd93d";
  const barData = scene.barData || [];
  const maxValue = Math.max(...barData.map((d) => d.value));
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200; // 숏폼 감지

  // 장면 전체 slow zoom out
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.1, 1.0], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 차트 영역 — 캐릭터가 있으면 작게, 숏폼이면 더 작게
  const chartWidth = isVertical ? 700 : (hasChar ? 900 : 1200);
  const chartHeight = isVertical ? 350 : 420;
  const barGap = 30;
  const barWidth =
    (chartWidth - barGap * (barData.length + 1)) / barData.length;

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
          padding: 60,
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
            marginBottom: 40,
            textAlign: "center",
            lineHeight: 1.4,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {scene.description && (
          <div style={{ opacity: interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" }), fontSize: 32, color: "#999", fontFamily: "SCDream", textAlign: "center", marginBottom: 30, wordBreak: "keep-all" as const }}>
            {scene.description}
          </div>
        )}

        {/* SVG 막대 차트 */}
        <svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
        {/* Y축 그리드 */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = chartHeight - 80 - ((val / 100) * (chartHeight - 110));
          return (
            <g key={val}>
              <line
                x1={0}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="#ffffff0a"
                strokeWidth={1}
              />
              <text
                x={-14}
                y={y + 7}
                fill="#777"
                fontSize={28}
                fontFamily="SCDream"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* X축 베이스 라인 */}
        <line
          x1={0}
          y1={chartHeight - 80}
          x2={chartWidth}
          y2={chartHeight - 80}
          stroke="#ffffff20"
          strokeWidth={2}
        />

        {/* 바 */}
        {barData.map((item, i) => {
          const delay = 25 + i * 8;
          const barGrow = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12, stiffness: 60 },
          });

          const barH = (item.value / maxValue) * (chartHeight - 130) * barGrow;
          const x = barGap + i * (barWidth + barGap);
          const y = chartHeight - 80 - barH;

          const labelOpacity = interpolate(
            frame,
            [delay + 12, delay + 22],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <g key={i}>
              {/* 바 그림자 */}
              <rect
                x={x + 4}
                y={y + 4}
                width={barWidth}
                height={barH}
                rx={14}
                fill="#000000"
                opacity={0.3}
              />
              {/* 메인 바 */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={14}
                fill={item.color}
                style={{ filter: `drop-shadow(0 0 14px ${item.color}60)` }}
              />
              {/* 상단 하이라이트 */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.min(barH, 30)}
                rx={14}
                fill="#ffffff"
                opacity={0.15}
              />
              {/* 값 */}
              <text
                x={x + barWidth / 2}
                y={y - 20}
                fill={item.color}
                fontSize={34}
                fontWeight="bold"
                fontFamily="SCDream"
                textAnchor="middle"
                opacity={labelOpacity}
              >
                {item.value}%
              </text>
              {/* 라벨 */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 35}
                fill="#dddddd"
                fontSize={32}
                fontWeight="600"
                fontFamily="SCDream"
                textAnchor="middle"
                opacity={labelOpacity}
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      </div>

      {/* 캐릭터 */}
      {hasChar && (
        <Img
          src={staticFile(scene.characterImage!)}
          style={{
            position: "absolute",
            right: "12%",
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
