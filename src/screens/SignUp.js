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
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();

  const userId = uuid.v4();
  const storeProfile = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid) // Automatically generates a unique document ID
      .set({
        email: email,
        number: number,
        password: password,
        photo: null,
        name: null,
      })
      .then(() => {
        console.log('User profile added!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        storeProfile();
        navigation.replace('BottomNavigator');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert(
            'email-already-in-use',
            'That email address is already in use!',
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('invalid-email', 'That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* 7% screen height with Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>SignUp</Text>
      </View>
      {/* 10% screen height with Heading */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Please enter your Mobile No,Email and Password
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
      <CostomInputField
        value={number}
        placeholder={'Enter Mobile No'}
        ChangeText={text => {
          setNumber(text);
        }}
        imgSource={require('../assets/icons/call.png')}
      />
      <CostomInputField
        value={password}
        placeholder={'Enter Password'}
        ChangeText={text => {
          setPassword(text);
        }}
        imgSource={require('../assets/icons/password.png')}
      />
      {/* 10% screen height with Heading */}
      <View style={styles.buttonContainer}>
        <CostomButton title={'Sign Up'} onClick={signUp} />
      </View>
      {/* 10% screen height with Heading */}
      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{color: COLOR.purple}}> Log In ?</Text>
        </TouchableOpacity>
        <Text style={styles.description}>If you already have an account</Text>
      </View>
    </View>
  );
};

export default SignUp;

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
    flexDirection: 'row',
  },
  password: {},
});
