// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   StatusBar,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   TextInput,
// } from 'react-native';
// import React from 'react';

// const VerificationScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={'#fff'} />
//       {/* 5% screen height with skip button */}
//       <View style={styles.skipContainer}></View>
//       {/* 50% screen height with image */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={require('../assets/images/verification.png')}
//           style={styles.image}
//         />
//       </View>
//       {/* 5% screen height with Title */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Verification</Text>
//       </View>
//       {/* 5% screen height with Description */}
//       <View style={styles.descriptionContainer}>
//         <Text style={styles.description}>
//           Verify your number with the given OTP code
//         </Text>
//       </View>
//       {/* 15% screen height with Input Feild Container */}
//       <View style={styles.inputMajorContainer}>
//         <View style={styles.inputContainer}>
//           {/* 80% screen width with Input Feild */}
//           <TextInput style={styles.input} placeholder="OTP Code" />
//           <View style={styles.inputIconContainer}>
//             <Image
//               style={styles.inputIcon}
//               source={require('../assets/icons/password.png')}
//             />
//           </View>
//         </View>
//       </View>
//       {/* 20% screen height with forword button */}
//       <View style={styles.buttonMajorContainer}>
//         <TouchableOpacity
//           style={styles.forwordButton}
//           onPress={() => {
//             navigation.navigate('OnBoardingScreen2');
//           }}>
//           <Text style={styles.forwordButtonText}>Verify</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default VerificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   skipContainer: {
//     height: '5%',
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   skipContainerText: {
//     color: '#e1e1e1',
//     fontSize: 20,
//     left: Dimensions.get('screen').width - 60,
//   },
//   imageContainer: {
//     height: '50%',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   titleContainer: {
//     height: '5%',

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: '#7e1d6c',
//     fontSize: 25,
//     fontWeight: 'bold',
//     fontFamily: 'Roboto-Bold',
//   },
//   descriptionContainer: {
//     height: '5%',
//     marginHorizontal: 20,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   description: {
//     color: '#ABABAB',
//     fontSize: 14,
//     textAlign: 'center',
//     fontFamily: 'Roboto-Regular',
//   },
//   inputMajorContainer: {
//     height: '15%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     width: '90%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#adadad',
//     borderRadius: 25,
//     flexDirection: 'row',
//   },
//   input: {
//     width: '80%',
//     paddingHorizontal: 20,
//   },
//   inputIconContainer: {
//     width: '20%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputIcon: {
//     width: 24,
//     height: 24,
//   },

//   buttonMajorContainer: {
//     height: '20%',
//     width: '100%',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   forwordButton: {
//     width: 200,
//     height: 70,
//     backgroundColor: '#7e1d6c',
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   forwordButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontFamily: 'Roboto-Regular',
//   },
// });
import React from 'react';
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
import COLOR from '../assets/colors/Color';

const {width, height} = Dimensions.get('window');

const VerificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.white} />
      <View style={styles.skipContainer}></View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/verification.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Verification</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Verify your number with the given OTP code
        </Text>
      </View>
      <View style={styles.inputMajorContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="OTP Code" />
          <View style={styles.inputIconContainer}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/icons/password.png')}
            />
          </View>
        </View>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipContainer: {
    height: height * 0.05,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  skipContainerText: {
    color: '#e1e1e1',
    fontSize: 20,
    left: width - 60,
  },
  imageContainer: {
    height: height * 0.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#7e1d6c',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  descriptionContainer: {
    height: height * 0.05,
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: '#ABABAB',
    fontSize: width * 0.035,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  inputMajorContainer: {
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.9,
    height: height * 0.06,
    borderWidth: 1,
    borderColor: '#adadad',
    borderRadius: height * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
  },
  input: {
    flex: 1,
  },
  inputIconContainer: {
    width: height * 0.06,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: height * 0.04,
    height: height * 0.04,
  },
  buttonMajorContainer: {
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwordButton: {
    width: width * 0.4,
    height: height * 0.07,
    backgroundColor: '#7e1d6c',
    borderRadius: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwordButtonText: {
    color: '#ffffff',
    fontSize: width * 0.05,
    fontFamily: 'Roboto-Regular',
  },
});

export default VerificationScreen;
