import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk";
import {filterQuestions, selectedCourseReducer} from "./../reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(combineReducers({
        activeCourse: selectedCourseReducer,
        filterQuestionsData: filterQuestions
    }), 
     composeEnhancers(applyMiddleware(thunk)))
    return  store;
};

