import {
  FETCH_REWARDS_START,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_FAILURE,
  COLLECT_REWARD,
} from "../types";

const startFetchingRewards = () => ({
  type: FETCH_REWARDS_START
});

const fetchRewardsSuccess = (payload) => ({
  type: FETCH_REWARDS_SUCCESS,
  payload,
});

const fetchRewardsFailure = (error) => ({
  type: FETCH_REWARDS_FAILURE,
  error,
});

export const collectReward = (payload) => ({
  type: COLLECT_REWARD,
  payload,
});

export const fetchRewards = () => async (dispatch) => {
  dispatch(startFetchingRewards());

  try {
    const response = await fetch('https://staging.helloagain.at/api/v1/clients/5189/bounties/');
    const data = await response.json();

    if (response.ok) {
      dispatch(fetchRewardsSuccess(data));
    } else {
      throw new Error(JSON.stringify(response));
    }
  } catch (e) {
    dispatch(fetchRewardsFailure(e));
  }
}