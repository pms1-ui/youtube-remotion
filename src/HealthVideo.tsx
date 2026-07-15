import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Scene } from "./data/script";
import { IntroScene } from "./scenes/IntroScene";
import { TextScene } from "./scenes/TextScene";
import { BarChartScene } from "./scenes/BarChartScene";
import { DonutChartScene } from "./scenes/DonutChartScene";
import { LineGraphScene } from "./scenes/LineGraphScene";
import { HighlightScene } from "./scenes/HighlightScene";
import { TransitionOverlay } from "./components/TransitionOverlay";

export type HealthVideoProps = {
  scenes: Scene[];
};

export const HealthVideo: React.FC<HealthVideoProps> = ({ scenes }) => {
  const { fps } = useVideoConfig();

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {scenes.map((scene, index) => {
        const startFrame = currentFrame;
        const durationInFrames = Math.round(scene.durationInSeconds * fps);
        currentFrame += durationInFrames;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <TransitionOverlay durationInFrames={durationInFrames} />

            {scene.type === "intro" && <IntroScene scene={scene} />}
            {scene.type === "text" && <TextScene scene={scene} />}
            {scene.type === "barChart" && <BarChartScene scene={scene} />}
            {scene.type === "donutChart" && <DonutChartScene scene={scene} />}
            {scene.type === "lineGraph" && <LineGraphScene scene={scene} />}
            {scene.type === "highlight" && <HighlightScene scene={scene} />}
            {scene.type === "outro" && <IntroScene scene={scene} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
