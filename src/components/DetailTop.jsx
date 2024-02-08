/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../theme/Theme';

const DetailTop = ({name, price, rating, totalRatings, description, image}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color={COLORS.blackColor} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart" size={25} color={COLORS.blackColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={18} color={COLORS.orangeColor} />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.ratingText}>({totalRatings})</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>PKR {price}</Text>
          <View style={styles.priceController}>
            <TouchableOpacity>
              <Icon name="minus" size={18} color={COLORS.blackColor} />
            </TouchableOpacity>
            <Text style={styles.quantity}>1</Text>
            <TouchableOpacity>
              <Icon name="plus" size={18} color={COLORS.blackColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailText}>Details</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default DetailTop;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 270,
    height: 270,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  priceContainer: {
    alignItems: 'center',
    gap: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.blackColor,
    opacity: 0.7,
  },
  price: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  priceController: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 10,
    backgroundColor: COLORS.orangeColor,
    padding: 15,
    borderRadius: 100,
  },
  quantity: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  detail: {
    gap: 5,
    marginVertical: 20,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.blackColor,
    opacity: 0.8,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.blackColor,
    opacity: 0.5,
  },
});
