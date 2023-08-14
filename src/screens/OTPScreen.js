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

// const OTPScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={'#fff'} />
//       {/* 5% screen height with skip button */}
//       <View style={styles.skipContainer}></View>
//       {/* 50% screen height with image */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={require('../assets/images/wellcome.png')}
//           style={styles.image}
//         />
//       </View>
//       {/* 5% screen height with Title */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Wellcome</Text>
//       </View>
//       {/* 5% screen height with Description */}
//       <View style={styles.descriptionContainer}>
//         <Text style={styles.description}>
//           Please enter your mobile No to get OTP verification
//         </Text>
//       </View>
//       {/* 15% screen height with Input Feild Container */}
//       <View style={styles.inputMajorContainer}>
//         <View style={styles.inputContainer}>
//           {/* 80% screen width with Input Feild */}
//           <TextInput style={styles.input} placeholder="Mobile No" />
//           <View style={styles.inputIconContainer}>
//             <Image
//               style={styles.inputIcon}
//               source={require('../assets/icons/phone-call.png')}
//             />
//           </View>
//         </View>
//       </View>
//       {/* 20% screen height with forword button */}
//       <View style={styles.buttonMajorContainer}>
//         <TouchableOpacity
//           style={styles.forwordButton}
//           onPress={() => {
//             navigation.navigate('VerificationScreen');
//           }}>
//           <Text style={styles.forwordButtonText}>Get OTP</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OTPScreen;

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
import React, {useState} from 'react';
//import {auth} from '../firebase/Index';
const {height, width} = Dimensions.get('window');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
const OTPScreen = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  console.log(confirm);

  async function signInWithPhoneNumber(phoneNumber) {
    if (auth) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } else {
      console.error('The "auth" property is missing or not properly imported.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      {/* 5% screen height with skip button */}
      <View style={styles.skipContainer}></View>
      {/* 50% screen height with image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/wellcome.png')}
          style={styles.image}
          resizeMode="contain" // Ensure the image scales properly
        />
      </View>
      {/* 5% screen height with Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Wellcome</Text>
      </View>
      {/* 5% screen height with Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Please enter your mobile No to get OTP verification
        </Text>
      </View>
      {/* 15% screen height with Input Field Container */}
      <View style={styles.inputMajorContainer}>
        <View style={styles.inputContainer}>
          {/* 80% screen width with Input Field */}
          <TextInput style={styles.input} placeholder="Mobile No" />
          <View style={styles.inputIconContainer}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/icons/call.png')}
              resizeMode="contain" // Ensure the icon scales properly
            />
          </View>
        </View>
      </View>
      {/* 20% screen height with forward button */}
      <View style={styles.buttonMajorContainer}>
        <TouchableOpacity
          style={styles.forwardButton}
          onPress={() => {
            navigation.navigate('VerificationScreen');
            signInWithPhoneNumber('+923207409403');
          }}>
          <Text style={styles.forwardButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;

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
    alignItems: 'center', // Center the image horizontally
    justifyContent: 'center', // Center the image vertically
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
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  descriptionContainer: {
    height: height * 0.05,
    marginHorizontal: width * 0.05, // Use a percentage for horizontal margin
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
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.9,
    height: 50,
    borderWidth: 1,
    borderColor: '#adadad',
    borderRadius: 25,
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    paddingHorizontal: width * 0.04, // Use a percentage for horizontal padding
  },
  inputIconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },

  buttonMajorContainer: {
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwardButton: {
    width: 200,
    height: 70,
    backgroundColor: '#7e1d6c',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwardButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});
