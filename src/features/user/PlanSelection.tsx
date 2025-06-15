import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { RootState } from '../../app/store';
import type { PlansType } from '../plan/planSlice';
import { PlanList } from '../plan/PlanList';
import { useDispatch } from 'react-redux';
import { requestStartTrialPending } from './userSlice';

export const PlanSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pending, userId, isSubscribed, error } = useSelector(({ user }: RootState) => user);

  const [selectedPlan, setSelectedPlan] = useState<keyof PlansType | null>(null);

  useEffect(() => {
    if (isSubscribed) navigate('/congrats');
  }, [isSubscribed, navigate]);

  const handlePlanSelect = (plan: keyof PlansType) => {
    setSelectedPlan(plan);
  };

  const handleStartTrialOnClick = () => {
    if (!userId) return;
    dispatch(requestStartTrialPending({ user_id: userId }));
  }

  return (
    <div className='card'>
      <div className="step">
        <h2>Choose Your Plan</h2>
        <PlanList onClickPlan={handlePlanSelect}/>
        <button onClick={handleStartTrialOnClick} disabled={!selectedPlan || pending}>
          Start my free trial!
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
