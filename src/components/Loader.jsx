/* eslint-disable prettier/prettier */
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Theme';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={COLORS.orangeColor} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});
