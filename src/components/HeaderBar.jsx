/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const HeaderBar = ({title}) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu" color={COLORS.blackColor} size={30} />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../assets/avatar.png')}
          style={styles.profile}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
