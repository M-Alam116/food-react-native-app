/* eslint-disable prettier/prettier */
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import FoodCard from '../components/FoodCard';
import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoryCard from '../components/CategoryCard';
import {Category} from '../data/CategoryData';
import {BurgerData, PizzaData, FriesData, FruitData} from '../data/FoodData';
import RestaurantCard from '../components/RestaurantCard';
import {RestaurantData} from '../data/RestaurantData';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [category, setCategory] = useState(PizzaData);
  const flatListRef = useRef(null);

  const searchFood = text => {
    const filteredCategory = category.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setCategory(filteredCategory);
  };

  const resetSearchFood = () => {
    setSearchText('');
    // Reset to original category data
    switch (activeCategory) {
      case 'Pizza':
        setCategory(PizzaData);
        break;
      case 'Burger':
        setCategory(BurgerData);
        break;
      case 'Fries':
        setCategory(FriesData);
        break;
      case 'Fruit':
        setCategory(FruitData);
        break;
      default:
        break;
    }
  };

  const handleCategoryPress = type => {
    setActiveCategory(type);
    switch (type) {
      case 'Pizza':
        setCategory(PizzaData);
        break;
      case 'Burger':
        setCategory(BurgerData);
        break;
      case 'Fries':
        setCategory(FriesData);
        break;
      case 'Fruit':
        setCategory(FruitData);
        break;
      default:
        break;
    }

    // Reset scroll position to start of the list
    flatListRef.current.scrollToIndex({index: 0});
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HeaderBar title="Search Food" />

        {/* Text line */}
        <View style={styles.mainText}>
          <Text style={styles.ScreenTitleUp}>Let's eat</Text>
          <Text style={styles.ScreenTitleBottom}>Nutrious food</Text>
        </View>

        {/* Search field */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              searchFood(searchText);
            }}>
            <Icon
              style={styles.InputIcon}
              name="search"
              size={22}
              color={
                searchText.length > 0 ? COLORS.orangeColor : COLORS.blackColor
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Food..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              if (text.length === 0) {
                resetSearchFood();
              } else {
                searchFood(text);
              }
            }}
            placeholderTextColor={COLORS.blackColor}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                resetSearchFood();
              }}>
              <Icon
                style={styles.InputIcon}
                name="close"
                size={22}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category list */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          {Category.map(data => (
            <CategoryCard
              key={data.title}
              image={data.image}
              title={data.title}
              active={activeCategory === data.title}
              onPress={() => handleCategoryPress(data.title)}
            />
          ))}
        </ScrollView>

        {/* Food List */}
        <FlatList
          ref={flatListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.emptyText}>No food Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={category}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Detail', {
                    item: item,
                  });
                }}>
                <FoodCard
                  id={item.id}
                  type={item.type}
                  image={item.image}
                  name={item.name}
                  subtitle={item.subtitle}
                  price={item.price}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* Restaurants list */}
        <Text style={styles.restaurantText}>Top Restaurants</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantContainer}>
          {RestaurantData.map(data => (
            <RestaurantCard
              key={data.name}
              name={data.name}
              image={data.image}
              location={data.location}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    marginBottom: 90,
  },
  mainText: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ScreenTitleUp: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
  },
  ScreenTitleBottom: {
    fontSize: 28,
    fontWeight: '500',
    color: COLORS.blackColor,
    opacity: 0.6,
    marginTop: -5,
  },
  InputContainerComponent: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: COLORS.whiteColor,
    alignItems: 'center',
    margin: 20,
    elevation: 10,
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    flex: 1,
    height: 60,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.blackColor,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  FlatListContainer: {
    gap: 20,
    paddingHorizontal: 20,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.7,
  },
  restaurantText: {
    fontSize: 22,
    color: COLORS.blackColor,
    fontWeight: '900',
    opacity: 0.8,
    margin: 20,
    marginBottom: 10,
  },
  restaurantContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
});

export default HomeScreen;
