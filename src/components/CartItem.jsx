/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../theme/Theme';

const CartItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Image
          source={require('../assets/burger/avocado_burger.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.nameText}>Classic Burger</Text>
        <Text style={styles.priceText}>PKR 1500</Text>
        <View style={styles.controllerContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="minus" size={15} color={COLORS.whiteColor} />
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>5</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Icon name="plus" size={15} color={COLORS.whiteColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 10,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  rightContainer: {
    gap: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  controllerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: COLORS.orangeColor,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 7,
  },
  quantity: {
    borderWidth: 2,
    borderColor: COLORS.orangeColor,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 7,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
});
