import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/colors/Color';
import CostomInputField from '../components/CostomInputField';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';

const LoanAccounts = ({navigation}) => {
  const [contactsAvalible, setContactAvalible] = useState(false);
  const [contacts, setContacts] = useState([]);

  const getContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        Contacts.getAll()
          .then(contacts => {
            navigation.navigate('ContactList', {contacts});
            //console.log(contacts);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../assets/icons/menu.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>+923207409403</Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../assets/icons/profile.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
        <CostomInputField
          placeholder={'Search Costumer'}
          imgSource={require('../assets/icons/find.png')}
        />
      </View>
      {!contactsAvalible && (
        <View style={styles.wellcomeNote}>
          <Text style={styles.wellcomeNoteText}>
            To enhance your experience with the Loan Accounts Page, we invite
            you to utilize the convenient{' '}
            <Text
              style={[
                styles.wellcomeNoteText,
                {fontWeight: 'bold', fontSize: 18},
              ]}>
              "Add Contacts"
            </Text>{' '}
            feature. Simply locate and press the{' '}
            <Text
              style={[
                styles.wellcomeNoteText,
                {fontWeight: 'bold', color: COLOR.purple, fontSize: 22},
              ]}>
              "+"
            </Text>{' '}
            button on your screen to begin adding new contacts to your list.
            This functionality enables you to effortlessly manage and keep track
            of essential contacts, streamlining your loan-related interactions.
          </Text>
          {/* Add Contacts Button */}
          <TouchableOpacity
            style={styles.addContactsButton}
            onPress={getContacts}>
            <Image
              source={require('../assets/icons/add.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* <View style={styles.addContactsButton}></View> */}
    </View>
  );
};

export default LoanAccounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: COLOR.purple,
    width: wp('100%'),
    height: hp('8%'),

    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  userName: {
    fontSize: 20,
    width: '80%',
    color: COLOR.white,
    fontWeight: '600',
    fontFamily: 'Roboto-Bold',
  },
  banner: {
    backgroundColor: COLOR.purple,
    width: wp('100%'),
    height: hp('12%'),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wellcomeNote: {
    width: wp('95%'),
    height: hp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  wellcomeNoteText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLOR.boldGray,
  },
  addContactsButton: {
    backgroundColor: COLOR.purple,
    width: 70,
    height: 70,
    bottom: 5,
    position: 'absolute',
    right: 5,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
