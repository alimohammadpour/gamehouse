import React, { useEffect, type JSX } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { requestGetPlansPending, type PlansType } from './planSlice';

type Props = {
  onClickPlan: (plan: keyof PlansType) => void;
};

export const PlanList = ({ onClickPlan }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { plans, error } = useSelector(({ plan }: RootState) => plan);

  useEffect(() => {
    dispatch(requestGetPlansPending());
  }, []);

  const getPlanName = (plan: keyof PlansType): string => plan === 'monthly' ? 'Monthly' : 'Annual';

  return (
    <div className="plans">
      {plans && Object.entries(plans).map(([key, plan]: any) => (
        <div
          key={key}
          onClick={() => onClickPlan(key)}
        >
          <h3>{getPlanName(key)}</h3>
          <p>{plan.currency}{plan.price}</p>
          <p>{plan.trial_days} days</p>
        </div>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
