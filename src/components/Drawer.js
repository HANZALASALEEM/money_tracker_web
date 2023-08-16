import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLOR from '../assets/colors/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Drawer = ({
  isVisibleModal,
  firstOption,
  onClickFirstOption,
  secondOption,
  onClickSecondOption,
  onClickClose,
  firstIcon,
  secondIcon,
  navigation,
}) => {
  const [user, setUser] = useState({}); // Initialize an empty user object

  useEffect(() => {
    const readUserProfile = async () => {
      const userSnapshot = await firestore()
        .collection('Profile')
        .doc(auth().currentUser.uid)
        .get();

      if (userSnapshot.exists) {
        // Check if the document exists
        const userData = userSnapshot.data(); // Access data from the document
        setUser(userData);
      }
    };
    readUserProfile();
  }, []);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('SignUp');
  };
  return (
    <Modal visible={isVisibleModal} transparent>
      <View style={styles.mainView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtnView}
            onPress={() => onClickClose()}>
            <Image
              source={require('../assets/icons/close-purple.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {user.photo === null ? (
              <Image
                source={require('../assets/icons/profile-user.png')}
                style={styles.image}
              />
            ) : (
              <Image source={{uri: user.photo}} style={styles.image} />
            )}
            {user.name === null ? (
              <Text style={styles.name}></Text>
            ) : (
              <Text style={styles.name}>{user.name}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 0}]}
            onPress={() => onClickFirstOption()}>
            <Image source={firstIcon} style={styles.icon} />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 0}]}
            onPress={() => onClickSecondOption()}>
            <Image source={secondIcon} style={styles.icon} />
            <Text style={styles.btnText}>{secondOption}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.logOut, {marginTop: 0}]}
            onPress={signOut}>
            <Image source={secondIcon} style={styles.icon} />
            <Text style={styles.btnText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalView: {
    backgroundColor: 'white',
    height: hp('75%'),
    top: 0,
    position: 'absolute',
    width: '70%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 18,
    marginTop: 5,
  },
  btn: {
    height: 70,
    width: '90%',
    alignSelf: 'center',

    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 15,
  },
  closeBtnView: {
    position: 'absolute',
    right: 25,
    top: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  logOut: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
});
