import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../assets/colors/Color';
import Header from '../../components/Header';
import CostomInputField from '../../components/CostomInputField';
import CostomButton from '../../components/CostomButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CostomViewField from '../../components/CostomViewField';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ItemDetailsLoanAccount = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [amount, setAmount] = useState();
  const [itemName, setItemName] = useState();
  const [date, setDate] = useState();
  const costumerNumber = route.params.costumerNumber;
  const costumerName = route.params.costumerName;
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

  const sendWhatsAppMessage = (phoneNumber, message) => {
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, ''); // Remove spaces
    const whatsappUrl = `https://wa.me/${phoneNumberWithoutSpaces}?text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(whatsappUrl).catch(err =>
      console.error('Error opening WhatsApp:', err),
    );
  };

  const deleteButton = async () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Transactions')
      .doc(route.params.id)
      .collection('Transaction')
      .doc(route.params.data.key)
      .delete()
      .then(() => {
        console.log('User deleted!');
        navigation.goBack();
        console.log(route.params.id);
      });
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
        <CostomViewField
          title={itemName}
          imgSource={require('../../assets/icons/notes.png')}
        />
      </View>
      <View style={styles.amountInputContainer}>
        <CostomViewField
          title={amount}
          imgSource={require('../../assets/icons/dollar.png')}
        />
      </View>
      <View style={styles.amountInputContainer}>
        <CostomViewField
          title={date}
          imgSource={require('../../assets/icons/date.png')}
        />
      </View>

      <View style={styles.reminderContainer}>
        <TouchableOpacity
          style={styles.reminderEachContainer}
          onPress={() => {}}>
          <Text style={styles.reminderEachContainerTitle}>Remind via SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reminderEachContainer}
          onPress={() => {
            let message;
            if (route.params.data.givenAmount !== null) {
              message = `I provided ${costumerName} with Rs ${route.params.data.takenAmount}. Kindly process the return at your earliest convenience.`;
            } else {
              message = `${costumerName} has provided me with Rs ${route.params.data.givenAmount}. Please be prepared to receive the funds back as soon as possible.`;
            }

            sendWhatsAppMessage(costumerNumber, message);
          }}>
          <Text style={styles.reminderEachContainerTitle}>
            Remind via WhatsApp
          </Text>
        </TouchableOpacity>
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
    marginTop: 20,
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
    marginTop: 10,
  },
  amountInputContainer: {
    marginTop: 10,
  },
  reminderContainer: {
    marginTop: 10,
    height: 60,
    width: wp('100%'),
    backgroundColor: COLOR.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reminderEachContainer: {
    height: 50,
    width: '45%',
    backgroundColor: COLOR.darkGray,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderEachContainerTitle: {
    fontSize: 14,
    color: COLOR.purple,
    fontWeight: '900',
  },
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 50,
  },
});
