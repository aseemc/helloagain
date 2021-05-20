export const rewardsSelector = (state) => {
  const allRewards = state.loyaltyRewards.rewards;
  const collectedRewardsIds = state.loyaltyRewards.collectedRewards.map(item => item.id);

  return allRewards.filter(reward => !collectedRewardsIds.includes(reward.id));
};

// Assumption made here is that if someone redeems a rewards, 
// then there should be an update to the server and some flags should get modified.
// Here, I am setting redeem_count to non null value and using it to show/ no show redeem button
// in the section list item.
export const collectedRewardsSelector = state => 
  state.loyaltyRewards.collectedRewards.reduce((acc, item) => {
    acc.push({
      ...item,
      redeem_count: 1
    });

    return acc;
  }, []);

export const isFetchingRewardsSelector = state => state.loyaltyRewards.isFetchingRewards;