import React, { Component } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
//import HomeScreen from "../screens/homescreen";
import AddItemRequestScreen from "../screens/addItemrequestscreen";
import { AppStackNavigator } from "./AppStackNavigator";

export const AppTabNavigator = createBottomTabNavigator({
  Requests: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/home.png")}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: "Home",
    },
  },
  ExchangeRequest: {
    screen: AddItemRequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/exchange.png")}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: "Exchange",
    },
  },
});
