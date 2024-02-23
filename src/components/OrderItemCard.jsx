/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Theme';

const OrderItemCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/burger/avocado_burger.png')}
          style={styles.image}
        />
        <Text style={styles.name}>cheese Burger</Text>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.priceText}>PKR 1000</Text>
        <Text style={styles.priceText}>
          <Text style={styles.TotalPriceText}>X</Text> 5
        </Text>
        <Text style={styles.TotalPriceText}>PKR 5000</Text>
      </View>
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: COLORS.whiteColor,
    gap: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.blackColor,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  TotalPriceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.orangeColor,
  },
});
