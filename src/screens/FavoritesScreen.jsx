/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme/Theme';
import DetailTop from '../components/DetailTop';
import {BurgerData} from '../data/FoodData';
import HeaderBar from '../components/HeaderBar';

const FavoritesScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title={'My Favorite List'} />
        {BurgerData.map(item => (
          <DetailTop
            name={item.name}
            image={item.image}
            description={item.description}
            price={item.price}
            rating={item.rating}
            totalRatings={item.totalRatings}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    gap: 30,
  },
});

export default FavoritesScreen;
