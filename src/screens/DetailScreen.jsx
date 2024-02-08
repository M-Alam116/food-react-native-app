/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DetailTop from '../components/DetailTop';
import {COLORS} from '../theme/Theme';

const DetailScreen = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <DetailTop
        name={item.name}
        image={item.image}
        description={item.description}
        price={item.price}
        rating={item.rating}
        totalRatings={item.totalRatings}
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
    </ScrollView>
  );
};

export default DetailScreen;

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
});
