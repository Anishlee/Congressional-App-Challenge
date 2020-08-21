import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '../screens/Dashboard';
import LoginPage from '../screens/LoginPage';
import CreateAccount from '../screens/CreateAccount';
import PlaceANewOrder from '../screens/DashboardPages/PlaceANewOrder';
import PreviousOrders from '../screens/DashboardPages/PreviousOrders';
import Profile from '../screens/DashboardPages/Profile';
import Settings from '../screens/DashboardPages/Settings';

const AppNavigator = createStackNavigator(
  {
    LoginPage: LoginPage,
    Dashboard: Dashboard,
    CreateAccount: CreateAccount,
    PlaceANewOrder: PlaceANewOrder,
    PreviousOrders: PreviousOrders,
    Profile: Profile,
    Settings: Settings,
  },
  {initialRouteName: 'LoginPage'},
);

export default createAppContainer(AppNavigator);
