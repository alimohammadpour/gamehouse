import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  requestGetPlansPending, 
  requestGetPlansSuccess, 
  requestGetPlansFailure,
} from './planSlice';
import { api } from '../../api';
import { getError } from '../../utils/ErrorTypeHandler';

export function* handleRequestGetPlansPending() {
  try {
    const { data } = yield call(api.get, 'products');
    yield put(requestGetPlansSuccess(data));
  } catch (error: unknown) {
    yield put(requestGetPlansFailure(getError(error) || 'Failed to get plans'));
  }
}

export default function* planSaga() {
  yield takeLatest(requestGetPlansPending.type, handleRequestGetPlansPending);
}
