import {actionType} from "../action";

const initialState={
    data: []
};

// 긍부적 결과값
function resultReducer(state=initialState, action){
    switch (action.type) {
        case actionType.LOAD_DATA_SUCCESS:
            console.log('LOAD_DATA_SUCCESS');
            return {
                ...state,
                data:action.data
            };
        case actionType.LOAD_DATA_FAILED:
            console.log('LOAD_DATA_FAILED');
            return {
              ...state,
            };
        default:
            return state
    }
}

export default resultReducer;