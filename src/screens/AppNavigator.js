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
import ContactList from './forLoanAccountsScreens/ContactList';
import AddCostumer from './forLoanAccountsScreens/AddCostumer';
import EditProfile from './EditProfile';
import SignUp from './SignUp';
import Login from './Login';
import AccountDetails from './forLoanAccountsScreens/AccountDetails';
import NewEntryGive from './forLoanAccountsScreens/NewEntryGive';
import NewEntryTake from './forLoanAccountsScreens/NewEntryTake';
import ItemDetailsLoanAccount from './forLoanAccountsScreens/ItemDetailsLoanAccount';
import NewEntryEarned from './forCashInOut/NewEntryEarned';
import NewEntrySpend from './forCashInOut/NewEntrySpend';
import ItemDetailsCashInOut from './forCashInOut/ItemDetailsCashInOut';
import Profile from './Profile';
import ForgetPassword from './ForgetPassword';

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
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCostumer"
        component={AddCostumer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewEntryGive"
        component={NewEntryGive}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewEntryTake"
        component={NewEntryTake}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemDetailsLoanAccount"
        component={ItemDetailsLoanAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewEntryEarned"
        component={NewEntryEarned}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewEntrySpend"
        component={NewEntrySpend}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemDetailsCashInOut"
        component={ItemDetailsCashInOut}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
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
