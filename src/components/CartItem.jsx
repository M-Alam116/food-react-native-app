/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../theme/Theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CartItem = ({item}) => {
  const db = firestore();
  const currrentuser = auth().currentUser;

  const handleAddItem = async id => {
    const userId = currrentuser.uid;
    const user = await db.collection('users').doc(userId).get();
    let userCard = user._data.cart;
    userCard.map(itm => {
      if (itm.id === id) {
        itm.quantity = itm.quantity + 1;
      }
    });

    db.collection('users').doc(userId).update({
      cart: userCard,
    });
  };
  const handleRemoveItem = async id => {
    const userId = currrentuser.uid;
    const user = await db.collection('users').doc(userId).get();
    let userCard = user._data.cart;
    userCard.map(itm => {
      if (itm.id === id) {
        itm.quantity = itm.quantity - 1;
      }
    });

    db.collection('users').doc(userId).update({
      cart: userCard,
    });
  };

  const handleDeleteItem = async id => {
    const userId = currrentuser.uid;
    const user = await db.collection('users').doc(userId).get();
    let userCard = user._data.cart;
    const indexToRemove = userCard.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      userCard.splice(indexToRemove, 1);
    }

    db.collection('users').doc(userId).update({
      cart: userCard,
    });
  };

  const splitItemName = (name, wordCount) => {
    const words = name.split(' ');
    if (words.length > wordCount) {
      // Join the first `wordCount` words with a space to create the first line
      const firstLine = words.slice(0, wordCount).join(' ');
      // Join the remaining words with a space to create the second line
      const secondLine = words.slice(wordCount).join(' ');
      return [firstLine, secondLine];
    }
    // If the item name has fewer words than the specified count, return the original name
    return [name];
  };

  const [line1, line2] = splitItemName(item.name, 2);

  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.nameText}>{line1}</Text>
          {line2 && <Text style={styles.nameText}>{line2}</Text>}
        </View>
        <Text style={styles.priceText}>PKR {item.price}</Text>
        <View style={styles.controllerContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (item.quantity > 1) {
                handleRemoveItem(item.id);
              } else {
                handleDeleteItem(item.id);
              }
            }}>
            <Icon name="minus" size={15} color={COLORS.whiteColor} />
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddItem(item.id)}>
            <Icon name="plus" size={15} color={COLORS.whiteColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 10,
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
  rightContainer: {
    gap: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
  controllerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: COLORS.orangeColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 7,
  },
  quantity: {
    borderWidth: 2,
    borderColor: COLORS.orangeColor,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 7,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.blackColor,
  },
});
