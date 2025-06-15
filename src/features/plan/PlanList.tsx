import React, { useEffect, type JSX } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { requestGetPlansPending, type PlanDetailType, type PlansType } from './planSlice';

type Props = {
  onClickPlan: (plan: keyof PlansType) => void;
};

type PlansMapperValueType = {
  name: string;
  priceFormat: string;
  billFormat: string;
}

export const PlanList = ({ onClickPlan }: Props): JSX.Element => {
  const plansMapper: Record<keyof PlansType, PlansMapperValueType> = {
    monthly: { name: 'Monthly', priceFormat: 'Month', billFormat: 'Monthly' },
    year: { name: 'Annual', priceFormat: 'Year', billFormat: 'Annually' }
  }
  
  const dispatch = useDispatch();
  const { plans, error } = useSelector(({ plan }: RootState) => plan);

  useEffect(() => {
    dispatch(requestGetPlansPending());
  }, []);

  const getPlanName = (key: keyof PlansType): string => plansMapper[key].name;

  const getPlanPrice = ({ price }: PlanDetailType, key: keyof PlansType): string => `$${price} /${plansMapper[key].priceFormat}`;

  const getBillFormat = (key: keyof PlansType): string => `Billed ${plansMapper[key].billFormat}`;

  return (
    <div className="plans">
      {plans && Object.entries(plans).map(([key, plan]: any) => (
        <div
          className='plan-item'
          tabIndex={0}
          key={key}
          onClick={() => onClickPlan(key)}
        >
          <h3>{getPlanName(key)}</h3>
          <h3>{getPlanPrice(plan, key)}</h3>
          <p style={{ margin: 0 }}>{getBillFormat(key)}</p>
          <p style={{ color: '#f7af07' }}>{plan.trial_days}-day free trial</p>
        </div>
      ))}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
