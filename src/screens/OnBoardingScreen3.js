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

const OnBoardingScreen3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      {/* 5% screen height with skip button */}
      <View style={styles.skipContainer}></View>
      {/* 50% screen height with image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/onBoarding3.png')}
          style={styles.image}
        />
      </View>
      {/* 5% screen height with Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Safe your Money</Text>
      </View>
      {/* 15% screen height with Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Your financial records are safe with us. Our app ensures 100% backup,
          preserving your money-related data, providing peace of mind and
          reliability for all your loan tracking needs.
        </Text>
      </View>
      {/* 5% screen height with Dots */}
      <View style={styles.DotsMajorContainer}>
        <View style={styles.DotsSideSpace} />
        <View style={styles.DotsContainer}>
          <View style={styles.nonSelectedDotsContainer} />
          <View style={styles.nonSelectedDotsContainer} />
          <View style={styles.selectedDot} />
        </View>
        <View style={styles.DotsSideSpace} />
      </View>
      {/* 20% screen height with forword button */}
      <View style={styles.buttonMajorContainer}>
        <TouchableOpacity
          style={styles.forwordButton}
          onPress={() => {
            navigation.navigate('OTPScreen');
          }}>
          <Text style={styles.forwordButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipContainer: {
    height: '5%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  skipContainerText: {
    color: '#e1e1e1',
    fontSize: 20,
    left: Dimensions.get('screen').width - 60,
  },
  imageContainer: {
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    height: '5%',

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
    height: '15%',
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
    height: '5%',

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
    height: '20%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forwordButton: {
    width: 200,
    height: 70,
    backgroundColor: '#7e1d6c',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwordButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});
