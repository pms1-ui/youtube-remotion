import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import segments from "./data/audio-segments.json";

const FPS = 30;
const GAP_FRAMES = 15; // 조각 사이 0.5초 간격

type Seg = {
  index: number;
  file: string;
  start: number;
  end: number;
  dur: number;
};

const SEGS = segments as Seg[];

export const AudioReview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 각 조각의 시작 프레임 계산 (조각 길이 + 간격)
  let cursor = 0;
  const timeline = SEGS.map((s) => {
    const durFrames = Math.ceil(s.dur * fps);
    const startFrame = cursor;
    cursor += durFrames + GAP_FRAMES;
    return { ...s, startFrame, durFrames };
  });

  // 현재 재생 중인 조각 찾기
  const active = timeline.find(
    (t) => frame >= t.startFrame && frame < t.startFrame + t.durFrames
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0d0d", fontFamily: "SCDream" }}>
      {timeline.map((t) => (
        <Sequence
          key={t.index}
          name={`seg_${String(t.index).padStart(2, "0")} (${t.start}~${t.end}s)`}
          from={t.startFrame}
          durationInFrames={t.durFrames}
        >
          <Audio src={staticFile(t.file)} />
        </Sequence>
      ))}

      {/* 현재 재생 조각 표시 */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {active ? (
          <>
            <div style={{ fontSize: 40, color: "#888", fontWeight: 500 }}>
              지금 재생 중
            </div>
            <div style={{ fontSize: 220, color: "#ffd93d", fontWeight: 900 }}>
              {String(active.index).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 60, color: "#fff", fontWeight: 700 }}>
              원본 {active.start}초 ~ {active.end}초
            </div>
            <div style={{ fontSize: 44, color: "#00b894", fontWeight: 500 }}>
              조각 길이 {active.dur}초
            </div>
          </>
        ) : (
          <div style={{ fontSize: 60, color: "#555", fontWeight: 700 }}>
            (조각 사이 간격)
          </div>
        )}
      </AbsoluteFill>

      {/* 하단 전체 진행 안내 */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 60,
        }}
      >
        <div style={{ fontSize: 34, color: "#666", fontWeight: 500 }}>
          총 {SEGS.length}개 조각 · 각 조각을 들으며 NG 구간(중복 발화) 번호를 찾으세요
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AUDIO_REVIEW_TOTAL_FRAMES = SEGS.reduce(
  (acc, s) => acc + Math.ceil(s.dur * FPS) + GAP_FRAMES,
  0
);
