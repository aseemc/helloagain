import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  SafeAreaView, 
  SectionList, 
  ActivityIndicator, 
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SectionHeader, SectionItem } from './components';
import { collectReward, fetchRewards } from './store/loyaltyRewards/actions';
import { rewardsSelector, collectedRewardsSelector, isFetchingRewardsSelector } from './store/loyaltyRewards/selectors';
import { appStrings } from './localization';

export default () => {
  const dispatch = useDispatch();
  const { allRewards, collectedRewards, isFetchingRewards } = useSelector((state) => ({
    allRewards: rewardsSelector(state),
    collectedRewards: collectedRewardsSelector(state),
    isFetchingRewards: isFetchingRewardsSelector(state),
  }));

  const { 
    alert: { ok_title, cancel_title },
    section_titles: { available_rewards, redeemed_rewards },
    misc: { fetching_rewards }
  } = appStrings;

  useEffect(() => {
    dispatch(fetchRewards())
  }, []);
  

  const redeemAlert = ({ item }) => {
    const {
      bounty_redeem_alert_header,
      bounty_redeem_alert_text,
      redeem_success_alert_text
    } = item;

    Alert.alert(
      bounty_redeem_alert_header,
      bounty_redeem_alert_text,
      [
        {
          text: cancel_title,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: ok_title, onPress: () => {
          dispatch(collectReward(item));
          alert(redeem_success_alert_text);
        } }
      ]
    );
  }

  if (isFetchingRewards || !allRewards) {
    const { activityView } = styles;
    return (
      <View style={activityView}>
        <ActivityIndicator size={'large'} color={'black'} />
        <Text style={{ fontSize: 14 }}>{fetching_rewards}</Text>
      </View>
    )
  }

  const DATA = [
    {
      title: available_rewards,
      data: allRewards
    },
  ];

  if (collectedRewards.length) {
    DATA.unshift({
      title: redeemed_rewards,
      data: collectedRewards
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={{ width: '100%' }}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <SectionItem item={item} redeemAlert={redeemAlert} />
        }}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        showsVerticalScrollIndicator={false}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8
  },
  activityView: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
