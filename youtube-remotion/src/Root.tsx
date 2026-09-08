import { Composition, staticFile } from "remotion";
import { HealthVideo } from "./HealthVideo";
import { MixVideo } from "./MixVideo";
import { AudioReview, AUDIO_REVIEW_TOTAL_FRAMES } from "./AudioReview";
import { SCENES, Scene } from "./data/script";
import { SHORTS_SCENES } from "./data/shorts-script";
import { MIX_DATA } from "./data/mix-scenes";

const FPS = 30;

// 근지구력 전후 비교 씬 단독 확인/렌더용 (전체 재렌더 없이 이 씬만)
const BEFORE_AFTER_SCENE: Scene[] = SCENES.filter(
  (s) => s.type === "beforeAfterChart"
);
const beforeAfterFrames = Math.max(
  1,
  BEFORE_AFTER_SCENE.reduce(
    (acc, s) => acc + Math.round(s.durationInSeconds * FPS),
    0
  )
);
const MIX_FPS = 24;
const mixDurationInFrames = Math.round(MIX_DATA.totalDuration * MIX_FPS);
const totalDurationInFrames = SCENES.reduce(
  (acc, scene) => acc + Math.round(scene.durationInSeconds * FPS),
  0
);
const shortsDurationInFrames = SHORTS_SCENES.reduce(
  (acc, scene) => acc + Math.round(scene.durationInSeconds * FPS),
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
@font-face {
  font-family: "SCDream";
  src: url("${staticFile("fonts/SCDream9.otf")}") format("opentype");
  font-weight: 900;
  font-style: normal;
}}
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
      {/* 근지구력 전후 비교 씬 단독 (따로 보기/렌더용) */}
      <Composition
        id="BeforeAfterChart"
        component={HealthVideo}
        durationInFrames={beforeAfterFrames}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: BEFORE_AFTER_SCENE,
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
      {/* 영상 믹스 (장면 무작위 섞기) */}
      <Composition
        id="MixVideo"
        component={MixVideo}
        durationInFrames={mixDurationInFrames}
        fps={MIX_FPS}
        width={1920}
        height={1080}
        defaultProps={{
          seed: 42,
        }}
      />
      {/* 오디오 조각 검수용 (NG 구간 찾기) */}
      <Composition
        id="AudioReview"
        component={AudioReview}
        durationInFrames={AUDIO_REVIEW_TOTAL_FRAMES}
        fps={FPS}
        width={1280}
        height={720}
      />
    </>
  );
};
