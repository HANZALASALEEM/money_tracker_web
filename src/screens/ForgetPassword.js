// ForgetPassword.js

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import COLOR from '../assets/colors/Color';
import CostomInputField from '../components/CostomInputField';
import CostomButton from '../components/CostomButton';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const sendPasswordResetEmail = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        setResetSent(true);
      })
      .catch(error => {
        // Handle any errors (e.g., invalid email, user not found)
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forget Password</Text>
      <Text style={styles.description}>
        Enter your email to reset your password:
      </Text>
      <CostomInputField
        value={email}
        placeholder={'Enter Email'}
        ChangeText={text => {
          setEmail(text);
        }}
        imgSource={require('../assets/icons/email.png')}
      />
      {resetSent ? (
        <Text style={styles.successMessage}>
          Password reset email sent. Check your inbox or spam.
        </Text>
      ) : null}
      <View style={styles.buttonContainer}>
        <CostomButton
          title={'Reset Password'}
          onClick={sendPasswordResetEmail}
        />
      </View>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.replace('Login')}>
        <Text style={styles.description}>Go back login again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
  },
  heading: {
    fontSize: 28,
    color: COLOR.purple,
    letterSpacing: 2,
    fontWeight: '700',
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    color: COLOR.darkGray,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  login: {
    marginTop: 70,
  },
});

export default ForgetPassword;
