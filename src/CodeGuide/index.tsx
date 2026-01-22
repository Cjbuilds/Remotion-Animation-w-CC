import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { HeroScene } from './HeroScene';
import { FeaturesScene } from './FeaturesScene';
import { WorkflowScene } from './WorkflowScene';
import { SocialProofScene } from './SocialProofScene';
import { CTAScene } from './CTAScene';

// Schema for the composition props
export const codeGuideSchema = z.object({});

// Scene durations in frames (at 30fps)
const SCENE_DURATIONS = {
  hero: 150, // 5 seconds
  features: 150, // 5 seconds
  workflow: 180, // 6 seconds
  socialProof: 120, // 4 seconds
  cta: 150, // 5 seconds
};

// Calculate start frames for each scene
const SCENE_STARTS = {
  hero: 0,
  features: SCENE_DURATIONS.hero,
  workflow: SCENE_DURATIONS.hero + SCENE_DURATIONS.features,
  socialProof:
    SCENE_DURATIONS.hero + SCENE_DURATIONS.features + SCENE_DURATIONS.workflow,
  cta:
    SCENE_DURATIONS.hero +
    SCENE_DURATIONS.features +
    SCENE_DURATIONS.workflow +
    SCENE_DURATIONS.socialProof,
};

// Total duration
export const TOTAL_DURATION =
  SCENE_DURATIONS.hero +
  SCENE_DURATIONS.features +
  SCENE_DURATIONS.workflow +
  SCENE_DURATIONS.socialProof +
  SCENE_DURATIONS.cta;

export const CodeGuide: React.FC<z.infer<typeof codeGuideSchema>> = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
      {/* Hero Scene - Introduction with logo and tagline */}
      <Sequence from={SCENE_STARTS.hero} durationInFrames={SCENE_DURATIONS.hero}>
        <HeroScene />
      </Sequence>

      {/* Features Scene - Core features showcase */}
      <Sequence
        from={SCENE_STARTS.features}
        durationInFrames={SCENE_DURATIONS.features}
      >
        <FeaturesScene />
      </Sequence>

      {/* Workflow Scene - 5-step process */}
      <Sequence
        from={SCENE_STARTS.workflow}
        durationInFrames={SCENE_DURATIONS.workflow}
      >
        <WorkflowScene />
      </Sequence>

      {/* Social Proof Scene - Trust badges and stats */}
      <Sequence
        from={SCENE_STARTS.socialProof}
        durationInFrames={SCENE_DURATIONS.socialProof}
      >
        <SocialProofScene />
      </Sequence>

      {/* CTA Scene - Call to action */}
      <Sequence from={SCENE_STARTS.cta} durationInFrames={SCENE_DURATIONS.cta}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default CodeGuide;
