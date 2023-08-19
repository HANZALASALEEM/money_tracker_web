import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/colors/Color';
import CostomInputField from '../components/CostomInputField';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import Drawer from '../components/Drawer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const LoanAccounts = ({navigation}) => {
  const [contactsAvalible, setContactAvalible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [user, setUser] = useState({}); // Initialize an empty user object
  const [contactList, setContactList] = useState([]); // Initial empty array of users
  useEffect(() => {
    const readUserProfile = async () => {
      const userSnapshot = await firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get();

      if (userSnapshot.exists) {
        // Check if the document exists
        const userData = userSnapshot.data(); // Access data from the document
        setUser(userData);
      }
    };
    readUserProfile();

    const readContactList = () => {
      const subscriber = firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Contacts')
        .onSnapshot(querySnapshot => {
          const users = [];

          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setContactList(users);
          setContactAvalible(true);
          console.log(contactList);
          if (contactList.length !== 0) {
            setContactAvalible(true);
          }
        });
      return () => subscriber();
    };
    readContactList();
  }, []);

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
            // const sortedContacts = contacts.sort((a, b) =>
            //   a.displayName.localeCompare(b.displayName),
            // );
            navigation.navigate('ContactList', {contacts});
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };

  const openEditProfile = () => {
    navigation.navigate('EditProfile');
    setIsVisibleModal(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setIsVisibleModal(true);
          }}>
          <Image
            source={require('../assets/icons/menu.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        {user.name === null ? (
          <Text style={styles.userName}>{user.number}</Text>
        ) : (
          <Text style={styles.userName}>{user.name}</Text>
        )}

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
      {!contactsAvalible ? (
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
        </View>
      ) : (
        <View style={styles.afterContactsContainer}>
          <View style={styles.accountSummary}>
            <View style={styles.accountDetailContainer}>
              <Text style={styles.accountDetailTitle}>Leny hn</Text>
              <Text style={styles.accountDetailAmount}>Rs 500</Text>
            </View>
            <View style={styles.accountDetailContainer}>
              <Text style={styles.accountDetailTitle}>Deny hn</Text>
              <Text style={styles.accountDetailAmount}>Rs 500</Text>
            </View>
          </View>
          <FlatList
            data={contactList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.flatListEachContainer}
                onPress={() => {
                  navigation.navigate('AccountDetails', {
                    name: item.name,
                    id: item.id,
                  });
                }}>
                <Image
                  source={require('../assets/icons/profile-user.png')}
                  style={styles.flatListIcon}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {/* Add Contacts Button */}
      <TouchableOpacity style={styles.addContactsButton} onPress={getContacts}>
        <Image
          source={require('../assets/icons/add.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* <View style={styles.addContactsButton}></View> */}
      <Drawer
        isVisibleModal={isVisibleModal}
        firstOption={'Edit Profile'}
        secondOption={'About us'}
        onClickClose={() => setIsVisibleModal(false)}
        onClickFirstOption={openEditProfile}
        onClickSecondOption={() => {}}
        firstIcon={require('../assets/icons/profile-purple.png')}
        secondIcon={require('../assets/icons/info.png')}
        navigation={navigation}
      />
    </View>
  );
};

export default LoanAccounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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

  afterContactsContainer: {
    width: wp('100%'),
    height: hp('70%'),
  },
  accountSummary: {
    height: 100,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('95%'),
    alignSelf: 'center',
  },
  accountDetailContainer: {
    height: 70,
    width: 180,
    backgroundColor: COLOR.darkGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountDetailTitle: {
    fontSize: 16,
    color: COLOR.purple,
    marginBottom: 5,
  },
  accountDetailAmount: {},
  flatListEachContainer: {
    height: 60,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLOR.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLOR.boldGray,
  },
  flatListIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 15,
  },
});
