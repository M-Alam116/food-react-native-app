/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../theme/Theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.35;

const FoodCard = ({image, name, subtitle, price}) => {

  return (
    <View style={styles.cardContainer}>
      <View>
        <Image source={{ uri: image }} style={styles.cardImage} />
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
    width: CARD_WIDTH * 1.5,
    justifyContent: 'space-between',
    height: CARD_WIDTH * 2,
    gap: 5,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    overflow: 'hidden',
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
