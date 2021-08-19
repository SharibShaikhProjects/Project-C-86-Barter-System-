import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

//Importing Welcome Screen, TabNavigator And DrawerNavigator From Local Folders
import WelcomeScreen from './screens/welcomeScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

;


export default function App(){
    return (
      //Displaying The AppContaniner
      <AppContainer />
    );

}
//Creating The SwitchNavigator for Swapping Between Screens
const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppDrawerNavigator },
  BottomTab: { screen: AppTabNavigator },
})

//Creating AppContainer For Displaying The SwitchNavigator
const AppContainer = createAppContainer(switchNavigator)
