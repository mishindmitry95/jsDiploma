import photos from "../reducers/index.js";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  const store = createStore(
    photos,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
  );
  return store;
}
