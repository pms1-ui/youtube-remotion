import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Scene } from "../data/script";

// 원형 프로그레스
const CircleProgress: React.FC<{
  progress: number;
  color: string;
  label: string;
  size: number;
}> = ({ progress, color, label, size }) => {
  const radius = size / 2 - 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#ffffff0a"
            strokeWidth={12}
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ filter: `drop-shadow(0 0 10px ${color}80)` }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 38,
            fontWeight: 900,
            color,
            fontFamily: "sans-serif",
          }}
        >
          {Math.round(progress * 100)}%
        </div>
      </div>
      <span
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: "#e0e0e0",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const HighlightScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = scene.accent || "#ffd93d";
  const bullets = scene.bullets || [];

  const textOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(frame % 90, [0, 45, 90], [0.3, 0.7, 0.3]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 700,
          borderRadius: 350,
          opacity: pulse,
          background: `radial-gradient(ellipse, ${accent}08 0%, transparent 60%)`,
        }}
      />

      {/* 메인 텍스트 */}
      <div
        style={{
          opacity: textOpacity,
          fontSize: 62,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "sans-serif",
          textAlign: "center",
          lineHeight: 1.6,
          whiteSpace: "pre-line",
          maxWidth: 1400,
          marginBottom: 70,
        }}
      >
        {scene.text}
      </div>

      {/* 원형 프로그레스 지표들 */}
      {bullets.length > 0 && (
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
            const progress = interpolate(
              frame,
              [delay, delay + 35],
              [0, 0.55 + i * 0.12],
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
                <CircleProgress
                  progress={progress}
                  color={accent}
                  label={bullet}
                  size={180}
                />
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
