import { Composition } from "remotion";
import { HealthVideo } from "./HealthVideo";
import { SCENES } from "./data/script";

const FPS = 30;
const totalDurationInFrames = SCENES.reduce(
  (acc, scene) => acc + scene.durationInSeconds * FPS,
  0
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HealthVideo"
        component={HealthVideo}
        durationInFrames={totalDurationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: SCENES,
        }}
      />
    </>
  );
};
