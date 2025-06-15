import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useNavigate } from 'react-router';
import { requestCodePending, verifyCodePending } from './userSlice';
import { FeaturesBanner } from '../../components/FeaturesBanner';

export const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending, email, userId, error } = useSelector(({ user }: RootState) => user);


  const [codeArray, setCodeArray] = useState(Array(6).fill('')); 
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (userId) {
      navigate('/plans');
    }
  }, [userId, navigate]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(verifyCodePending({ email, code: codeArray.join('') }));
  };

  const handleCodeInputChange = (index: number, value: string) => {
    const updated = [...codeArray];
    updated[index] = value;
    setCodeArray(updated);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleCodeInputKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !codeArray[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResendVerificationCode = () => {
    dispatch(requestCodePending(email));
    setTimer(30);
  }
  
  return (
    <div className='card'>
      <FeaturesBanner />
      <div className="step">
        <h2>Get Verified!</h2>
        <h3>Enter the one-time code we sent to:</h3>
        <p className='code-email'>{ email }</p>
        <form onSubmit={handleFormSubmit} className='form'>
          <div className="verification-code-inputs">
            {codeArray.map((digit, index) => (
              <input
                key={index}
                className='verification-code-input'
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputsRef.current[index] = el
                }}
                onChange={(e) => handleCodeInputChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeInputKeyDown(e, index)}
              />
            ))}
          </div>
          <span>
              Didn't get an email? 
              <button 
                className="resend-code-button" 
                type="button" 
                onClick={handleResendVerificationCode} 
                disabled={timer > 0}
              >
                { timer || 'Resend Code'}
              </button>
          </span>
          <button type="submit" disabled={pending || codeArray.some((c) => !c)}>
            Verify
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

