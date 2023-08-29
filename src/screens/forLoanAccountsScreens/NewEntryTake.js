import {StatusBar, StyleSheet, Text, View, ToastAndroid} from 'react-native';
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
import moment from 'moment';
const NewEntryTake = ({navigation, route}) => {
  const [amount, setAmount] = useState();
  const [itemName, setItemName] = useState();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState();

  const handleImagePicker = () => {
    setIsVisibleModal(true);
  };

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image picker was canceled');
      } else if (response.error) {
        console.error('Image picker error: ', response.error);
      } else {
        console.log('Selected image:', response.assets[0].uri);
        // You can do something with the selected image URI here
      }
      setImage(response.assets[0].uri);
      setFileName(response.assets[0].fileName);
    });
    setIsVisibleModal(false);
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Image picker was canceled');
      } else if (response.error) {
        console.error('Image picker error: ', response.error);
      } else {
        console.log('Selected image:', response.assets[0].uri);
        // You can do something with the selected image URI here
      }

      setImage(response.assets[0].uri);
      setFileName(response.assets[0].fileName);
    });
    setIsVisibleModal(false);
  };

  const saveData = url => {
    ToastAndroid.show(
      'Uploading data, please wait a moment.',
      ToastAndroid.LONG,
    );
    const formattedDate = moment().format('YYYY-MM-DD');
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Transactions')
      .doc(route.params.id)
      .collection('Transaction')
      .doc()
      .set({
        givenAmount: null,
        itemName: itemName,
        photo: url,
        takenAmount: amount,
        date: formattedDate,
      })
      .then(() => {
        navigation.goBack();
      });
  };

  const uploadImage = async () => {
    if (image) {
      const reference = storage().ref(fileName);
      // path to existing file on filesystem
      const pathToFile = image;
      // uploads file
      await reference.putFile(pathToFile);
      const url = await storage().ref(fileName).getDownloadURL();
      saveData(url);
    } else {
      saveData(null); // Pass null to saveData if no image is added
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
        title={'Take'}
      />
      <View style={styles.amountInputContainer}>
        <CostomInputField
          value={amount}
          placeholder={'Add Amount'}
          ChangeText={text => {
            setAmount(text);
          }}
          imgSource={require('../../assets/icons/dollar.png')}
        />
      </View>
      <Text style={styles.optional}>Optional</Text>
      <View style={styles.itemNameInputContainer}>
        <CostomInputField
          value={itemName}
          placeholder={'Enter Item Name'}
          ChangeText={text => {
            setItemName(text);
          }}
          imgSource={require('../../assets/icons/notes.png')}
        />
      </View>
      {/* Add Image Button */}
      <View style={styles.addImageButtonContainer}>
        <CostomButton title={'Add Image'} onClick={handleImagePicker} />
      </View>
      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <CostomButton title={'Save'} onClick={uploadImage} />
      </View>

      <ModelView
        isVisibleModal={isVisibleModal}
        firstOption={'Open Camera'}
        secondOption={'Open Gallery'}
        onClickClose={() => setIsVisibleModal(false)}
        onClickFirstOption={openCamera}
        onClickSecondOption={openGallery}
        firstIcon={require('../../assets/icons/camera.png')}
        secondIcon={require('../../assets/icons/gallery.png')}
      />
    </View>
  );
};

export default NewEntryTake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  amountInputContainer: {
    marginTop: 10,
  },
  optional: {
    marginLeft: 25,
    marginTop: 15,
    fontSize: 12,
  },
  addImageButtonContainer: {
    marginTop: 40,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 50,
  },
});
