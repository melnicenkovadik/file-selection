import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';
import {useDispatch, useSelector} from 'react-redux';

export const FileUpload = () => {
    const [headers, setHeaders] = useState([]);
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        Papa.parse(selectedFile, {
            header: true,
            complete: (result) => {
                setHeaders(result.meta.fields);
                dispatch(setCSVData(result.data));
            }
        });
        setShowModal(prevState => !prevState);
    };

    useEffect(() => {
        if (headers.length === 0) {
            dispatch(setCSVData([]));
            setFile(null);

        }
    }, [headers]);

    return (
        <div>
            <label htmlFor="file">Upload a file</label>
            <input
                id="file"
                type="file"
                onChange={handleFileSelect}/>
            {headers.length > 0 && (
                <CSVHeadersMapper
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setHeaders={setHeaders}
                    headers={headers}/>
            )}
        </div>
    );
};

const CSVHeadersMapper = ({headers, showModal, setShowModal, setHeaders}) => {
    const [mappedHeaders, setMappedHeaders] = useState({});
    const dispatch = useDispatch();

    const handleMappingChange = (e, header) => {
        setMappedHeaders({
            ...mappedHeaders,
            [header]: e.target.value
        });
    };

    const handleSaveMapping = () => {
        dispatch(validateData(mappedHeaders));
        setShowModal(prevState => !prevState);
        setMappedHeaders({})
        setHeaders([])
    };

    return <>
        {
            showModal ? (
                <div className='modal'>
                    <div className='modal-content'>
                        <table>
                            <thead>
                            <tr>
                                <th>CSV Header</th>
                                <th>DB Column</th>
                            </tr>
                            </thead>
                            <tbody>
                            {headers.map((header) => (
                                <tr key={header}>
                                    <td>{header}</td>
                                    <td>
                                        <select onChange={(e) => handleMappingChange(e, header)}>
                                            <option value="">Select</option>
                                            <option value="email">Email</option>
                                            <option value="name">Name</option>
                                            <option value="phone">Phone</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={handleSaveMapping}>Save Mapping</button>
                    </div>
                </div>
            ) : null
        }
    </>
};
const validateData = (mappedHeaders) => {
    return (dispatch, getState) => {
        const {csvData} = getState();
        let isValid = true;
        const mappedData = [];
        csvData.csvData
            .forEach((data) => {
                const mappedRow = {};
                let hasData = false;

                Object.keys(mappedHeaders).forEach((header) => {
                    if (data[header]) {
                        hasData = true;
                        mappedRow[mappedHeaders[header]] = data[header];
                    }
                });

                if (!hasData) {
                    isValid = false;
                    return;
                }

                if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mappedRow.email)) {
                    isValid = false;
                    return;
                }

                if (!/^[a-zA-Z]+$/.test(mappedRow.name)) {
                    isValid = false;
                    return;
                }

                if (!/^\d{10}$/.test(mappedRow.phone)) {
                    isValid = false;
                    return;
                }

                mappedData.push(mappedRow);
            });

        if (isValid) {
            dispatch(saveData(mappedData));
        } else {
            alert('Validation failed');
        }
    };
};

const saveData = (data) => {
    return (dispatch) => {
        // fetch('API_ENDPOINT', {
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // })
        // here we are just mocking the API call
        try {
            setTimeout(() => {
                dispatch(saveDataSuccess(data));
            }, 2000);

        } catch (error) {
            dispatch(saveDataFailed(error));
        }
    };
};

const saveDataSuccess = (result) => ({
    type: 'SAVE_DATA_SUCCESS',
    result
});

const saveDataFailed = (error) => ({
    type: 'SAVE_DATA_FAILED',
    error
});


export const setCSVData = (data) => {
    return {
        type: 'SET_CSV_DATA',
        data
    }
}