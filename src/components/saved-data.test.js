import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SavedData from './SavedData';

const mockStore = configureStore([]);

describe('SavedData component', () => {
    afterEach(cleanup);

    it('should render saved data in a table', () => {
        const store = mockStore({
            csvData: {
                savedData: [
                    { email: 'email@example.com', name: 'John Doe', phone: '555-555-5555' },
                    { email: 'email2@example.com', name: 'Jane Doe', phone: '555-555-5556' },
                ],
            },
        });

        const { getByText, getAllByTestId } = render(
            <Provider store={store}>
                <SavedData />
            </Provider>,
        );

        const savedDataHeader = getByText('Saved Data');
        expect(savedDataHeader).toBeInTheDocument();

        const tableRows = getAllByTestId('table-row');
        expect(tableRows.length).toBe(2);

        const firstRowData = tableRows[0].children;
        expect(firstRowData[0]).toHaveTextContent('email@example.com');
        expect(firstRowData[1]).toHaveTextContent('John Doe');
        expect(firstRowData[2]).toHaveTextContent('555-555-5555');
    });

    it('should not render anything if there is no saved data', () => {
        const store = mockStore({
            csvData: {
                savedData: [],
            },
        });

        const { queryByText } = render(
            <Provider store={store}>
                <SavedData />
            </Provider>,
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const savedDataHeader = queryByText('Saved Data');
        expect(savedDataHeader).not.toBeInTheDocument();
    });
});
