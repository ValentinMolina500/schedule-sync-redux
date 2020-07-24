import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Home/Home";
import NewEventPage from "./NewEvent/NewEvent";

import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (

        <div className="App">

            <Router>
                <Route exact path={"/"} component={HomePage} />
                <Route exact path={"/new-survey"} component={NewEventPage} />
            </Router>
        </div>
    );
}

export default App;
