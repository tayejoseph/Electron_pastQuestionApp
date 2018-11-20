import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {getPastQuestionApi} from "./actions";
import {store} from "./App"
import ApiData from "./api/api_data";

store.dispatch(getPastQuestionApi(ApiData))
ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
