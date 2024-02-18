/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CartItem from '../components/CartItem';
import HeaderBar from '../components/HeaderBar';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/Theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from '../components/Loader';
import EmptyComponent from '../components/EmptyComponent';

const CartScreen = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentuser = auth().currentUser;
  const db = firestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await db.collection('users').doc(currentuser.uid).get();
        if (doc.exists) {
          const userCart = doc._data.cart;
          setCartData(userCart);
        } else {
          throw new Error('User data not found');
        }
      } catch (error) {
        console.log('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = db
      .collection('users')
      .doc(currentuser.uid)
      .onSnapshot(fetchData);

    // Return cleanup function to unsubscribe from listener when component unmounts
    return () => unsubscribe();
  }, [currentuser.uid, db]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartData.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.screenContainer]}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title={'My Cart List'} />
        {loading ? (
          <Loader />
        ) : cartData.length < 1 ? (
          <EmptyComponent />
        ) : (
          cartData.map((item, index) => <CartItem key={index} item={item} />)
        )}
      </ScrollView>

      {cartData.length > 0 && (
        <View style={[styles.bottomContainer, {marginBottom: tabBarHeight}]}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Total Items</Text>
            <Text style={styles.totalPriceText}>{cartData.length}</Text>
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.totalPriceText}>PKR {getTotalPrice()}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewContainer: {
    gap: 15,
    marginVertical: 10,
    paddingBottom: 20,
  },
  bottomContainer: {
    gap: 10,
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
