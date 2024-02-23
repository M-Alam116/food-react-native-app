/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useFavorites} from '../store/FavoriteContext';

const HeaderBar = ({title, profileShown = true}) => {
  const navigation = useNavigation();
  const {user} = useFavorites();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu" color={COLORS.blackColor} size={30} />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{title}</Text>
      {profileShown ? (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          {user.profileImg ? (
            <Image source={{uri: user.profileImg}} style={styles.profile} />
          ) : (
            <Image
              source={require('../assets/other/blank-profile.png')}
              style={styles.profile}
            />
          )}
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
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
    width: 35,
    height: 35,
    borderRadius: 100,
  },
});

export default HeaderBar;
