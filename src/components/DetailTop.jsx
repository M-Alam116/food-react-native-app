/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../theme/Theme';
import {useFavorites} from '../store/FavoriteContext';

const DetailTop = ({item, navigation, showBackIcon}) => {
  const {favorites, toggleFavorite} = useFavorites();
  const isFavorite = favorites.some(favorite => favorite.id === item.id);

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => navigation.navigate('Detail', {item})}>
      <View style={styles.icons}>
        {showBackIcon && (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon name="arrow-left" size={25} color={COLORS.blackColor} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={{marginLeft: 'auto'}}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-o'}
            size={25}
            color={isFavorite ? COLORS.orangeColor : COLORS.blackColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={18} color={COLORS.orangeColor} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.ratingText}>({item.totalRatings})</Text>
          </View>
          <Text style={styles.price}>PKR {item.price}</Text>
        </View>
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailText}>Details</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Pressable>
  );
};

export default DetailTop;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
