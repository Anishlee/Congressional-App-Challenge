import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Dashboard from "../screens/DashboardPages/Dashboard";
import Login from "../screens/DashboardPages/Login Page";
import CreateAccount from "../screens/DashboardPages/CreateAccount";
import PlaceANewOrder from "../screens/DashboardPages/PlaceANewOrder";
import PreviousOrders from "../screens/DashboardPages/PreviousOrders";
import Profile from "../screens/DashboardPages/Profile";
import Settings from "../screens/DashboardPages/Settings";
import Map from "../screens/DashboardPages/Map";
import VolunteerDashboard from "../screens/DashboardPages/VolunteerDashboard";
import CompletedOrders from "../screens/DashboardPages/CompletedOrders";
import CurrentOrder from "../screens/DashboardPages/CurrentOrders";
const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Dashboard: Dashboard,
    CreateAccount: CreateAccount,
    PlaceANewOrder: PlaceANewOrder,
    PreviousOrders: PreviousOrders,
    Profile: Profile,
    Settings: Settings,
    Map: Map,
    VolunteerDashboard: VolunteerDashboard,
    CompletedOrders: CompletedOrders,
    CurrentOrder: CurrentOrder,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "darkturquoise",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: "#333333",
      headerTitleStyle: {
        color: "#000000",
      },
    },
  }
);

export default createAppContainer(AppNavigator);
