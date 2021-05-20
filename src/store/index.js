import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';

import loyaltyRewardsReducer from "./loyaltyRewards/reducer";

const rootReducer = combineReducers({
  loyaltyRewards: loyaltyRewardsReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));