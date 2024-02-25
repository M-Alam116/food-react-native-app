/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLORS} from '../theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OrderItemCard = ({item}) => {
  const {name, price, quantity, image} = item;

  const splitItemName = (itemname, wordCount) => {
    const words = itemname.split(' ');
    if (words.length > wordCount) {
      // Join the first `wordCount` words with a space to create the first line
      const firstLine = words.slice(0, wordCount).join(' ');
      // Join the remaining words with a space to create the second line
      const secondLine = words.slice(wordCount).join(' ');
      return [firstLine, secondLine];
    }
    // If the item name has fewer words than the specified count, return the original name
    return [itemname];
  };

  const [line1, line2] = splitItemName(name, 2);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', {item})}>
      <View style={styles.topContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <View>
          <Text style={styles.name}>{line1}</Text>
          {line2 && <Text style={styles.name}>{line2}</Text>}
        </View>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.priceText}>{price}</Text>
        <Text style={styles.priceText}>
          <Text style={styles.TotalPriceText}>X</Text> {quantity}
        </Text>
        <Text style={styles.TotalPriceText}>PKR {price * quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: COLORS.whiteColor,
    gap: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 130,
    width: 130,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  TotalPriceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.orangeColor,
  },
});
