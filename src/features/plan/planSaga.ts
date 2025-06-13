import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  requestGetPlansPending, 
  requestGetPlansSuccess, 
  requestGetPlansFailure,
} from './planSlice';
import { api } from '../../api';

export function* handleRequestGetPlansPending() {
  try {
    const { data } = yield call(api.get, 'products');
    yield put(requestGetPlansSuccess(data));
  } catch (error: any) {
    yield put(requestGetPlansFailure(error.response?.data?.error || 'Failed to get plans'));
  }
}

export default function* planSaga() {
  yield takeLatest(requestGetPlansPending.type, handleRequestGetPlansPending);
}
