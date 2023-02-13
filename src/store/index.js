import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

// Reducers

const initialState = {
    csvData: []
};

export const csvDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CSV_DATA":
            return {
                ...state,
                csvData: action.data
            };
        case "SAVE_DATA_SUCCESS":
            return {
                ...state,
                savedData: action.result,
                // csvData: [],
            };
        case "SAVE_DATA_FAILED":
            return {
                ...state,
                csvData: []

            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    csvData: csvDataReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

