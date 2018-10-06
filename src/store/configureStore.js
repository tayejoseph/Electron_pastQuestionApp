import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {questionReducer, filterQuestions, selectedCourseReducer} from "./../reducers/index";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ //|| compose;

export default () => {
    const store = createStore(combineReducers({
        questionData: questionReducer,
        // currentQuestion: activeQuestionReducer,
        activeCourse: selectedCourseReducer,
        filterQuestionsData: filterQuestions
    }), applyMiddleware(thunk))
    //  composeEnhancers(applyMiddleware(thunk)))
    return  store;
};

