import { expect, describe, it } from 'vitest';
import { call, put, takeLatest, type Effect } from 'redux-saga/effects';
import { api } from '../../api';
import planSaga, { handleRequestGetPlansPending } from './planSaga';
import { 
    requestGetPlansFailure, 
    requestGetPlansPending, 
    requestGetPlansSuccess, 
    type PlanDetailType, 
    type PlansType 
} from './planSlice';

describe('planSaga', () => {  
  it('should be defined', () => expect(planSaga).toBeDefined());

  it('should take latest', () => {
    const generator: Generator = planSaga();
    const requestGetPlansEffect: Effect = takeLatest(requestGetPlansPending.type, handleRequestGetPlansPending);

    expect(generator.next().value).toEqual(requestGetPlansEffect);
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  describe('handle request get plans pending', () => {
    it('try', () => {
      const generator: Generator = handleRequestGetPlansPending();
      const requestGetPlansCallEffect: Effect = call(api.get, 'products');

      const planDetail: PlanDetailType = {
        price: '',
        currency: '',
        trial_days: 0
      };
    
      const data: PlansType = { monthly: planDetail, year: planDetail }
      const requestGetPlansSuccessPutEffect: Effect = put(requestGetPlansSuccess(data));

      expect(generator.next().value).toEqual(requestGetPlansCallEffect);
      expect(generator.next({ data }).value).toEqual(requestGetPlansSuccessPutEffect);
      expect(generator.next().done).toBeTruthy();
    });

    it('catch', () => {
      const generator: Generator = handleRequestGetPlansPending();
      const requestGetPlansFailurePutEffect: Effect = put(requestGetPlansFailure('Failed to get plans'));
      
      generator.next();

      expect(generator.throw({ response: { data: { error: '' } } }).value).toEqual(requestGetPlansFailurePutEffect);
      expect(generator.next().done).toBeTruthy();
    });
  });
});