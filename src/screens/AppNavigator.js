import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import OnBoardingScreen1 from './OnBoardingScreen1';
import OnBoardingScreen2 from './OnBoardingScreen2';
import OnBoardingScreen3 from './OnBoardingScreen3';
import OTPScreen from './OTPScreen';
import VerificationScreen from './VerificationScreen';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreen1"
        component={OnBoardingScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreen2"
        component={OnBoardingScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreen3"
        component={OnBoardingScreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
