import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import COLOR from '../assets/colors/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
            <Image
              source={require('../assets/icons/profile-user.png')}
              style={styles.image}
            />
            <Text style={styles.name}>Name</Text>
          </View>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 0}]}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
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
            onPress={() => {}}>
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
