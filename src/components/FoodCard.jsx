/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../theme/Theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.42;

const FoodCard = ({image, name, subtitle, price}) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image source={image} style={styles.cardImage} />
      </View>
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.subText}>{subtitle}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>PKR {price}</Text>
        <Icon name="favorite-outline" size={22} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    gap: 15,
    width: CARD_WIDTH,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: 'lightgray',
    borderRadius: 25,
  },
  cardImage: {
    width: 130,
    height: 130,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
    textAlign: 'center',
  },
  subText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.blackColor,
    opacity: 0.6,
    textAlign: 'center',
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.9,
  },
});

export default FoodCard;
