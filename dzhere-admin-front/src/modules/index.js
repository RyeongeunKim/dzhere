import { combineReducers } from "redux";
import auth from "./auth/auth";
import loading from "./loading";
import list from './user/list'
import studentCount from "./user/studentCount";
import teacher, { teacherSaga } from "./user/teacherClassAttend";
import studentAttend, { studentSaga } from "./user/studentClassAttend";
import { studentCountSaga } from "./user/studentCount";
import classes from './class/course';
import teacherWeb from './user/teacherWeb'
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  list,
  studentCount,
  teacher,
  studentAttend,
  loading,
  teacherWeb,
  classes
});

export function* rootSaga() {
  yield all([teacherSaga(), studentSaga(), studentCountSaga()]);
}

export default rootReducer;
