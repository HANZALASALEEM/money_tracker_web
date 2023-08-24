import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../assets/colors/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CostomInputField from '../components/CostomInputField';
import CostomButton from '../components/CostomButton';
import auth from '@react-native-firebase/auth';
const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userNotFound, setUserNotFound] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.replace('BottomNavigator');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setUserNotFound(true);
        }

        if (error.code === 'auth/invalid-email') {
          setInvalidEmail(true);
        }
        if (error.code === 'auth/wrong-password') {
          setWrongPassword(true);
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* 7% screen height with Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Login</Text>
      </View>
      {/* 10% screen height with Heading */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Please enter your Email and Password
        </Text>
      </View>
      <CostomInputField
        value={email}
        placeholder={'Enter Email'}
        ChangeText={text => {
          setEmail(text);
        }}
        imgSource={require('../assets/icons/email.png')}
      />
      {userNotFound ? (
        <Text style={styles.warning}>User Not Found</Text>
      ) : (
        <View></View>
      )}
      {userNotFound ? (
        <Text style={styles.warning}>User Not Found</Text>
      ) : (
        <View></View>
      )}
      <CostomInputField
        value={password}
        placeholder={'Enter Password'}
        ChangeText={text => {
          setPassword(text);
        }}
        imgSource={require('../assets/icons/password.png')}
      />
      {wrongPassword ? (
        <Text style={styles.warning}>Wrong Password</Text>
      ) : (
        <View></View>
      )}
      {/* 10% screen height with Heading */}
      <View style={styles.buttonContainer}>
        <CostomButton title={'Login'} onClick={login} />
      </View>
      {/* 10% screen height with Heading */}
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.description}>Forget Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headingContainer: {
    height: hp('10%'),

    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    color: COLOR.purple,
    letterSpacing: 2,
    fontWeight: '700',
  },
  descriptionContainer: {
    height: hp('7%'),

    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    color: COLOR.darkGray,
  },
  buttonContainer: {
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  password: {},
  warning: {
    fontSize: 12,
    color: 'red',
    marginLeft: 25,
  },
});
