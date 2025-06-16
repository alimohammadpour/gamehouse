import { expect, describe, it } from 'vitest';
import planReducer, { initialState, requestGetPlansFailure, requestGetPlansPending, requestGetPlansSuccess, type PlanDetailType, type PlansType } from './planSlice';

describe('planReducer', () => {
    it('should be defined', () => expect(planReducer).toBeDefined());
  
    it("should return the initial state", () => {
        expect(planReducer(undefined, { type: ''})).toEqual(initialState);
    });

    it('request get plans pending', () => {
        const planState = planReducer(initialState, requestGetPlansPending());
        expect(planState).toEqual({ ...initialState, pending: true });
    });

    it('request get plans success', () => {
        const planDetail: PlanDetailType = {
            price: '',
            currency: '',
            trial_days: 0
        };
        
        const plansSuccessPayload: PlansType = { monthly: planDetail, year: planDetail }
        
        const planState = planReducer(initialState, requestGetPlansSuccess(plansSuccessPayload));
        expect(planState).toEqual({ ...initialState, pending: false, plans: plansSuccessPayload });
    });

    it('request get plans failure', () => {
        const planState = planReducer(initialState, requestGetPlansFailure(''));
        expect(planState).toEqual({ ...initialState, pending: false, error: '' });
    });
  });