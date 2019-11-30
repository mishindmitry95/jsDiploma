import React, { Component } from "react";
import configureStore from "../configureStore/index.js";
import AsyncApp from "./AsyncApp.js";
import { Provider } from "react-redux";
import Photo from "../components/photo.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    );
  }
}
