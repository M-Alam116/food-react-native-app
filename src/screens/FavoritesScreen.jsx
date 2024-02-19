/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {COLORS} from '../theme/Theme';
import DetailTop from '../components/DetailTop';
import HeaderBar from '../components/HeaderBar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from '../components/Loader';
import EmptyComponent from '../components/EmptyComponent';

const FavoritesScreen = ({navigation}) => {
  const [favoriteData, setFavoriteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentuser = auth().currentUser;
  const db = firestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await db.collection('users').doc(currentuser.uid).get();
        if (doc.exists) {
          const userFavorite = doc._data.favorite;
          setFavoriteData(userFavorite);
        } else {
          throw new Error('User data not found');
        }
      } catch (error) {
        console.log('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = db
      .collection('users')
      .doc(currentuser.uid)
      .onSnapshot(fetchData);

    // Return cleanup function to unsubscribe from listener when component unmounts
    return () => unsubscribe();
  }, [currentuser.uid, db]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <HeaderBar title={'My Favorite List'} />
        {loading ? (
          <Loader />
        ) : favoriteData.length < 1 ? (
          <EmptyComponent />
        ) : (
          favoriteData.map(item => (
            <DetailTop
              key={item.id}
              item={item}
              navigation={navigation}
              showBackIcon={false}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 75,
  },
});

export default FavoritesScreen;
