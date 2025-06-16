import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  requestCodeFailure, 
  requestCodePending, 
  requestCodeSuccess,
  verifyCodeFailure,
  verifyCodePending,
  verifyCodeSuccess,
  requestStartTrialPending,
  requestStartTrialSuccess,
  requestStartTrialFailure,
} from './userSlice';
import { api } from '../../api';
import { getError } from '../../utils/ErrorTypeHandler';

export function* handleRequestCodePending({ payload }: ReturnType<typeof requestCodePending>) {
  try {
    yield call(api.get, `send-email?email=${encodeURIComponent(payload)}`);
    yield put(requestCodeSuccess());
  } catch (err: unknown) {
    yield put(requestCodeFailure(getError(err) || 'Failed to send code'));
  }
}

export function* handleVerifyCodePending({ payload }: ReturnType<typeof verifyCodePending>) {
  try {
    const { data: { user_id } } = yield call(api.post, 'validate-email', payload);
    yield put(verifyCodeSuccess(user_id));
  } catch (err: unknown) {
    yield put(verifyCodeFailure(getError(err) || 'Verification failed'));
  }
}

export function* handleRequestStartTrialPending({ payload }: ReturnType<typeof requestStartTrialPending>) {
  try {
    yield call(api.post, 'start-trial', payload)
    yield put(requestStartTrialSuccess());
  } catch (err: unknown) {
    yield put(requestStartTrialFailure(getError(err) || 'Failed to start trial'));
  }
}

export default function* userSaga() {
  yield takeLatest(requestCodePending.type, handleRequestCodePending);
  yield takeLatest(verifyCodePending.type, handleVerifyCodePending);
  yield takeLatest(requestStartTrialPending.type, handleRequestStartTrialPending);
}
