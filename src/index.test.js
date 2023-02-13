import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('App component', () => {
    test('renders without crashing', () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                container
            );
        });
    });
});