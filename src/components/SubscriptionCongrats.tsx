import React, { type JSX } from 'react';
import confettiSVG from '../assets/confetti.svg';

export const SubscriptionCongrats = (): JSX.Element => {
  return (
    <div className='card'>
      <div className='step'>
        <h2>Congracts! You're now a <span style={{ color: '#f7af07' }}>subscriber</span>!</h2>
        <p>Explore your membership now.</p>
        <img src={confettiSVG} alt="confetti" className="confetti-svg"/>
      </div>
    </div>
  );
};
