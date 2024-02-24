/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Theme';
import OrderItemCard from './OrderItemCard';

const Historycard = ({order}) => {
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={{gap: 5}}>
        <View style={styles.innerContainer}>
          <Text style={styles.infoText}>Order Time</Text>
          <Text style={styles.infoText}>Total Amount</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.timeText}>{formatTime(order.timestamp.seconds * 1000)}</Text>
          <Text style={styles.timeText}>PKR {order.totalPrice}</Text>
        </View>
      </View>
      <View style={{gap: 20}}>
        {order.items.map((item, index) => (
          <OrderItemCard key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default Historycard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 30,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.blackColor,
    opacity: 0.8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.orangeColor,
    opacity: 0.8,
  },
});
