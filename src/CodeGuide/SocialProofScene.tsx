import React from 'react';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { COLORS, SPRING_CONFIG, FONTS } from './constants';

interface PartnerLogoProps {
  name: string;
  delay: number;
  multiplier: string;
  benefit: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({
  name,
  delay,
  multiplier,
  benefit,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        background: COLORS.background,
        borderRadius: 16,
        padding: '24px 32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: `1px solid ${COLORS.lightBlue}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        minWidth: 200,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.heading,
          fontSize: 28,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.accentBlue})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {multiplier}
      </span>
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: 14,
          color: COLORS.textGray,
        }}
      >
        {benefit}
      </span>
      <span
        style={{
          fontFamily: FONTS.heading,
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.textBlack,
        }}
      >
        {name}
      </span>
    </div>
  );
};

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated counter for developers
  const counterProgress = spring({
    frame: frame - 20,
    fps,
    config: { ...SPRING_CONFIG, damping: 50 },
  });

  const developerCount = Math.floor(
    interpolate(counterProgress, [0, 1], [0, 41450])
  );

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  const partners = [
    { name: 'Lovable', multiplier: '3x', benefit: 'Consistent Output' },
    { name: 'Claude Code', multiplier: '5x', benefit: 'Better Planning' },
    { name: 'Replit', multiplier: '5x', benefit: 'Better Results' },
    { name: 'Cursor', multiplier: '4x', benefit: 'Faster Coding' },
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
      {/* Trust Badge */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: 'center',
          marginBottom: 60,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 64,
            fontWeight: 700,
            margin: 0,
            marginBottom: 8,
          }}
        >
          <span style={{ color: COLORS.textBlack }}>Trusted By </span>
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.accentBlue})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {developerCount.toLocaleString()}+
          </span>
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 32,
            color: COLORS.textGray,
            margin: 0,
          }}
        >
          Developers
        </p>
      </div>

      {/* Partner Logos */}
      <div
        style={{
          display: 'flex',
          gap: 30,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {partners.map((partner, index) => (
          <PartnerLogo key={index} {...partner} delay={50 + index * 12} />
        ))}
      </div>

      {/* Additional trust indicators */}
      <div
        style={{
          marginTop: 60,
          display: 'flex',
          gap: 40,
          opacity: interpolate(
            spring({ frame: frame - 100, fps, config: SPRING_CONFIG }),
            [0, 1],
            [0, 1]
          ),
        }}
      >
        {['200+ AI Models', 'Chrome Extension', 'Open Source Boilerplates'].map(
          (item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={COLORS.primaryBlue}
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  color: COLORS.textGray,
                }}
              >
                {item}
              </span>
            </div>
          )
        )}
      </div>
    </AbsoluteFill>
  );
};
