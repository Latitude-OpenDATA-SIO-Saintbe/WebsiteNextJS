// components/Banner.tsx

import React from 'react';

interface BannerProps {
  text: string;
  backgroundColor?: string; // Couleur de fond facultative
}

const Banner: React.FC<BannerProps> = ({ text, backgroundColor = '#FFD700' }) => {
  const bannerStyle = {
    backgroundColor,
    color: '#000',
    padding: '10px 20px',
    textAlign: 'center' as const,
    fontWeight: 'bold' as const,
    fontSize: '1.2rem',
    borderRadius: '5px',
  };

  return (
    <div style={bannerStyle}>
      {text}
    </div>
  );
};

export default Banner;
