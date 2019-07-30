export const actionType={
    LOAD_DATA_REQUEST: 'LOAD_DATA_REQUEST',
    LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
    LOAD_DATA_FAILED: 'LOAD_DATA_FAILED',
};

export function loadData(){
    return{
        type: actionType.LOAD_DATA_REQUEST,

    }
}