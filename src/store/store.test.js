import {csvDataReducer} from "./index";

describe('csvDataReducer', () => {
    it('should return the initial state', () => {
        const result = csvDataReducer(undefined, {});
        expect(result).toEqual({ csvData: [] });
    });

    it('should handle SET_CSV_DATA', () => {
        const result = csvDataReducer(undefined, {
            type: 'SET_CSV_DATA',
            data: [{ email: 'test@test.com', name: 'Test', phone: '123-456-7890' }]
        });
        expect(result).toEqual({
            csvData: [{ email: 'test@test.com', name: 'Test', phone: '123-456-7890' }]
        });
    });

    it('should handle SAVE_DATA_SUCCESS', () => {
        const result = csvDataReducer(undefined, {
            type: 'SAVE_DATA_SUCCESS',
            result: [{ email: 'test@test.com', name: 'Test', phone: '123-456-7890' }]
        });
        expect(result).not.toEqual({
            savedData: [{ email: 'test@test.com', name: 'Test', phone: '123-456-7890' }]
        });
    });

    it('should handle SAVE_DATA_FAILED', () => {
        const result = csvDataReducer(undefined, {
            type: 'SAVE_DATA_FAILED',
        });
        expect(result).toEqual({
            csvData: []
        });
    });
});
