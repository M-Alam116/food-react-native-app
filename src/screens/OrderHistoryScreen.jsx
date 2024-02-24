/* eslint-disable prettier/prettier */
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../components/HeaderBar';
import Historycard from '../components/Historycard';
import {COLORS} from '../theme/Theme';
import {ScrollView} from 'react-native-gesture-handler';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from '../components/Loader';
import EmptyComponent from '../components/EmptyComponent';

const OrderHistoryScreen = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentuser = auth().currentUser;
  const tabHeight = useBottomTabBarHeight();

  useEffect(() => {
    const fetchOrderHistoryData = async () => {
      try {
        const docRef = firestore().collection('users').doc(currentuser.uid);

        const unsubscribe = docRef.onSnapshot(snapshot => {
          if (snapshot?.exists) {
            const historyData = snapshot._data.orderhistory;
            setOrderHistoryData(historyData);
          }
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching order history data: ', error.message);
        setLoading(false);
      }
    };

    fetchOrderHistoryData();
  }, []);

  return (
    <View style={[styles.screenContainer, {marginBottom: tabHeight}]}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title={'Order History'} />
        {loading ? (
          <Loader />
        ) : orderHistoryData.length === 0 ? (
          <EmptyComponent />
        ) : (
          orderHistoryData.map((order, index) => (
            <Historycard key={index} order={order} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default OrderHistoryScreen;
