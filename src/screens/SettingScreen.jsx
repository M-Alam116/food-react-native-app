/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../components/HeaderBar';

const SettingScreen = () => {
  return (
    <View>
      <HeaderBar title={'Setting'} />
      <Text>SettingScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingScreen;
