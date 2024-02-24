/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Exit from 'react-native-vector-icons/MaterialIcons';

import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useFavorites} from '../store/FavoriteContext';

const DrawerCard = ({state, navigation}) => {
  const {user} = useFavorites();

  const links = [
    {
      icon: <Icon name="home" size={25} color={COLORS.blackColor} />,
      title: 'Home',
      navigationTo: 'Tab',
    },
    {
      icon: <Icon name="user" size={25} color={COLORS.blackColor} />,
      title: 'Profile',
      navigationTo: 'Profile',
    },
    {
      icon: <Icon name="setting" size={25} color={COLORS.blackColor} />,
      title: 'Setting',
      navigationTo: 'Setting',
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.infoContainer}>
          {user?.profileImg ? (
            <Image
              source={{uri: user.profileImg}}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require('../assets/other/blank-profile.png')}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>

        <View style={styles.linksContainer}>
          {links.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.navigationTo)}>
              <View
                style={[
                  styles.innerContainer,
                  state.routeNames[state.index] === item.navigationTo && {
                    backgroundColor: 'lightblue',
                  },
                ]}>
                <View>{item.icon}</View>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={async () => {
          await auth().signOut();
          navigation.dispatch(StackActions.replace('Signin'));
        }}>
        <Exit name="exit-to-app" size={25} color={COLORS.blackColor} />
        <Text style={styles.titleText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 20,
  },
  linksContainer: {
    marginRight: 10,
    marginTop: 40,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 15,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.blackColor,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.blackColor,
  },
  emailText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.blackColor,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 15,
  },
});

export default DrawerCard;
