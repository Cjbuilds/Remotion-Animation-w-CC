import React from 'react';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { COLORS, SPRING_CONFIG, FONTS } from './constants';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [60, 0]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        background: COLORS.background,
        borderRadius: 24,
        padding: 40,
        boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
        border: `1px solid ${COLORS.lightBlue}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: 350,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${COLORS.lightBlue}, ${COLORS.background})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.primaryBlue,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: FONTS.heading,
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.textBlack,
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 16,
          color: COLORS.textGray,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
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

  const features = [
    {
      title: 'Software v2 Agent',
      description: 'Autonomous coding with 200+ AI models working in sync.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    },
    {
      title: 'AI Documentation',
      description: 'Generate PRDs, tech specs, wireframes automatically.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
    },
    {
      title: 'GitHub Integration',
      description: 'Analyze existing codebases and generate docs instantly.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundLight,
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
          marginBottom: 60,
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
          Everything You Need To{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.accentBlue})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Code
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
          Production-Ready Software With AI
        </p>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            delay={20 + index * 15}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
