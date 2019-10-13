import {fork} from 'redux-saga/effects'
import {loadDataFlow} from "./resultSaga";

export default function* rootSaga() {
   yield fork(loadDataFlow);
}