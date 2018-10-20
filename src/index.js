import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApiData from "./api/uni_api2";
import {getPastQuestionApi} from "./actions";
import {store} from "./App"



store.dispatch(getPastQuestionApi(ApiData))
ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
