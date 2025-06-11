import React, { useState, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { requestCodePending } from './userSlice';

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
    <div className="step step1">
      <h1>Connect Your Account</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
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
  );
};

