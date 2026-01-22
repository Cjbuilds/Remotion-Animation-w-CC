import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING_CONFIG, FONTS } from './constants';

interface CodeGuideLogoProps {
  scale?: number;
  showText?: boolean;
}

export const CodeGuideLogo: React.FC<CodeGuideLogoProps> = ({
  scale = 1,
  showText = true
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon animation
  const iconProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const iconScale = interpolate(iconProgress, [0, 1], [0, 1]);
  const iconRotation = interpolate(iconProgress, [0, 1], [-180, 0]);

  // Text animation (staggered)
  const textProgress = spring({
    frame: frame - 10,
    fps,
    config: SPRING_CONFIG,
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textX = interpolate(textProgress, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16 * scale,
        transform: `scale(${scale})`,
      }}
    >
      {/* Logo Icon - Diamond/Chevron */}
      <div
        style={{
          transform: `scale(${iconScale}) rotate(${iconRotation}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4L4 24L24 44L44 24L24 4Z"
            fill={COLORS.primaryBlue}
          />
          <path
            d="M24 12L12 24L24 36"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M24 12L36 24L24 36"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
            fontFamily: FONTS.heading,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: COLORS.textBlack }}>Code</span>
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.darkBlue})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Guide
          </span>
        </div>
      )}
    </div>
  );
};
