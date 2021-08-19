import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen'
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppStackNavigator = createStackNavigator({
  HomeRequest: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  RecieverDetails: {
    screen: RecieverDetailsScreen,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'HomeRequest'
  }
);
