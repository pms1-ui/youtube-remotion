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

export const DonutChartScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = scene.accent || "#00e5ff";
  const donutData = scene.donutData || [];
  const hasChar = Boolean(scene.characterImage);

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });

  const donutSize = 300;
  const thickness = 32;
  const radius = (donutSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = donutSize / 2;
  const cy = donutSize / 2;

  const total = donutData.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercent = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
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
        {/* 타이틀 */}
        <div style={{ opacity: titleOpacity, fontSize: 58, fontWeight: 700, color: "#ffffff", fontFamily: "SCDream", marginBottom: 40, textAlign: "center", lineHeight: 1.4, wordBreak: "keep-all" as const }}>
          {scene.text}
        </div>

        {scene.description && (
          <div style={{ opacity: interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" }), fontSize: 32, color: "#999", fontFamily: "SCDream", textAlign: "center", marginBottom: 30, wordBreak: "keep-all" as const }}>
            {scene.description}
          </div>
        )}

        {/* 도넛 + 범례 */}
        <div style={{ display: "flex", alignItems: "center", gap: 60, justifyContent: "center" }}>
          {/* SVG 도넛 */}
          <div style={{ position: "relative", width: donutSize, height: donutSize }}>
            <svg width={donutSize} height={donutSize} style={{ overflow: "visible" }}>
              <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#ffffff08" strokeWidth={thickness} />
              {donutData.map((item, i) => {
                const percent = item.value / total;
                const offset = cumulativePercent;
                cumulativePercent += percent;
                const delay = 30 + i * 12;
                const segmentProgress = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const dashLength = circumference * percent * segmentProgress;
                const gapLength = circumference - dashLength;
                const rotation = offset * 360 - 90;
                return (
                  <circle key={i} cx={cx} cy={cy} r={radius} fill="none" stroke={item.color} strokeWidth={thickness} strokeLinecap="round" strokeDasharray={`${dashLength} ${gapLength}`} transform={`rotate(${rotation} ${cx} ${cy})`} style={{ filter: `drop-shadow(0 0 8px ${item.color}60)` }} />
                );
              })}
            </svg>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 58, fontWeight: 700, color: "#ffffff", fontFamily: "SCDream" }}>{donutData[0]?.value}%</div>
            </div>
          </div>

          {/* 범례 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {donutData.map((item, i) => {
              const delay = 40 + i * 10;
              const legendOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
              const countUp = interpolate(frame, [delay + 5, delay + 30], [0, item.value], { extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: legendOpacity, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 36, fontWeight: 500, color: "#e0e0e0", fontFamily: "SCDream", wordBreak: "keep-all" as const }}>{item.label}</span>
                  <span style={{ fontSize: 38, fontWeight: 700, color: item.color, fontFamily: "SCDream" }}>{Math.round(countUp)}%</span>
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
