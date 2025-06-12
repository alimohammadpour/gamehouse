import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  requestCodeFailure, 
  requestCodePending, 
  requestCodeSuccess,
} from './userSlice';
// import axios from 'axios';
import { api } from '../../api';

export function* handleRequestCodePending({ payload }: ReturnType<typeof requestCodePending>) {
  try {
    yield call(api.get, `send-email?email=${encodeURIComponent(payload)}`);
    yield put(requestCodeSuccess());
  } catch (error: any) {
    yield put(requestCodeFailure(error.response?.data?.error || 'Failed to send code'));
  }
}

export default function* userSaga() {
  yield takeLatest(requestCodePending.type, handleRequestCodePending);
}
