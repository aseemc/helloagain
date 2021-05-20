import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewards } from './store/bounties/actions';
import { allRewards, collectedRewards } from './store/bounties/selectors';

export default () => {
  const dispatch = useDispatch();
  const { rewards, collected } = useSelector((state) => ({
    rewards: allRewards(state),
    collected: collectedRewards(state),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title={"fetch data"} onPress={() => dispatch(fetchRewards())} />
      <Text>{JSON.stringify(rewards)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
