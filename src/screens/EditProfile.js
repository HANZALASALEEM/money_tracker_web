import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../assets/colors/Color';
import Header from '../components/Header';
import CostomInputField from '../components/CostomInputField';
import CostomButton from '../components/CostomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModelView from '../components/ModelView';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const EditProfile = ({navigation}) => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [image, setImage] = useState(null);
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

  const userId = uuid.v4();
  const saveData = url => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .update({
        name: name,
        photo: url,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const uploadImage = async () => {
    const reference = storage().ref(fileName);
    // path to existing file on filesystem
    const pathToFile = image;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage().ref(fileName).getDownloadURL();
    saveData(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <Header
        leftIcon={require('../assets/icons/left-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        title={'Edit Profile'}
      />
      <Text style={styles.instruction}>
        Please upload your Photo, Name and Mobile number
      </Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePicker}>
        {image !== null ? (
          <Image
            source={{uri: image}}
            style={[styles.imageContainer, {resizeMode: 'center'}]}
          />
        ) : (
          <Image
            source={require('../assets/icons/image.png')}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <CostomInputField
          value={name}
          placeholder={'Name'}
          ChangeText={text => {
            setName(text);
          }}
          imgSource={require('../assets/icons/profile-user.png')}
        />
        {/* <CostomInputField
          value={number}
          placeholder={'Mobile No'}
          ChangeText={text => {
            setNumber(text);
          }}
          imgSource={require('../assets/icons/call.png')}
        /> */}
      </View>
      <View style={styles.buttonContainer}>
        <CostomButton title={'Save'} onClick={uploadImage} />
      </View>
      <ModelView
        isVisibleModal={isVisibleModal}
        firstOption={'Open Camera'}
        secondOption={'Open Gallery'}
        onClickClose={() => setIsVisibleModal(false)}
        onClickFirstOption={openCamera}
        onClickSecondOption={openGallery}
        firstIcon={require('../assets/icons/camera.png')}
        secondIcon={require('../assets/icons/gallery.png')}
      />
    </View>
  );
};

export default EditProfile;

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
    backgroundColor: COLOR.darkGray,
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
  buttonContainer: {
    marginTop: 70,
  },
});
