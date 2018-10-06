import React from "react";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore"

import AppRouter, { history } from "./routers/AppRouter";


export const store = configureStore();

const jsx = (
  <Provider store = {store}>
  <AppRouter />
  </Provider>
)

export default jsx;
