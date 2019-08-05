import {put, call, take} from 'redux-saga/effects';
import {actionType} from "../action";
// import {loadData} from '../App'

export function* loadData(){
    try{
        let {data} = yield call(loadData);
        yield put({
            type:actionType.LOAD_DATA_SUCCESS,
            data: data.val(),
        });
        return true;
    }catch (e) {
        yield put({
            type:actionType.LOAD_DATA_FAILED
        });
        return false;
    }
}

export function* loadDataFlow(){
    while(true){
        yield take(actionType.LOAD_DATA_REQUEST);
        yield call(loadData);
    }
}

