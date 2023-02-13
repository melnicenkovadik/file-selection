import {render, screen} from '@testing-library/react';
import App from './App';
import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

import thunk from "redux-thunk";
import {csvDataReducer} from "./store";
import {FileUpload} from "./components/FileSelection";

const rootReducer = combineReducers({
  csvData: csvDataReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
it('renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <FileUpload/>
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});