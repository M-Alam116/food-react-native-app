/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderBar = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      <Icon name="menu" color={COLORS.blackColor} size={30} />
      <Text style={styles.HeaderText}>{title}</Text>
      <Image source={require('../assets/avatar.png')} style={styles.profile} />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  HeaderText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.blackColor,
    opacity: 0.8,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
});

export default HeaderBar;
