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

// 전후 비교 그룹 막대 — 항목별 before(회색) → after(컬러) 두 막대를 묶어 개수 증가를 표현
export const BeforeAfterChartScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#ffd93d";
  const data = scene.beforeAfterData || [];
  const unit = scene.unit || "";
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  const beforeColor = "#5a6270";

  const maxValue = Math.max(...data.map((d) => Math.max(d.before, d.after)), 1);

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.05, 1.0], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [isVertical ? 2 : 5, isVertical ? 8 : 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 차트 영역
  const chartWidth = isVertical ? 760 : hasChar ? 980 : 1280;
  const chartHeight = isVertical ? 600 : 430;
  const baseY = chartHeight - 64; // x축 위치 (하단 라벨 공간)
  const topPad = 130; // 상단 값 + 증가율 뱃지 여백 (막대가 높아도 안 잘리게 충분히)
  const usableH = baseY - topPad;

  const groupGap = 70;
  const barGap = 24; // 그룹 내 before/after 간격
  const groupWidth = (chartWidth - groupGap * (data.length + 1)) / data.length;
  const barWidth = (groupWidth - barGap) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", transform: `scale(${sceneZoom})` }}>
      <div
        style={{
          position: "absolute",
          top: isVertical ? "16%" : 0,
          left: 0,
          right: hasChar ? "23%" : 0,
          bottom: isVertical ? "16%" : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "20px 40px" : "40px 60px",
        }}
      >
        {/* 타이틀 */}
        <div
          style={{
            opacity: titleOpacity,
            fontSize: isVertical ? 96 : 70,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            marginBottom: 14,
            textAlign: "center",
            lineHeight: 1.3,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {scene.description && (
          <div
            style={{
              opacity: interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" }),
              fontSize: isVertical ? 48 : 32,
              color: "#999",
              fontFamily: "SCDream",
              textAlign: "center",
              marginBottom: 24,
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.description}
          </div>
        )}

        {/* 범례 */}
        <div
          style={{
            opacity: interpolate(frame, [14, 26], [0, 1], { extrapolateRight: "clamp" }),
            display: "flex",
            gap: 40,
            marginBottom: 22,
          }}
        >
          <Legend color={beforeColor} label="시작 전" />
          <Legend color={accent} label="9주 후" />
        </div>

        {/* 차트 */}
        <svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
          {/* x축 베이스라인 */}
          <line x1={0} y1={baseY} x2={chartWidth} y2={baseY} stroke="#ffffff22" strokeWidth={2} />

          {data.map((item, i) => {
            const groupX = groupGap + i * (groupWidth + groupGap);
            const beforeX = groupX;
            const afterX = groupX + barWidth + barGap;

            const delay = isVertical ? 8 + i * 6 : 22 + i * 12;

            const beforeGrow = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 13, stiffness: 60 },
            });
            const afterGrow = spring({
              frame: Math.max(0, frame - delay - 8),
              fps,
              config: { damping: 13, stiffness: 60 },
            });

            const beforeH = (item.before / maxValue) * usableH * beforeGrow;
            const afterH = (item.after / maxValue) * usableH * afterGrow;

            const valOpacity = interpolate(frame, [delay + 14, delay + 26], [0, 1], {
              extrapolateRight: "clamp",
            });

            // 증가 배수 (예: 2.6배)
            const ratio = item.before > 0 ? item.after / item.before : 0;
            const ratioText = ratio >= 2 ? `${ratio.toFixed(1)}배` : `+${Math.round((ratio - 1) * 100)}%`;
            const ratioOpacity = interpolate(frame, [delay + 24, delay + 36], [0, 1], {
              extrapolateRight: "clamp",
            });

            const fmt = (v: number) => `${v}`;

            // 값 텍스트 y (막대 위), SVG 상단 밖으로 안 나가게 최소값 clamp
            const beforeValY = Math.max(52, baseY - beforeH - 14);
            const afterValY = Math.max(52, baseY - afterH - 14);
            // 증가율 뱃지: after 막대 값 텍스트보다 더 위
            const ratioY = Math.max(24, baseY - afterH - 58);

            return (
              <g key={i}>
                {/* before 막대 */}
                <rect
                  x={beforeX}
                  y={baseY - beforeH}
                  width={barWidth}
                  height={beforeH}
                  rx={12}
                  fill={beforeColor}
                />
                <text
                  x={beforeX + barWidth / 2}
                  y={beforeValY}
                  fill="#b0b6c0"
                  fontSize={isVertical ? 36 : 32}
                  fontWeight="bold"
                  fontFamily="SCDream"
                  textAnchor="middle"
                  opacity={valOpacity}
                >
                  {fmt(item.before)}{unit}
                </text>

                {/* after 막대 */}
                <rect
                  x={afterX}
                  y={baseY - afterH}
                  width={barWidth}
                  height={afterH}
                  rx={12}
                  fill={accent}
                  style={{ filter: `drop-shadow(0 0 14px ${accent}55)` }}
                />
                <text
                  x={afterX + barWidth / 2}
                  y={afterValY}
                  fill={accent}
                  fontSize={isVertical ? 40 : 36}
                  fontWeight="bold"
                  fontFamily="SCDream"
                  textAnchor="middle"
                  opacity={valOpacity}
                >
                  {fmt(item.after)}{unit}
                </text>

                {/* 증가 배수 뱃지 — after 막대 위 */}
                <text
                  x={afterX + barWidth / 2}
                  y={ratioY}
                  fill="#55efc4"
                  fontSize={isVertical ? 40 : 34}
                  fontWeight="bold"
                  fontFamily="SCDream"
                  textAnchor="middle"
                  opacity={ratioOpacity}
                >
                  ▲{ratioText}
                </text>

                {/* 항목 라벨 */}
                <text
                  x={groupX + groupWidth / 2}
                  y={baseY + 44}
                  fill="#dddddd"
                  fontSize={isVertical ? 42 : 36}
                  fontWeight="600"
                  fontFamily="SCDream"
                  textAnchor="middle"
                  opacity={valOpacity}
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

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 26, height: 26, borderRadius: 7, backgroundColor: color }} />
    <span style={{ fontSize: 34, fontWeight: 500, color: "#e0e0e0", fontFamily: "SCDream" }}>
      {label}
    </span>
  </div>
);
