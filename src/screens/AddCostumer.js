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
const AddCostumer = ({navigation}) => {
  const [name, setName] = useState();

  const handleImagePicker = () => {
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
        console.log('Selected image:', response.uri);
        // You can do something with the selected image URI here
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <Header
        leftIcon={require('../assets/icons/left-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.instruction}>
        Please upload Costumer Photo and Name
      </Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePicker}>
        <Image
          source={require('../assets/icons/image.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <CostomInputField
          value={name}
          placeholder={'Add Costumer Name'}
          ChangeText={text => {
            setName(text);
          }}
          imgSource={require('../assets/icons/profile-user.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CostomButton title={'Add Costumer'} onClick={() => {}} />
      </View>
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
