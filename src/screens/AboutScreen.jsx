/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../components/HeaderBar';

const AboutScreen = () => {
  return (
    <View>
      <HeaderBar title={'About'} />
      <Text>AboutScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutScreen;
