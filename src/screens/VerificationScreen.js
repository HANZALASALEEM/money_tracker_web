import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/colors/Color';

const VerificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      {/* 5% screen height with skip button */}
      <View style={styles.skipContainer}></View>
      {/* 50% screen height with image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/verification.png')}
          style={styles.image}
        />
      </View>
      {/* 5% screen height with Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Verification</Text>
      </View>
      {/* 5% screen height with Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Verify your number with the given OTP code
        </Text>
      </View>
      {/* 15% screen height with Input Feild Container */}
      <View style={styles.inputMajorContainer}>
        <View style={styles.inputContainer}>
          {/* 80% screen width with Input Feild */}
          <TextInput style={styles.input} placeholder="OTP Code" />
          <View style={styles.inputIconContainer}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/icons/password.png')}
            />
          </View>
        </View>
      </View>
      {/* 20% screen height with forword button */}
      <View style={styles.buttonMajorContainer}>
        <TouchableOpacity
          style={styles.forwordButton}
          onPress={() => {
            navigation.navigate('BottomNavigator');
          }}>
          <Text style={styles.forwordButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipContainer: {
    height: hp('5%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  skipContainerText: {
    color: '#e1e1e1',
    fontSize: 20,
    left: Dimensions.get('screen').width - 60,
  },
  imageContainer: {
    height: hp('50%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    height: hp('5%'),

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#7e1d6c',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  descriptionContainer: {
    height: hp('5%'),
    marginHorizontal: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: '#ABABAB',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  inputMajorContainer: {
    height: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#adadad',
    borderRadius: 25,
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    paddingHorizontal: 20,
  },
  inputIconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 24,
    height: 24,
  },

  buttonMajorContainer: {
    height: hp('17%'),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forwordButton: {
    width: 200,
    height: 70,
    backgroundColor: COLOR.purple,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwordButtonText: {
    color: COLOR.white,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});
