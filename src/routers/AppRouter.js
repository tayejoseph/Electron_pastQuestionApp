import React from "react";
import { connect } from "react-redux";
import {Router, Route, Switch} from "react-router";
import createHistory from "history/createBrowserHistory"; 
import MainPage from "../container/MainPage";
import filterPage from "../container/filterPage";
import AnswerPage from "../container/AnswerPage";

export const history = createHistory();

const AppRouter = (props) => {
    return (
        <Router history = {history}>
        <Switch>
            <Route path = "/" component = {MainPage} exact = {true} />     
            <Route path = "/filterPage" component = {filterPage} />     
            <Route path = "/answerPage" component = {AnswerPage} />
        </Switch>
        </Router>

    )
}

export default AppRouter;
