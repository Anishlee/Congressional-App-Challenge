import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";
import CreateAccount from "../screens/CreateAccount";

const AppNavigator = createStackNavigator(
  {
    LoginPage: LoginPage,
    HomePage: HomePage,
    CreateAccount: CreateAccount,
  },
  { initialRouteName: "LoginPage" }
);

export default createAppContainer(AppNavigator);
