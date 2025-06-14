import React, { type JSX } from 'react';

export const FeaturesBanner = (): JSX.Element => {
  const bannerItems: string[] = [
    'Access to 100+ GAMES for FREE thanks to ads',
    'Log In Across All Your Devices',
    'Skip the Line with Customer Support'
  ];

  const renderBannerItem = (key: number, text: string): JSX.Element => {
    return (
      <div key={key} className="feature-item">
        <div className="check-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p>{text}</p>
      </div>
    )
  }
  return (
    <div className='features-banner'>
      { bannerItems.map((item, index) => renderBannerItem(index, item)) }
    </div>
  );
};
