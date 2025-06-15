import { expect, describe, it } from 'vitest';
import userReducer, { 
    initialState, 
    requestCodeFailure, 
    requestCodePending, 
    requestCodeSuccess, 
    requestStartTrialFailure, 
    requestStartTrialPending, 
    requestStartTrialSuccess, 
    verifyCodePending, 
    verifyCodeSuccess, 
    type RequestStartTrialPendingPayloadType,
    type VerifyCodePendingPayloadType 
} from './userSlice';

describe('userReducer', () => {
    it('should be defined', () => expect(userReducer).toBeDefined());
  
    it("should return the initial state", () => {
        expect(userReducer(undefined, { type: ''})).toEqual(initialState);
    });

    it('request code pending', () => {
        const userState = userReducer(initialState, requestCodePending(''));
        expect(userState).toEqual({ ...initialState, pending: true });
    });

    it('request code success', () => {
        const userState = userReducer(initialState, requestCodeSuccess());
        expect(userState).toEqual({ ...initialState, pending: false });
    });

    it('request code failure', () => {
        const userState = userReducer(initialState, requestCodeFailure(''));
        expect(userState).toEqual({ ...initialState, pending: false, error: '' });
    });

    it('verify code pending', () => {
        const payload: VerifyCodePendingPayloadType = { email: '', code: '' };
        const userState = userReducer(initialState, verifyCodePending(payload));
        expect(userState).toEqual({ ...initialState, pending: true });
    });

    it('verify code success', () => {
        const userState = userReducer(initialState, verifyCodeSuccess(0));
        expect(userState).toEqual({ ...initialState, pending: false, userId: 0 });
    });

    it('verify code failure', () => {
        const userState = userReducer(initialState, requestCodeFailure(''));
        expect(userState).toEqual({ ...initialState, pending: false, error: '' });
    });

    it('request start trial pending', () => {
        const payload: RequestStartTrialPendingPayloadType = { user_id: 0 };
        const userState = userReducer(initialState, requestStartTrialPending(payload));
        expect(userState).toEqual({ ...initialState, pending: true });
    });

    it('request start trial success', () => {
        const userState = userReducer(initialState, requestStartTrialSuccess());
        expect(userState).toEqual({ ...initialState, pending: false, isSubscribed: true });
    });

    it('request start trial failure', () => {
        const userState = userReducer(initialState, requestStartTrialFailure(''));
        expect(userState).toEqual({ ...initialState, pending: false, error: '' });
    });
  });