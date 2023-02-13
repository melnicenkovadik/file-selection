import React from 'react';
import {useSelector} from "react-redux";

const SavedData = (props) => {

    const savedData = useSelector((state) => state.csvData.savedData);

    return (
        <>
            {
                savedData?.length > 0 && (
                    <div>
                        <h3>Saved Data</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Phone</th>
                            </tr>
                            </thead>
                            <tbody>
                            {savedData?.map((data) => (
                                <tr key={data?.email}>
                                    <td>{data?.email}</td>
                                    <td>{data?.name}</td>
                                    <td>{data?.phone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    );
}

export default SavedData;