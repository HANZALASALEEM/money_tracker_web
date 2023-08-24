import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  const [number, setNumber] = useState(null);
  const [password, setPassword] = useState();
  const [emailAlreadyFound, setEmailAlreadyFound] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [isNumberAvalible, setIsNumberAvalible] = useState(false);

  useEffect(() => {
    setEmailAlreadyFound(false);
    setInvalidEmail(false);
  }, []);

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
    if (number === null) {
      setIsNumberAvalible(true);
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          storeProfile();
          navigation.replace('BottomNavigator');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setEmailAlreadyFound(true);
          }

          if (error.code === 'auth/invalid-email') {
            setInvalidEmail(true);
          }
          if (error.code === 'auth/weak-password') {
            setWeakPassword(true);
          }

          console.error(error);
        });
    }
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
      {emailAlreadyFound ? (
        <Text style={styles.warning}>This Email already in use</Text>
      ) : (
        <View></View>
      )}
      {invalidEmail ? (
        <Text style={styles.warning}>This is a invalid Email</Text>
      ) : (
        <View></View>
      )}
      <CostomInputField
        value={number}
        placeholder={'Enter Mobile No'}
        ChangeText={text => {
          setNumber(text);
        }}
        imgSource={require('../assets/icons/call.png')}
      />
      {isNumberAvalible ? (
        <Text style={styles.warning}>Please enter phone number</Text>
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
      {weakPassword ? (
        <Text style={styles.warning}>
          Password should be at least 6 characters
        </Text>
      ) : (
        <View></View>
      )}
      {/* 10% screen height with Heading */}
      <View style={styles.buttonContainer}>
        <CostomButton title={'Sign Up'} onClick={signUp} />
      </View>
      {/* 10% screen height with Heading */}
      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
  warning: {
    fontSize: 12,
    color: 'red',
    marginLeft: 25,
  },
});
