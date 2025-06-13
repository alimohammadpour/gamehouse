import { all } from 'redux-saga/effects';
import userSaga from '../features/user/userSaga';
import planSaga from '../features/plan/planSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    planSaga(),
  ]);
}