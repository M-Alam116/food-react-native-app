/* eslint-disable prettier/prettier */
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../components/HeaderBar';
import Historycard from '../components/Historycard';
import {COLORS} from '../theme/Theme';
import {ScrollView} from 'react-native-gesture-handler';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const OrderHistoryScreen = () => {
  const tabHeight = useBottomTabBarHeight();
  return (
    <View style={[styles.screenContainer, {marginBottom: tabHeight}]}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title={'Order History'} />
        <Historycard />
        <Historycard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default OrderHistoryScreen;
