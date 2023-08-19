import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../assets/colors/Color';
import Header from '../../components/Header';
import CostomInputField from '../../components/CostomInputField';
import CostomButton from '../../components/CostomButton';
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
const ItemDetailsLoanAccount = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [amount, setAmount] = useState();
  const [itemName, setItemName] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    setImage(route.params.data.photo);
    setItemName(route.params.data.itemName);
    {
      route.params.data.givenAmount !== null
        ? setAmount(route.params.data.givenAmount)
        : setAmount(route.params.data.takenAmount);
    }
    setDate(route.params.data.date);
  }, []);

  const deleteButton = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Transactions')
        .doc(route.params.id)
        .collection('Transaction')
        .where('photo', '==', image)
        .where('itemName', '==', itemName)
        .where('date', '==', date)
        .get();
      if (querySnapshot.docs.length === 1) {
        const documentSnapshot = querySnapshot.docs[0];
        await documentSnapshot.ref.delete();
        console.log('Document deleted successfully');
        navigation.goBack(); // Navigate back after deletion or perform any other action you need
      } else {
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error deleting document: ', error);
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
      <View style={styles.imageMajorContainer}>
        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image
              source={{uri: image}}
              style={[styles.imageContainer, {resizeMode: 'stretch'}]}
            />
          ) : (
            <Image
              source={require('../../assets/icons/image.png')}
              style={styles.icon}
            />
          )}
        </View>
      </View>
      <View style={styles.itemNameInputContainer}>
        <CostomInputField
          value={itemName}
          placeholder={'Item Name'}
          ChangeText={text => {
            setItemName(text);
          }}
          imgSource={require('../../assets/icons/notes.png')}
        />
      </View>
      <View style={styles.amountInputContainer}>
        <CostomInputField
          value={amount}
          placeholder={'Amount'}
          ChangeText={text => {
            setAmount(text);
          }}
          imgSource={require('../../assets/icons/dollar.png')}
        />
      </View>

      {/* Save Button */}
      <View style={styles.deleteButtonContainer}>
        <CostomButton title={'Delete'} onClick={deleteButton} />
      </View>
    </View>
  );
};

export default ItemDetailsLoanAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  imageMajorContainer: {
    marginTop: 30,
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
    // marginTop: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemNameInputContainer: {
    marginTop: 20,
  },
  amountInputContainer: {
    marginTop: 10,
  },
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 50,
  },
});
