import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// Navigator
import DrawerNavigator from './src/drawer/DrawerNavigator';

// screens
import SplashScreen from './src/screens/SplashScreen';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import DetailScreen from './src/screens/DetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';

import {FavoriteProvider} from './src/store/FavoriteContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false, animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false, animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: false, animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{headerShown: false, animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
};

export default App;
