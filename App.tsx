import 'react-native-gesture-handler';
// import React, {useEffect} from 'react';

// // Navigation imports
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// // Screens imports
// import Signin from './src/screens/Signin';
// import Signup from './src/screens/Signup';
// import DetailScreen from './src/screens/DetailScreen';
// import PaymentScreen from './src/screens/PaymentScreen';
// import TabNavigator from './src/navigators/TabNavigator';
// import DrawerNavigator from './src/navigators/DrawerNavigator';

// import SplashScreen from 'react-native-splash-screen';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   useEffect(() => {
//     SplashScreen.hide();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen
//           name="Signin"
//           component={Signin}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="Signup"
//           component={Signup}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="Tab"
//           component={TabNavigator}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="Detail"
//           component={DetailScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="Payment"
//           component={PaymentScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="Drawer"
//           component={DrawerNavigator}
//           options={{animation: 'slide_from_bottom'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
  );
};

export default App;
