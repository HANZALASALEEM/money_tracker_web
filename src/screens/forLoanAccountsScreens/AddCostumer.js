import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../assets/colors/Color';
import Header from '../../components/Header';
import CostomInputField from '../../components/CostomInputField';
import CostomButton from '../../components/CostomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModelView from '../../components/ModelView';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
const AddCostumer = ({navigation}) => {
  const [name, setName] = useState();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [id, setId] = useState();
  // const [fileName, setFileName] = useState();

  // const saveData = () => {
  //   firestore()
  //     .collection('Users')
  //     .doc(auth().currentUser.uid)
  //     .collection('Contacts')
  //     .doc()
  //     .set({
  //       name: name,
  //       id: id,
  //     })
  //     .then(() => {
  //       console.log('User added!');
  //     });
  // };

  const [idWarning, setIdWarning] = useState('');
  const [fileName, setFileName] = useState('');

  const checkAndSaveData = async () => {
    if (!id || id.length !== 4) {
      setIdWarning('ID must be 4 digits long');
      return;
    }

    const userRef = firestore().collection('Users').doc(auth().currentUser.uid);
    const contactsRef = userRef.collection('Contacts');

    // Check if the provided ID already exists for the current user
    const snapshot = await contactsRef.where('id', '==', id).get();

    if (!snapshot.empty) {
      setIdWarning('ID already exists');
    } else {
      // Add the customer data since the ID is unique
      await contactsRef.add({
        name: name,
        id: id,
      });

      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <Header
        leftIcon={require('../../assets/icons/left-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.instruction}>Please Enter Customer Name</Text>
      {/* <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePicker}>
        {image !== null ? (
          <Image
            source={{uri: image}}
            style={[styles.imageContainer, {resizeMode: 'center'}]}
          />
        ) : (
          <Image
            source={require('../../assets/icons/image.png')}
            style={styles.icon}
          />
        )}
      </TouchableOpacity> */}
      <View style={styles.inputContainer}>
        <CostomInputField
          value={name}
          placeholder={'Add Costumer Name'}
          ChangeText={text => {
            setName(text);
          }}
          imgSource={require('../../assets/icons/profile-user.png')}
        />
        <CostomInputField
          value={id}
          placeholder={'Add Costumer ID'}
          ChangeText={text => {
            setId(text);
          }}
          imgSource={require('../../assets/icons/id.png')}
        />
        <Text style={styles.idWarning}>{idWarning}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CostomButton title={'Add Costumer'} onClick={checkAndSaveData} />
      </View>
      {/* <ModelView
        isVisibleModal={isVisibleModal}
        firstOption={'Open Camera'}
        secondOption={'Open Gallery'}
        onClickClose={() => setIsVisibleModal(false)}
        onClickFirstOption={openCamera}
        onClickSecondOption={openGallery}
        firstIcon={require('../../assets/icons/camera.png')}
        secondIcon={require('../../assets/icons/gallery.png')}
      /> */}
    </View>
  );
};

export default AddCostumer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  instruction: {
    color: COLOR.darkGray,
    marginVertical: 21,
    alignSelf: 'center',
  },
  imageContainer: {
    width: 270,
    height: 130,
    backgroundColor: COLOR.lightGray,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1.3,
    borderColor: COLOR.boldGray,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  inputContainer: {
    marginTop: 40,
  },
  idWarning: {
    marginLeft: 35,
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 70,
  },
});
