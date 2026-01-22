import React from 'react';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { COLORS, SPRING_CONFIG, FONTS } from './constants';

interface WorkflowStepProps {
  number: number;
  title: string;
  delay: number;
  isActive: boolean;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  delay,
  isActive,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);

  // Pulse effect for active step
  const pulseProgress = spring({
    frame: frame - delay - 20,
    fps,
    config: { damping: 8, stiffness: 80 },
  });

  const glowOpacity = isActive ? interpolate(pulseProgress, [0, 1], [0, 0.3]) : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Step Circle */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: isActive
            ? `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.darkBlue})`
            : COLORS.background,
          border: isActive ? 'none' : `3px solid ${COLORS.primaryBlue}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isActive
            ? `0 0 40px rgba(59, 130, 246, ${glowOpacity})`
            : 'none',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 32,
            fontWeight: 700,
            color: isActive ? COLORS.background : COLORS.primaryBlue,
          }}
        >
          {number}
        </span>
      </div>

      {/* Step Title */}
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          fontWeight: 600,
          color: isActive ? COLORS.primaryBlue : COLORS.textGray,
          textAlign: 'center',
          maxWidth: 120,
        }}
      >
        {title}
      </span>
    </div>
  );
};

const ConnectorLine: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const width = interpolate(progress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        width: 100,
        height: 4,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 38,
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: '100%',
          backgroundColor: COLORS.primaryBlue,
          borderRadius: 2,
        }}
      />
    </div>
  );
};

export const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);

  const steps = [
    { number: 1, title: 'Project Brief' },
    { number: 2, title: 'AI Tools' },
    { number: 3, title: 'Answer Questions' },
    { number: 4, title: 'Project Plan' },
    { number: 5, title: 'Create Docs' },
  ];

  // Calculate which step should be active based on frame
  const activeStep = Math.min(5, Math.floor((frame - 60) / 25) + 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      {/* Section Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          marginBottom: 80,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.textBlack,
            margin: 0,
            marginBottom: 16,
          }}
        >
          From Idea to{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.accentBlue})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Production Plan
          </span>
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: COLORS.textGray,
            margin: 0,
          }}
        >
          5 simple steps to comprehensive documentation
        </p>
      </div>

      {/* Workflow Steps */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 0,
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <WorkflowStep
              {...step}
              delay={30 + index * 20}
              isActive={step.number <= activeStep}
            />
            {index < steps.length - 1 && (
              <ConnectorLine delay={40 + index * 20} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          marginTop: 80,
          opacity: interpolate(
            spring({ frame: frame - 140, fps, config: SPRING_CONFIG }),
            [0, 1],
            [0, 1]
          ),
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: COLORS.textLightGray,
            margin: 0,
          }}
        >
          One platform — One workflow
        </p>
      </div>
    </AbsoluteFill>
  );
};
