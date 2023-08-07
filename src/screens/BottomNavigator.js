import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {Image} from 'react-native';
import LoanAccounts from '../bottomTabs/LoanAccounts';
import CashInOut from '../bottomTabs/CashInOut';
import COLOR from '../assets/colors/Color';
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="LoanAccounts"
      screenOptions={{
        tabBarActiveTintColor: COLOR.white,
        tabBarInactiveTintColor: COLOR.pink,
        tabBarStyle: {
          display: 'flex',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLOR.purple,
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust the font size as needed
        },
      }}>
      <Tab.Screen
        name="LoanAccounts"
        component={LoanAccounts}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../assets/icons/loan.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLOR.white : COLOR.pink,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="CashInOut"
        component={CashInOut}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../assets/icons/cash-in-out.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLOR.white : COLOR.pink,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
