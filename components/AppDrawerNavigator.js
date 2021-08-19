import React, { Component } from "react";
import customSideBarMenu from './CustomSideBarMenu'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { AppTabNavigator } from './AppTabNavigator'
import SettingScreen from "../SideBarScreens/SettingScreen";
import MyBarterscreen from "../SideBarScreens/MyBarterScreen"
import NotificationScreen from "../screens/notificationscreen"

export const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: AppTabNavigator },
    Setting: { screen: SettingScreen },
    MyBarters: { screen: MyBarterscreen },
    Notifications: { screen: NotificationScreen }

},
    {
        contentComponent: customSideBarMenu
    },
    {
        initialRouteName: 'Home'
    }


)