export const rewardsSelector = (state) => {
  const allRewards = state.bounties.rewards;
  const collectedRewardsIds = state.bounties.collectedRewards.map(item => item.id);

  return allRewards.filter(reward => !collectedRewardsIds.includes(reward.id));
};

export const collectedRewardsSelector = state => state.bounties.collectedRewards;

export const isFetchingRewardsSelector = state => state.bounties.isFetchingRewards;