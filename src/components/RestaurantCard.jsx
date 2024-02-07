/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../theme/Theme';

const RestaurantCard = ({image, name, location}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/restaurant/restaurant1.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.nameText}>FoodCave{'\n'}Restaurants</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color={COLORS.orangeColor} />
          <Icon name="star" size={20} color={COLORS.orangeColor} />
          <Icon name="star" size={20} color={COLORS.orangeColor} />
          <Icon name="star" size={20} color={COLORS.orangeColor} />
          <Icon name="star" size={20} color={COLORS.orangeColor} />
        </View>
        <Text style={styles.location}>Islamabad, Pakistan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  rightContainer: {
    gap: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  location: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.blackColor,
    opacity: 0.6,
  },
});

export default RestaurantCard;
