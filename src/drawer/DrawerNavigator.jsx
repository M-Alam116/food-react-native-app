/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../navigators/TabNavigator';
import UserProfileScreen from '../screens/UserProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import { COLORS } from '../theme/Theme';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.whiteColor,
        }
      }}>
      <Drawer.Screen name="Tab" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={UserProfileScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
