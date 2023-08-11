// SHA1: FF:D3:E5:DE:68:A0:69:DB:4A:43:4F:04:EB:5A:5E:65:A5:94:62:B7
// SHA-256
// :8B:8E:88:71:E2:45:0E:52:81:CE:AA:06:FB:31:37:4A:22:4C:91:E9:D6:6A:EB:5F:8A:32:50:50:09:1F:DC:E1
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/screens/AppNavigator';

import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
