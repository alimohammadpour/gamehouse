import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useNavigate } from 'react-router';
import { verifyCodePending } from './userSlice';

export const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending, email, userId, error } = useSelector(({ user }: RootState) => user);

  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    if (userId) {
      navigate('/plans');
    }
  }, [userId]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(verifyCodePending({ email, code: verificationCode }));
  };

  const handleVerificationCodeChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(value)

  return (
    <div className="step step2">
      <h1>Get Verified</h1>
      <h2>Enter the one-time code we sent to:</h2>
      <p>{ email }</p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
        />
        <button type="submit" disabled={pending || verificationCode.length !== 6}>
          Verify
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

