/* eslint-disable prettier/prettier */
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../components/HeaderBar';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserProfileScreen = () => {
  const [username, setUsername] = useState('');
  const currentuser = auth().currentUser;
  const userId = currentuser.uid;
  const db = firestore();

  useEffect(() => {
    const getUsername = async () => {
      const user = await db.collection('users').doc(userId).get();
      setUsername(user._data.name);
    };

    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <HeaderBar title={'Profile'} profileShown={false} />

        <ImageBackground
          source={require('../assets/other/blank-profile.png')}
          style={styles.bgImage}
        />

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/other/blank-profile.png')}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>{username}</Text>

        <View style={styles.bottomContainer}>
          <View style={styles.info}>
            <Icon name="user" size={30} color={COLORS.blackColor} />
            <Text style={styles.infoText}>{username}</Text>
          </View>
          <View style={styles.info}>
            <Icon1 name="email" size={30} color={COLORS.blackColor} />
            <Text style={styles.infoText}>{currentuser.email}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  bgImage: {
    height: 250,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    bottom: -55,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 55,
    textAlign: 'center',
    color: COLORS.blackColor,
  },
  bottomContainer: {
    marginTop: 50,
    gap: 20,
    paddingHorizontal: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.8,
  },
});

export default UserProfileScreen;
