/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Theme';

const EmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Items Found!</Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  text: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.orangeColor,
  },
});
