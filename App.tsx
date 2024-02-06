import React, {useEffect} from 'react';

// Navigation imports
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens imports
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import TabNavigator from './src/navigators/TabNavigator';

import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
