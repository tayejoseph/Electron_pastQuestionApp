import React from "react";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore"
import MainPage from "./container/MainPage";

export const store = configureStore();

const App = (
  <Provider store = {store}>
  <MainPage />
  </Provider>
)

export default App;