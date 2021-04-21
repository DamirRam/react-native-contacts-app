import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Screen_1 from '../screens/Screen_1';
import Screen_2 from '../screens/Screen_2';
import Screen_3 from '../screens/Screen_3';

import TapBar from '../components/TapBar';

const RootStack = createStackNavigator();
const SecureStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SecureScreens = () => (
  <SecureStack.Navigator initialRouteName="Log in" headerMode="none">
    <SecureStack.Screen name="Log in" component={Screen_2} />
    <SecureStack.Screen name="Gallery" component={Screen_3} />
  </SecureStack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      headerMode="none"
      initialRouteName="Screen_1"
      tabBar={({navigation, state}) => (
        <TapBar navigation={navigation} state={state} />
      )}>
      <RootStack.Screen name="Contacts" component={Screen_1} />
      <RootStack.Screen name="Log in" component={SecureScreens} />
    </Tab.Navigator>
  );
};

const Navigation = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="TabNavigator" headerMode="none">
      <RootStack.Screen name="TabNavigation" component={TabNavigator} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default Navigation;
