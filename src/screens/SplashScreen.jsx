/* eslint-disable prettier/prettier */
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../theme/Theme';
import Auth from '@react-native-firebase/auth'
import { StackActions } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {

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

      <Text style={styles.text}>Meal Master</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.orangeColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
});
