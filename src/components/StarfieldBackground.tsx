import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React, { useMemo } from "react";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export const StarfieldBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 3개 레이어: 먼 별(느림, 작음), 중간 별, 가까운 별(빠름, 큼)
  const layers = useMemo(() => {
    return [
      // 먼 별 — 많고 작고 느림
      {
        count: 250,
        sizeMin: 0.5,
        sizeMax: 1.2,
        speedMin: 0.08,
        speedMax: 0.2,
        opacityBase: 0.3,
        seedOffset: 0,
      },
      // 중간 별
      {
        count: 120,
        sizeMin: 1,
        sizeMax: 2,
        speedMin: 0.25,
        speedMax: 0.5,
        opacityBase: 0.5,
        seedOffset: 1000,
      },
      // 가까운 별 — 적고 크고 빠름
      {
        count: 30,
        sizeMin: 1.5,
        sizeMax: 3,
        speedMin: 0.5,
        speedMax: 1.0,
        opacityBase: 0.7,
        seedOffset: 2000,
      },
    ].map((layer) => ({
      ...layer,
      stars: Array.from({ length: layer.count }, (_, i) => {
        const seed = i + layer.seedOffset;
        return {
          x: seededRandom(seed * 3 + 1) * width,
          y: seededRandom(seed * 3 + 2) * height,
          size:
            layer.sizeMin +
            seededRandom(seed * 3 + 3) * (layer.sizeMax - layer.sizeMin),
          speed:
            layer.speedMin +
            seededRandom(seed * 7 + 5) * (layer.speedMax - layer.speedMin),
          twinkleOffset: seededRandom(seed * 11 + 7) * 200,
          driftX: (seededRandom(seed * 13 + 9) - 0.5) * 0.15, // 약간의 좌우 드리프트
        };
      }),
    }));
  }, [width, height]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 우주 분위기 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 20% 80%, #0d0630 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, #0a0320 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, #06061a 0%, #020208 100%)
          `,
        }}
      />

      {/* 별 레이어 */}
      {layers.map((layer, layerIdx) =>
        layer.stars.map((star, i) => {
          // 위로 + 약간 좌우로 이동
          const yOffset = (frame * star.speed) % height;
          const xOffset = Math.sin(frame * star.driftX * 0.05) * 20;
          const currentY = (star.y - yOffset + height) % height;
          const currentX = star.x + xOffset;

          // 반짝임
          const twinkle = interpolate(
            (frame + star.twinkleOffset) % 90,
            [0, 45, 90],
            [layer.opacityBase * 0.4, layer.opacityBase, layer.opacityBase * 0.4]
          );

          return (
            <div
              key={`${layerIdx}-${i}`}
              style={{
                position: "absolute",
                left: currentX,
                top: currentY,
                width: star.size,
                height: star.size,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                opacity: twinkle,
                boxShadow:
                  star.size > 2
                    ? `0 0 ${star.size * 2}px rgba(255,255,255,0.3)`
                    : undefined,
              }}
            />
          );
        })
      )}
    </div>
  );
};
