/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../components/HeaderBar';

const OrderHistoryScreen = () => {
  return (
    <View>
      <HeaderBar title={'Order History'} />
      <Text>OrderHistoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderHistoryScreen;
