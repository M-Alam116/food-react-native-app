/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../bottomTab/TabNavigator';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import {COLORS} from '../theme/Theme';
import DrawerCard from './DrawerCard';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerCard {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.whiteColor,
          activeTintColor: COLORS.whiteColor,
          inactiveTintColor: COLORS.blueColor,
        },
      }}>
      <Drawer.Screen name="Tab" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={UserProfileScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
