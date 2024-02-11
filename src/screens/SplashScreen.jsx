/* eslint-disable prettier/prettier */
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../theme/Theme';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Signin');
    }, 2000);
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.orangeColor}/>

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
