import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useVideoConfig } from "remotion";
import { MIX_DATA, MixScene, shuffleScenes } from "./data/mix-scenes";

export type MixVideoProps = {
  seed: number;
};

export const MixVideo: React.FC<MixVideoProps> = ({ seed }) => {
  const { fps } = useVideoConfig();

  // Shuffle scenes with the given seed
  const shuffledScenes: MixScene[] = shuffleScenes(MIX_DATA.scenes, seed);

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {shuffledScenes.map((scene, index) => {
        const startFrame = currentFrame;
        const durationInFrames = Math.round(scene.duration * fps);
        currentFrame += durationInFrames;

        return (
          <Sequence
            key={index}
            name={`Cut ${index + 1} (orig #${scene.id})`}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <AbsoluteFill>
              <OffthreadVideo
                src={staticFile(`mix/${MIX_DATA.source}`)}
                startFrom={Math.round(scene.start * fps)}
                style={{ width: "100%", height: "100%" }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
