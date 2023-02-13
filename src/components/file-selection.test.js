import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import {FileUpload, setCSVData} from "./FileSelection";
import Papa from 'papaparse';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn()
}));

jest.mock('papaparse', () => {
    return {
        parse: jest.fn().mockImplementation((file, options) => {
            return {
                data: [
                    { name: 'John Doe', email: 'johndoe@example.com', phone: '1234567890' },
                    { name: 'Jane Doe', email: 'janedoe@example.com', phone: '0987654321' }
                ],
                meta: { fields: ['name', 'email', 'phone'] }
            };
        })
    };
});

describe('FileUpload', () => {
    let dispatched;

    beforeEach(() => {
        dispatched = jest.fn();
        useDispatch.mockImplementation(() => dispatched);
    });

    it('dispatches setCSVData with data from the selected file', () => {
        const file = new File(['test,data'], 'test.csv', { type: 'text/csv' });
        const { getByLabelText } = render(<FileUpload />);

        Papa.parse.mockImplementationOnce((file, config) => {
            config.complete({
                meta: { fields: ['test'] },
                data: [{ test: 'data' }]
            });
        });

        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.change(getByLabelText('Upload a file'), { target: { files: [file] } });

        expect(dispatched).toHaveBeenCalledWith(setCSVData([{ test: 'data' }]));
    });
});
