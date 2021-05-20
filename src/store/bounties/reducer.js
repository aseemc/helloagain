import {
  FETCH_REWARDS_START,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_FAILURE,
  COLLECT_REWARD,
} from "../types";

const initialState = {
  isFetchingRewards: false,
  rewards: null,
  error: null,
  collectedRewards: null,
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case FETCH_REWARDS_START:
      return {
        ...state,
        isFetchingRewards: true,
      }
    
    case FETCH_REWARDS_SUCCESS:
      if (payload.length) {
        payload.reduce((acc, item) => {
          acc[item.id] = item;

          return acc;
        }, {});
      }
      return {
        ...state,
        isFetchingRewards: false,
        rewards: payload
      }

    case FETCH_REWARDS_FAILURE:
      return {
        ...state,
        isFetchingRewards: false,
        error,
      }

    case COLLECT_REWARD:
      return {
        ...state,
        collectedRewards: [
          ...state.collectedRewards,
          payload,
        ]
      }
  
    default:
      return state;
  }
}