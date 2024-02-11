/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../theme/Theme';

const DrawerCard = ({state, navigation}) => {
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
      <View style={styles.infoContainer}>
        <Image
          source={require('../assets/other/avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>Muhammad Alam</Text>
        <Text style={styles.emailText}>alam@gmail.com</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  linksContainer: {
    marginRight: 10,
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
});

export default DrawerCard;
