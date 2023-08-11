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

const ModelView = ({
  isVisibleModal,
  firstOption,
  onClickFirstOption,
  secondOption,
  onClickSecondOption,
  onClickClose,
  firstIcon,
  secondIcon,
}) => {
  return (
    <Modal visible={isVisibleModal} transparent>
      <View style={styles.mainView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtnView}
            onPress={() => onClickClose()}>
            <Image
              source={require('../assets/icons/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 60}]}
            onPress={() => onClickFirstOption()}>
            <Image source={firstIcon} style={styles.icon} />
            <Text style={styles.btnText}>{firstOption}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {marginTop: 0}]}
            onPress={() => onClickSecondOption()}>
            <Image source={secondIcon} style={styles.icon} />
            <Text style={styles.btnText}>{secondOption}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModelView;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalView: {
    backgroundColor: 'white',
    height: 283,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  btn: {
    height: 70,
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: COLOR.boldGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: COLOR.boldGray,
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
});
