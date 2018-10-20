import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk";
import pastQuestionApiReducer from "./../reducers/PastQuestionApi";
import activePastQuestionDatas from "../reducers/ActiveQuestionData";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
    const store = createStore(combineReducers({
        PastQuestionApiDatas: pastQuestionApiReducer,
        ActivePastQuestionDatas : activePastQuestionDatas
    }),
    composeEnhancers(applyMiddleware(thunk)))
    return store
}