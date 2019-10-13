import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer, applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;