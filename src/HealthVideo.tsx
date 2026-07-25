import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Scene } from "./data/script";
import { TextScene } from "./scenes/TextScene";
import { BarChartScene } from "./scenes/BarChartScene";
import { DonutChartScene } from "./scenes/DonutChartScene";
import { LineGraphScene } from "./scenes/LineGraphScene";
import { HighlightScene } from "./scenes/HighlightScene";
import { CompareScene } from "./scenes/CompareScene";
import { TimelineScene } from "./scenes/TimelineScene";
import { IconListScene } from "./scenes/IconListScene";
import { SplitFactScene } from "./scenes/SplitFactScene";
import { TransitionOverlay } from "./components/TransitionOverlay";

export type HealthVideoProps = {
  scenes: Scene[];
};

export const HealthVideo: React.FC<HealthVideoProps> = ({ scenes }) => {
  const { fps } = useVideoConfig();

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {scenes.map((scene, index) => {
        const startFrame = currentFrame;
        const durationInFrames = Math.round(scene.durationInSeconds * fps);
        currentFrame += durationInFrames;

        return (
          <Sequence
            key={index}
            name={`Scene ${index + 1} - ${scene.type}`}
            from={startFrame}
            durationInFrames={durationInFrames}
          >
            <TransitionOverlay durationInFrames={durationInFrames} />

            {scene.type === "text" && <TextScene scene={scene} />}
            {scene.type === "barChart" && <BarChartScene scene={scene} />}
            {scene.type === "donutChart" && <DonutChartScene scene={scene} />}
            {scene.type === "lineGraph" && <LineGraphScene scene={scene} />}
            {scene.type === "highlight" && <HighlightScene scene={scene} />}
            {scene.type === "compare" && <CompareScene scene={scene} />}
            {scene.type === "timeline" && <TimelineScene scene={scene} />}
            {scene.type === "iconList" && <IconListScene scene={scene} />}
            {scene.type === "splitFact" && <SplitFactScene scene={scene} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
