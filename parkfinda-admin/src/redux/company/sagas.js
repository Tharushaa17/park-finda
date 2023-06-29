import http from '../../services/httpService';
import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { getCompanyListSuccess } from './actions';
import { GET_COMPANY_LIST } from '../actions';

function* getCompanyList() {
  try {
    const response = yield call(http.get, '/api/admin/company');
    if (response) {
      yield put(getCompanyListSuccess(response.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetCompanyList() {
  yield takeLatest(GET_COMPANY_LIST, getCompanyList)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetCompanyList)
  ]);
}