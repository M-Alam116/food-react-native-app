/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Theme';

const CategoryCard = ({image, title, active, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.cardContainer,
          active
            ? {backgroundColor: COLORS.orangeColor}
            : {backgroundColor: COLORS.whiteColor},
        ]}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <Text
          style={[
            styles.cardText,
            active ? {color: COLORS.whiteColor} : {color: COLORS.blackColor},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 140,
    height: 50,
    borderRadius: 50,
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    elevation: 10,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '900',
  },
  cardImage: {
    width: 40,
    height: 40,
  },
});

export default CategoryCard;
