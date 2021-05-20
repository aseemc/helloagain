import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';

import bountiesReducer from "./bounties/reducer";

const rootReducer = combineReducers({
  bounties: bountiesReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));