/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../theme/Theme';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged((user) => {
        const routename = user !== null ? 'Drawer' : 'Signin';
        navigation.dispatch(StackActions.replace(routename))  // use dispatch so that can can't move back to splash screen
      })
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.orangeColor} />
      <View
        style={{backgroundColor: '#ff8200', padding: 25, borderRadius: 200}}>
        <View
          style={{backgroundColor: '#f89522', padding: 15, borderRadius: 200}}>
          <Image
            source={require('../assets/other/splash.png')}
            style={styles.image}
          />
        </View>
      </View>
      <Text style={styles.text}>Meal Master</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orangeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.whiteColor,
    marginTop: 30,
    opacity: 0.7,
  },
  image: {
    width: 210,
    height: 210,
  },
});
