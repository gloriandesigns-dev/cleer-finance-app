import React from 'react';
import Svg, { Rect, Path, Circle, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface IllustrationProps {
  step: 0 | 1 | 2;
}

export const OnboardingIllustration: React.FC<IllustrationProps> = ({ step }) => {
  const width = 280;
  const height = 280;
  const strokeWidth = 2;

  // Common styles
  const black = Colors.primaryBlack;
  const lime = Colors.accentLime;
  const gray = Colors.divider;

  const renderStep0 = () => (
    <Svg width={width} height={height} viewBox="0 0 280 280" fill="none">
      {/* Background abstract shape */}
      <Circle cx="140" cy="140" r="100" fill="#E8E8E6" opacity="0.3" />
      
      {/* Back Card */}
      <Rect x="50" y="70" width="140" height="90" rx="12" fill={black} opacity="0.1" />
      
      {/* Middle Card */}
      <Rect x="70" y="95" width="140" height="90" rx="12" fill="white" stroke={black} strokeWidth={strokeWidth} />
      <Line x1="90" y1="115" x2="130" y2="115" stroke={gray} strokeWidth="4" strokeLinecap="round" />
      <Line x1="90" y1="130" x2="170" y2="130" stroke={gray} strokeWidth="4" strokeLinecap="round" />
      
      {/* Front Card (Main) */}
      <Rect x="90" y="120" width="140" height="90" rx="12" fill={black} />
      
      {/* Neon Lime Accent on Front Card */}
      <Rect x="110" y="140" width="40" height="4" rx="2" fill={lime} />
      <Rect x="110" y="155" width="80" height="4" rx="2" fill={gray} opacity="0.3" />
      
      {/* Floating Elements */}
      <Circle cx="220" cy="80" r="6" fill={lime} />
      <Circle cx="60" cy="200" r="4" fill={black} opacity="0.2" />
    </Svg>
  );

  const renderStep1 = () => (
    <Svg width={width} height={height} viewBox="0 0 280 280" fill="none">
      {/* Background Circle */}
      <Circle cx="140" cy="140" r="100" fill="#E8E8E6" opacity="0.3" />

      {/* Receipt Shape */}
      <Path 
        d="M60 80 H140 V160 L130 155 L120 160 L110 155 L100 160 L90 155 L80 160 L70 155 L60 160 V80 Z" 
        fill="white" 
        stroke={black} 
        strokeWidth={strokeWidth} 
      />
      {/* Receipt Lines */}
      <Line x1="80" y1="100" x2="120" y2="100" stroke={gray} strokeWidth="3" />
      <Line x1="80" y1="115" x2="120" y2="115" stroke={gray} strokeWidth="3" />
      <Line x1="80" y1="130" x2="100" y2="130" stroke={gray} strokeWidth="3" />

      {/* Connection Line */}
      <Path d="M140 120 C 160 120, 160 120, 180 120" stroke={lime} strokeWidth="2" strokeDasharray="4 4" />

      {/* Transaction Card */}
      <Rect x="160" y="90" width="100" height="60" rx="8" fill={black} />
      <Circle cx="180" cy="120" r="12" fill={lime} />
      <Path d="M176 120 L179 123 L185 117" stroke={black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  const renderStep2 = () => (
    <Svg width={width} height={height} viewBox="0 0 280 280" fill="none">
       {/* Background Circle */}
       <Circle cx="140" cy="140" r="100" fill="#E8E8E6" opacity="0.3" />

       {/* Bottom Stack */}
       <Rect x="60" y="140" width="160" height="40" rx="8" fill={black} opacity="0.1" />
       
       {/* Middle Stack */}
       <Rect x="50" y="125" width="180" height="40" rx="8" fill={black} opacity="0.3" />

       {/* Top Card (Main) */}
       <Rect x="40" y="80" width="200" height="70" rx="12" fill={black} />
       
       {/* Content on Top Card */}
       <Circle cx="70" cy="115" r="16" fill={lime} />
       <Path d="M64 115 L68 119 L76 111" stroke={black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
       
       <Rect x="100" y="105" width="80" height="6" rx="3" fill="white" />
       <Rect x="100" y="120" width="50" height="6" rx="3" fill="white" opacity="0.5" />
    </Svg>
  );

  switch (step) {
    case 0: return renderStep0();
    case 1: return renderStep1();
    case 2: return renderStep2();
    default: return renderStep0();
  }
};
