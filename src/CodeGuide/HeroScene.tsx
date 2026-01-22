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

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const logoY = interpolate(logoProgress, [0, 1], [-100, 0]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Tagline animation (staggered words)
  const taglineWords = [
    'Turn',
    'Ideas',
    'Into',
    'Spec-Driven',
    'Context',
    'For',
    'Your',
    'AI',
    'Coding',
    'Tools',
  ];

  // Subtitle animation
  const subtitleProgress = spring({
    frame: frame - 60,
    fps,
    config: SPRING_CONFIG,
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);

  // CTA button animation
  const ctaProgress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

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
      {/* Logo */}
      <div
        style={{
          transform: `translateY(${logoY}px)`,
          opacity: logoOpacity,
          marginBottom: 60,
        }}
      >
        <CodeGuideLogo scale={1.5} />
      </div>

      {/* Tagline with gradient */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 16,
          maxWidth: 1200,
          marginBottom: 40,
        }}
      >
        {taglineWords.map((word, index) => {
          const wordProgress = spring({
            frame: frame - 20 - index * 3,
            fps,
            config: SPRING_CONFIG,
          });

          const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const wordY = interpolate(wordProgress, [0, 1], [40, 0]);

          const isHighlighted = ['Spec-Driven', 'Context', 'AI', 'Coding', 'Tools'].includes(word);

          return (
            <span
              key={index}
              style={{
                fontFamily: FONTS.heading,
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                color: isHighlighted ? 'transparent' : COLORS.textBlack,
                background: isHighlighted
                  ? `linear-gradient(135deg, ${COLORS.primaryBlue}, ${COLORS.accentBlue})`
                  : 'none',
                WebkitBackgroundClip: isHighlighted ? 'text' : 'unset',
                backgroundClip: isHighlighted ? 'text' : 'unset',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontFamily: FONTS.body,
          fontSize: 28,
          color: COLORS.textGray,
          textAlign: 'center',
          maxWidth: 800,
          lineHeight: 1.5,
          marginBottom: 50,
        }}
      >
        No more AI Hallucinations. Turn your idea into a project knowledge base
        your AI models can reference.
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            background: COLORS.textBlack,
            color: COLORS.background,
            fontFamily: FONTS.body,
            fontSize: 20,
            fontWeight: 600,
            padding: '18px 40px',
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}
        >
          Get Started Today
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
