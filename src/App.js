import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Home/Home";
import NewEventPage from "./NewEvent/NewEvent";
import ViewSurveyPage from "./ViewSurvey/ViewSurvey";
import AnswerSurveyPage from "./AnswerSurvey/AnswerSurvey";

import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (

        <div className="App">

            <Router>
                <Route exact path={"/"} component={HomePage} />
                <Route exact path={"/new-survey"} component={NewEventPage} />
                <Route exact path={"/view-survey"} component={ViewSurveyPage} />
                <Route exact path={"/answer-survey"} component={AnswerSurveyPage} />
            </Router>
        </div>
    );
}

export default App;
