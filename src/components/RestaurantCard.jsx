/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../theme/Theme';

const RestaurantCard = ({image, name, location}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={17} color={COLORS.orangeColor} />
          <Icon name="star" size={17} color={COLORS.orangeColor} />
          <Icon name="star" size={17} color={COLORS.orangeColor} />
          <Icon name="star" size={17} color={COLORS.orangeColor} />
          <Icon name="star" size={17} color={COLORS.orangeColor} />
        </View>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 270,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    elevation: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 20,
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
    fontSize: 18,
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
