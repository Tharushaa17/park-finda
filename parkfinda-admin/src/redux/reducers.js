import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import carPark from './car-park/reducer';
import authUser from './auth/reducer';
import company from './company/reducer';

const reducers = combineReducers({
  authUser,
  menu,
  settings,
  carPark,
  company
});

export default reducers;