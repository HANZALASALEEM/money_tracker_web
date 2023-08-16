// import {StatusBar, StyleSheet, Text, View} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import auth from '@react-native-firebase/auth';
// import COLOR from '../assets/colors/Color';
// const SplashScreen = ({navigation}) => {
//   const [screenTimeOut, setScreenTimeOut] = useState(false);
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       setScreenTimeOut(true);
//     }, 1500);
//   }, []);

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, [screenTimeOut]);

//   if (!user) {
//     return (
//       <View>
//         <Text>Not Login</Text>
//       </View>
//     );
//   }
//   if (user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   useEffect(() => {
//     if (screenTimeOut & user) {
//       navigation.navigate('BottomNavigator');
//     }
//   }, [screenTimeOut, user]);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={COLOR.purple} />
//       <Text style={styles.name}>Money Tracker</Text>
//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLOR.purple,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   name: {
//     color: COLOR.white,
//     fontFamily: 'Colakind',
//     fontSize: 38,
//   },
// });
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import COLOR from '../assets/colors/Color';

const SplashScreen = ({navigation}) => {
  const [screenTimeOut, setScreenTimeOut] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (initializing) {
      // Avoid rendering until initializing is done
      return;
    }

    if (screenTimeOut && user) {
      navigation.navigate('BottomNavigator');
    }
  }, [screenTimeOut, user, initializing, navigation]);

  useEffect(() => {
    setTimeout(() => {
      setScreenTimeOut(true);
    }, 1500);
  }, []);

  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (initializing) setInitializing(false);
  }

  if (!screenTimeOut) {
    // You might want to show a loading state here
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLOR.purple} />
        <Text style={styles.name}>Money Tracker</Text>
      </View>
    );
  }

  // if (!user) {
  //   return (
  //     <View>
  //       <Text>Not Login</Text>
  //     </View>
  //   );
  // }

  // return (
  //   <View>
  //     <Text>Login</Text>
  //   </View>
  // );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: COLOR.white,
    fontFamily: 'Colakind',
    fontSize: 38,
  },
});
