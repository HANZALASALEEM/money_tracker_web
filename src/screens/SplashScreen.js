import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  const [screenTimeOut, setScreenTimeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setScreenTimeOut(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (screenTimeOut) {
      navigation.navigate('OnBoardingScreen1');
    }
  }, [screenTimeOut, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#7e1d6c'} />
      <Text style={styles.name}>Money Tracker</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e1d6c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontFamily: 'Colakind',
    fontSize: 38,
  },
});
