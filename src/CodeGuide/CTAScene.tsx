import React from 'react';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { CodeGuideLogo } from './CodeGuideLogo';
import { COLORS, SPRING_CONFIG, FONTS } from './constants';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const bgProgress = spring({
    frame,
    fps,
    config: { ...SPRING_CONFIG, damping: 100 },
  });

  // Logo animation
  const logoProgress = spring({
    frame: frame - 10,
    fps,
    config: SPRING_CONFIG,
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Text animation
  const textProgress = spring({
    frame: frame - 30,
    fps,
    config: SPRING_CONFIG,
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [40, 0]);

  // CTA button animation
  const ctaProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // URL animation
  const urlProgress = spring({
    frame: frame - 90,
    fps,
    config: SPRING_CONFIG,
  });

  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);
  const urlY = interpolate(urlProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.backgroundDark} 0%, #1E293B 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primaryBlue}20 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${interpolate(
            bgProgress,
            [0, 1],
            [0.5, 1.2]
          )})`,
          opacity: 0.5,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <svg
            width={72}
            height={72}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 4L4 24L24 44L44 24L24 4Z" fill={COLORS.primaryBlue} />
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
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            <span style={{ color: COLORS.background }}>Code</span>
            <span style={{ color: COLORS.primaryBlue }}>Guide</span>
          </span>
        </div>
      </div>

      {/* Main CTA Text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
          marginBottom: 50,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.background,
            margin: 0,
            marginBottom: 16,
          }}
        >
          Ready to Get Started?
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: COLORS.textLightGray,
            margin: 0,
          }}
        >
          Turn your ideas into production-ready specs today
        </p>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.accentBlue})`,
            color: COLORS.background,
            fontFamily: FONTS.body,
            fontSize: 22,
            fontWeight: 600,
            padding: '20px 50px',
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: `0 10px 40px ${COLORS.primaryBlue}50`,
          }}
        >
          Get Started Free
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </div>
      </div>

      {/* Website URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            color: COLORS.primaryBlue,
            background: `${COLORS.primaryBlue}15`,
            padding: '12px 24px',
            borderRadius: 8,
          }}
        >
          codeguide.dev
        </span>
      </div>
    </AbsoluteFill>
  );
};
