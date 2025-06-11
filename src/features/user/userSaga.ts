import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { requestCodePending } from './userSlice';

function* handleRequestCodePending({ payload }: ReturnType<typeof requestCodePending>) {
  try {
    yield call(axios.get, `/api/send-email-validation-code?email=${encodeURIComponent(payload)}`);
    // yield put(requestCodeSuccess());
  } catch (error: any) {
    // yield put(requestCodeFailure(error.response?.data?.error || 'Failed to send code'));
  }
}

export default function* userSaga() {
  yield takeLatest(requestCodePending.type, handleRequestCodePending);
}
