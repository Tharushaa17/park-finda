import { all } from 'redux-saga/effects';
import carPark from './car-park/sagas';
import authSagas from './auth/saga';
import company from './company/sagas';

export default function* rootSaga(getState) {
  yield all([
    carPark(),
    authSagas(),
    company()
  ]);
}
