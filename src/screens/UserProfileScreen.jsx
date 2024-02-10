/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../components/HeaderBar';

const UserProfileScreen = () => {
  return (
    <View>
      <HeaderBar title={'Profile'} />
      <Text>UserProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
