import { Composition, staticFile } from "remotion";
import { HealthVideo } from "./HealthVideo";
import { SCENES } from "./data/script";
import { SHORTS_SCENES } from "./data/shorts-script";

const FPS = 30;
const totalDurationInFrames = SCENES.reduce(
  (acc, scene) => acc + scene.durationInSeconds * FPS,
  0
);
const shortsDurationInFrames = SHORTS_SCENES.reduce(
  (acc, scene) => acc + scene.durationInSeconds * FPS,
  0
);

const fontFaces = `
@font-face {
  font-family: "SCDream";
  src: url("${staticFile("fonts/SCDream5.otf")}") format("opentype");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "SCDream";
  src: url("${staticFile("fonts/SCDream7.otf")}") format("opentype");
  font-weight: 700;
  font-style: normal;
}
`;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
      {/* 롱폼 (16:9) */}
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
      {/* 숏폼 (9:16) */}
      <Composition
        id="ShortVideo"
        component={HealthVideo}
        durationInFrames={shortsDurationInFrames}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: SHORTS_SCENES,
        }}
      />
    </>
  );
};
