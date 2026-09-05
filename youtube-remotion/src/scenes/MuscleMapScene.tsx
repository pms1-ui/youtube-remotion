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

/**
 * MuscleMapScene — 근육 부위별 활성도를 원형 노드 맵으로 시각화
 * 각 근육 그룹이 크기와 색상 강도로 활성도를 표현
 */
export const MuscleMapScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#00b894";
  const muscleData = scene.muscleData || [];
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1.05, 1.0], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const maxActivation = Math.max(...muscleData.map((m) => m.activation));

  // 노드 배치 — 중앙 기준 방사형 배치
  const getNodePosition = (index: number, total: number) => {
    // 3행 레이아웃 (상/중/하)
    if (total <= 4) {
      const cols = total;
      const col = index % cols;
      return {
        x: 150 + col * 200,
        y: 180,
      };
    }
    // 상단 행, 하단 행으로 분배
    const topCount = Math.ceil(total / 2);
    const bottomCount = total - topCount;
    if (index < topCount) {
      const spacing = 680 / (topCount + 1);
      return { x: spacing * (index + 1), y: 130 };
    } else {
      const bIndex = index - topCount;
      const spacing = 680 / (bottomCount + 1);
      return { x: spacing * (bIndex + 1), y: 310 };
    }
  };

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
            textAlign: "center",
            marginBottom: 20,
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

        {/* 근육 맵 — 원형 노드 기반 */}
        <svg width={750} height={440} style={{ overflow: "visible" }}>
          {muscleData.map((muscle, i) => {
            const pos = getNodePosition(i, muscleData.length);
            const delay = 25 + i * 10;
            const nodeScale = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 12, stiffness: 80 },
            });
            const nodeOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
              extrapolateRight: "clamp",
            });

            // 활성도에 비례한 크기
            const baseRadius = 35;
            const radius = baseRadius + (muscle.activation / maxActivation) * 35;

            // 펄스 효과
            const pulseRadius = radius + 15;
            const pulseOpacity = interpolate(
              (frame + i * 10) % 50,
              [0, 25, 50],
              [0, 0.4, 0],
            );

            // 수치 카운트업
            const countUp = interpolate(
              frame,
              [delay + 10, delay + 35],
              [0, muscle.activation],
              { extrapolateRight: "clamp" }
            );

            // 연결선 (중앙에서 방사)
            const centerX = 375;
            const centerY = 220;
            const lineProgress = interpolate(
              frame,
              [delay - 5, delay + 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <g key={i} opacity={nodeOpacity}>
                {/* 연결선 */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + (pos.x - centerX) * lineProgress}
                  y2={centerY + (pos.y - centerY) * lineProgress}
                  stroke={muscle.color}
                  strokeWidth={2}
                  opacity={0.3}
                  strokeDasharray="6 4"
                />

                {/* 펄스 링 */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pulseRadius * nodeScale}
                  fill="none"
                  stroke={muscle.color}
                  strokeWidth={2}
                  opacity={pulseOpacity}
                />

                {/* 메인 노드 */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={radius * nodeScale}
                  fill={`${muscle.color}30`}
                  stroke={muscle.color}
                  strokeWidth={3}
                  style={{ filter: `drop-shadow(0 0 10px ${muscle.color}50)` }}
                />

                {/* 활성도 수치 */}
                <text
                  x={pos.x}
                  y={pos.y + 2}
                  fill="#ffffff"
                  fontSize={28}
                  fontWeight={700}
                  fontFamily="SCDream"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {Math.round(countUp)}%
                </text>

                {/* 근육명 */}
                <text
                  x={pos.x}
                  y={pos.y + radius * nodeScale + 30}
                  fill="#e0e0e0"
                  fontSize={26}
                  fontWeight={600}
                  fontFamily="SCDream"
                  textAnchor="middle"
                >
                  {muscle.name}
                </text>
              </g>
            );
          })}

          {/* 중앙 코어 노드 */}
          <circle
            cx={375}
            cy={220}
            r={interpolate(frame, [10, 30], [0, 20], { extrapolateRight: "clamp" })}
            fill={accent}
            opacity={0.6}
            style={{ filter: `drop-shadow(0 0 15px ${accent}80)` }}
          />
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
