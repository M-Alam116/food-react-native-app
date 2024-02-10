/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CartItem from '../components/CartItem';
import HeaderBar from '../components/HeaderBar';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/Theme';

const CartScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.screenContainer]}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title={'My Cart List'} />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ScrollView>
      <View style={[styles.bottomContainer, {marginBottom: tabBarHeight}]}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.totalPriceText}>PKR 3000</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    marginBottom: 230,
  },
  scrollViewContainer: {
    gap: 15,
    marginVertical: 10,
    marginBottom: 30,
  },
  bottomContainer: {
    gap: 20,
    paddingVertical: 20,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
    textAlign: 'center',
    opacity: 0.8,
  },
  checkoutBtn: {
    backgroundColor: COLORS.orangeColor,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.whiteColor,
    textAlign: 'center',
  },
});

export default CartScreen;
