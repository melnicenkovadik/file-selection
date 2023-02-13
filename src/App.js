import './App.css';
import React from "react";
import {FileUpload} from "./components/FileSelection";
import {Provider} from "react-redux";
import {store} from "./store";
import SavedData from "./components/SavedData";


function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <FileUpload/>
                <SavedData/>
            </Provider>
        </div>
    );
}

export default App;
