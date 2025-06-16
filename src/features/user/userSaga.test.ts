import { expect, describe, it } from 'vitest';
import { call, put, takeLatest, type Effect } from 'redux-saga/effects';
import userSaga, { 
    handleRequestCodePending, 
    handleRequestStartTrialPending, 
    handleVerifyCodePending 
} from './userSaga';
import { 
    requestCodeFailure, 
    requestCodePending, 
    requestCodeSuccess, 
    requestStartTrialFailure, 
    requestStartTrialPending, 
    requestStartTrialSuccess, 
    verifyCodeFailure, 
    verifyCodePending, 
    verifyCodeSuccess, 
    type RequestStartTrialPendingPayloadType, 
    type VerifyCodePendingPayloadType 
} from './userSlice';
import { api } from '../../api';

describe('userSaga', () => {
  const error = { response: { data: { error: '' } } };
  
  it('should be defined', () => expect(userSaga).toBeDefined());

  it('should take latest', () => {
    const generator: Generator = userSaga();

    const expectedEffects: Effect[] = [
        takeLatest(requestCodePending.type, handleRequestCodePending),
        takeLatest(verifyCodePending.type, handleVerifyCodePending),
        takeLatest(requestStartTrialPending.type, handleRequestStartTrialPending),
    ];

    expectedEffects.forEach((expected) => expect(generator.next().value).toEqual(expected));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  describe('handle request code pending', () => {
    const action: ReturnType<typeof requestCodePending> = {
      type: requestCodePending.type,
      payload: ''
    }

    it('try', () => {
      const generator: Generator = handleRequestCodePending(action);
      const requestCodeCallEffect: Effect = call(api.get, 'send-email?email=');
      const requestCodeSuccessPutEffect: Effect = put(requestCodeSuccess());

      expect(generator.next().value).toEqual(requestCodeCallEffect);
      expect(generator.next({}).value).toEqual(requestCodeSuccessPutEffect);
      expect(generator.next().done).toBeTruthy();
    });

    it('catch', () => {
      const generator: Generator = handleRequestCodePending(action);
      const requestCodeFailurePutEffect: Effect = put(requestCodeFailure('Failed to send code'));
      
      generator.next();

      expect(generator.throw(error).value).toEqual(requestCodeFailurePutEffect);
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('handle verify code pending', () => {
    const payload: VerifyCodePendingPayloadType = { email: '', code: '' };
    const action: ReturnType<typeof verifyCodePending> = {
      type: verifyCodePending.type,
      payload,
    }

    it('try', () => {
      const response = { data: { user_id: 0 } };
      const generator: Generator = handleVerifyCodePending(action);
      const verifyCodeCallEffect: Effect = call(api.post, 'validate-email', payload);
      const verifyCodeSuccessPutEffect: Effect = put(verifyCodeSuccess(response.data.user_id));

      expect(generator.next().value).toEqual(verifyCodeCallEffect);
      expect(generator.next(response).value).toEqual(verifyCodeSuccessPutEffect);
      expect(generator.next().done).toBeTruthy();
    });

    it('catch', () => {
      const generator: Generator = handleVerifyCodePending(action);
      const verifyCodeFailurePutEffect: Effect = put(verifyCodeFailure('Verification failed'));
      
      generator.next();

      expect(generator.throw(error).value).toEqual(verifyCodeFailurePutEffect);
      expect(generator.next().done).toBeTruthy();
    });
  });

  describe('request start trial pending', () => {
    const payload: RequestStartTrialPendingPayloadType = { user_id: 0 };
    const action: ReturnType<typeof requestStartTrialPending> = {
      type: requestStartTrialPending.type,
      payload,
    }

    it('try', () => {
      const generator: Generator = handleRequestStartTrialPending(action);
      const startTrialCallEffect: Effect = call(api.post, 'start-trial', payload);
      const requestStartTrialSuccessPutEffect: Effect = put(requestStartTrialSuccess());

      expect(generator.next().value).toEqual(startTrialCallEffect);
      expect(generator.next({}).value).toEqual(requestStartTrialSuccessPutEffect);
      expect(generator.next().done).toBeTruthy();
    });

    it('catch', () => {
      const generator: Generator = handleRequestStartTrialPending(action);
      const requestStartTrialFailurePutEffect: Effect = put(requestStartTrialFailure('Failed to start trial'));
      
      generator.next();

      expect(generator.throw(error).value).toEqual(requestStartTrialFailurePutEffect);
      expect(generator.next().done).toBeTruthy();
    });
  });
});