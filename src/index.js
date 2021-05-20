import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  SafeAreaView, 
  SectionList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { collectReward, fetchRewards } from './store/bounties/actions';
import { rewardsSelector, collectedRewardsSelector, isFetchingRewardsSelector } from './store/bounties/selectors';

export default () => {
  const dispatch = useDispatch();
  const { allRewards, collectedRewards, isFetchingRewards } = useSelector((state) => ({
    allRewards: rewardsSelector(state),
    collectedRewards: collectedRewardsSelector(state),
    isFetchingRewards: isFetchingRewardsSelector(state),
  }));

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
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          dispatch(collectReward(item));
          alert(redeem_success_alert_text);
        } }
      ]
    );
  }
    

  const SectionHeader = ({ title }) => (
    <View style={{ height: 30, justifyContent: 'center', backgroundColor: 'lightgrey', borderRadius: 5, paddingLeft: 5 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
    </View>
  )

  const SectionItem = ({ item }) => {
    const { name, pictures, needed_points, redeem_count } = item;

    return (
      <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'center', alignItems: 'center', height: 65, width: '100%', flex: 1 }}>
        <Image
          style={{ borderRadius: 5, width: 50, height: 50 }}
          source={pictures.length ? { uri: pictures[0].image } : require('../assets/image_placeholder.png')}
        />
        <View style={{ flex: 1, justifyContent: 'space-evenly', marginLeft: 8 }}>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 14, flexWrap: 'wrap' }}>{name}</Text>
          </View>
          <Text style={{ fontSize: 12, color: 'grey' }}>Points needed: {needed_points}</Text>
        </View>
        {!redeem_count && <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}>
          <TouchableOpacity 
            style={{ height: 30, backgroundColor: 'bisque', justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingHorizontal: 5 }}
            onPress={() => redeemAlert({ item })}
          >
            <Text style={{ fontSize: 12 }}>Redeem</Text>
          </TouchableOpacity>
        </View>}
      </View>
    )
  }

  if (isFetchingRewards || !allRewards) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
        <Text style={{ fontSize: 14 }}>Fetching rewards...</Text>
      </View>
    )
  }

  const DATA = [
    {
      title: "Available rewards",
      data: allRewards
    },
  ];

  if (collectedRewards.length) {
    DATA.unshift({
      title: "Redeemed rewards",
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
          return <SectionItem item={item} />
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
});
