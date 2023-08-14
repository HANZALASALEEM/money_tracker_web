import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/colors/Color';
const OnBoardingScreen2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      {/* 5% screen height with skip button */}
      <View style={styles.skipContainer}></View>
      {/* 50% screen height with image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/onBoarding2.png')}
          style={styles.image}
        />
      </View>
      {/* 5% screen height with Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Track your Loan</Text>
      </View>
      {/* 15% screen height with Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Track your loans effortlessly with our user-friendly app. Stay
          informed about payment schedules, outstanding balances, and repayment
          progress, all in one convenient platform.
        </Text>
      </View>
      {/* 5% screen height with Dots */}
      <View style={styles.DotsMajorContainer}>
        <View style={styles.DotsSideSpace} />
        <View style={styles.DotsContainer}>
          <View style={styles.nonSelectedDotsContainer} />
          <View style={styles.selectedDot} />
          <View style={styles.nonSelectedDotsContainer} />
        </View>
        <View style={styles.DotsSideSpace} />
      </View>
      {/* 20% screen height with forword button */}
      <View style={styles.buttonMajorContainer}>
        {/* 60% screen width with Empty space */}
        <View style={styles.buttonSideSpace} />
        {/* 40% screen width with Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.forwordButton}
            onPress={() => {
              navigation.navigate('OnBoardingScreen3');
            }}>
            <Image
              source={require('../assets/icons/right-arrow.png')}
              style={styles.forwordButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
    height: hp('15%'),
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
  DotsMajorContainer: {
    height: hp('5%'),

    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  DotsSideSpace: {
    width: '40%',

    height: '100%',
  },
  DotsContainer: {
    height: '100%',
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedDot: {
    height: 10,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#7e1d6c',
  },
  nonSelectedDotsContainer: {
    height: 6,
    width: 14,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
  },
  buttonMajorContainer: {
    height: hp('17%'),
    width: '100%',

    flexDirection: 'row',
  },
  buttonSideSpace: {
    width: '60%',
    height: '100%',
  },
  buttonContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwordButton: {
    width: 70,
    height: 70,
    backgroundColor: '#7e1d6c',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwordButtonIcon: {
    height: 24,
    width: 24,
  },
});
