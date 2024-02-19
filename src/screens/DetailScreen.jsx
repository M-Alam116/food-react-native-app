/* eslint-disable prettier/prettier */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DetailTop from '../components/DetailTop';
import {COLORS} from '../theme/Theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DetailScreen = ({navigation, route}) => {
  const {item} = route.params;

  const db = firestore();
  const currrentuser = auth().currentUser;

  const handleAddToCart = async data => {
    const userId = currrentuser.uid;
    const user = await db.collection('users').doc(userId).get();
    let userCart = [],
      userCard = user._data.cart;
    if (userCard.length > 0) {
      let exits = false;
      userCard.map(itm => {
        if (itm.id === data.id) {
          exits = true;
          itm.quantity = itm.quantity + 1;
        }
      });

      if (!exits) {
        userCard.push(data);
      }
    } else {
      userCard.push(data);
    }

    db.collection('users').doc(userId).update({
      cart: userCard,
    });

    navigation.navigate('Cart');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <DetailTop
        key={item.id}
        item={item}
        navigation={navigation}
        showBackIcon={true}
      />
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsText}>Ingredients</Text>
        <View style={styles.ingredients}>
          {item.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientsList}>
              {ingredient}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.addCartBtn}
        onPress={() => handleAddToCart(item)}>
        <Text style={styles.addCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  ingredientsContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  ingredientsText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.blackColor,
    opacity: 0.8,
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  ingredientsList: {
    backgroundColor: COLORS.orangeColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.whiteColor,
    borderRadius: 50,
    elevation: 5,
  },
  addCartBtn: {
    backgroundColor: COLORS.orangeColor,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 10,
  },
  addCartText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.whiteColor,
    textAlign: 'center',
  },
});

export default DetailScreen;
