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
import React, {useEffect, useRef, useState} from 'react';
import FoodCard from '../components/FoodCard';
import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/RestaurantCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [burgerData, setBurgerData] = useState([]);
  const [pizzaData, setPizzaData] = useState([]);
  const [friesData, setFriesData] = useState([]);
  const [fruitData, setFruitData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const burger = await fetchCategoryData('burger');
        setBurgerData(burger);
        const pizza = await fetchCategoryData('pizza');
        setPizzaData(pizza);
        const fries = await fetchCategoryData('fries');
        setFriesData(fries);
        const fruit = await fetchCategoryData('fruit');
        setFruitData(fruit);
        const categories = await fetchCategoryData('category');
        setCategoryList(categories);
        const restaurants = await fetchCategoryData('restaurant');
        setRestaurant(restaurants);
        setCategory(pizza);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCategoryData = async collection => {
    const collectionData = await firestore().collection(collection).get();
    const data = collectionData.docs.map(doc => doc.data());
    return data;
  };

  const searchFood = text => {
    const filteredCategory = category.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setCategory(filteredCategory);
  };

  const resetSearchFood = () => {
    setSearchText('');
    switch (activeCategory) {
      case 'Pizza':
        setCategory(pizzaData);
        break;
      case 'Burger':
        setCategory(burgerData);
        break;
      case 'Fries':
        setCategory(friesData);
        break;
      case 'Fruit':
        setCategory(fruitData);
        break;
      default:
        break;
    }
  };

  const handleCategoryPress = type => {
    setActiveCategory(type);
    switch (type) {
      case 'Pizza':
        setCategory(pizzaData);
        break;
      case 'Burger':
        setCategory(burgerData);
        break;
      case 'Fries':
        setCategory(friesData);
        break;
      case 'Fruit':
        setCategory(fruitData);
        break;
      default:
        break;
    }

    flatListRef.current.scrollToIndex({index: 0});
  };

  const tabHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title="Search Food" />

        <View style={styles.mainText}>
          <Text style={styles.ScreenTitleUp}>Let's eat</Text>
          <Text style={styles.ScreenTitleBottom}>Nutrious food</Text>
        </View>

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

        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}>
            {categoryList.map((data, index) => (
              <CategoryCard
                key={index}
                image={data.image}
                title={data.title}
                active={activeCategory === data.title}
                onPress={() => handleCategoryPress(data.title)}
              />
            ))}
          </ScrollView>
        )}

        {loading ? (
          <Loader />
        ) : (
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
                  <FoodCard key={item.id} item={item} />
                </TouchableOpacity>
              );
            }}
          />
        )}

        <Text style={styles.restaurantText}>Top Restaurants</Text>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.restaurantContainer,
              {marginBottom: tabHeight},
            ]}>
            {restaurant.map((data, index) => (
              <RestaurantCard
                key={index}
                name={data.name}
                image={data.image}
                location={data.location}
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
  },
  scrollViewContainer: {
    flexGrow: 1,
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
    height: 50,
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
