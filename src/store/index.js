import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import bountiesReducer from "./bounties/reducer";

const reduxMiddlewares = [];
reduxMiddlewares.push(thunk);
if (process.env.NODE_ENV === 'development') {
  reduxMiddlewares.push(logger);
}

const rootReducer = combineReducers({
  bounties: bountiesReducer,
});

export default createStore(rootReducer, applyMiddleware(...reduxMiddlewares));