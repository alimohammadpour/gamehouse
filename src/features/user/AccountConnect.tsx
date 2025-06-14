import React, { useState, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { requestCodePending } from './userSlice';
import { FeaturesBanner } from '../../components/FeaturesBanner';

export const AccountConnect = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestCodePending(email));
    navigate('/verify');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  return (
    <div className='card'>
      <FeaturesBanner />
      <div className="step">
        <h2>Connect Your Account</h2>
        <p>...and unlock your benefits!</p>
        <form onSubmit={handleFormSubmit} className='form'>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"
            required
          />
          <label className="flex items-center">
              <input
              type="checkbox"
              defaultChecked
              />
              Send Me Offers, News, and Fun Stuff!
          </label>
          <button type="submit">Connect</button>
        </form>
      </div>
    </div>
  );
};

