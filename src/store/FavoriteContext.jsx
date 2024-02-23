/* eslint-disable prettier/prettier */
import React, {createContext, useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(snapshot => {
        const userData = snapshot._data;
        const {name, email, profileImg} = userData;
        setUser({name, email, profileImg});
        if (userData && userData.favorite) {
          setFavorites(userData.favorite);
        }
      });

    return () => unsubscribe();
  }, [currentUser.uid]);

  const toggleFavorite = async item => {
    try {
      const userRef = firestore().collection('users').doc(currentUser.uid);
      const userDoc = await userRef.get();
      const userFavorites = userDoc.exists ? userDoc._data.favorite || [] : [];

      if (userFavorites.some(favItem => favItem.id === item.id)) {
        await userRef.update({
          favorite: userFavorites.filter(favItem => favItem.id !== item.id),
        });
      } else {
        await userRef.update({
          favorite: [...userFavorites, item],
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <FavoriteContext.Provider value={{favorites, toggleFavorite, user}}>
      {children}
    </FavoriteContext.Provider>
  );
};
