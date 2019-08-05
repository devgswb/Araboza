//resultSaga 와 연결
export const actionType={
    LOAD_DATA_REQUEST: 'LOAD_DATA_REQUEST',
    LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
    LOAD_DATA_FAILED: 'LOAD_DATA_FAILED',
};

// actionType 액션관련 saga 에서 호출해야하는 액션
export function loadData(){
    return{
        type: actionType.LOAD_DATA_REQUEST,
    }
}