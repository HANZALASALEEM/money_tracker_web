import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../assets/colors/Color';
import Header from '../components/Header';
import CostomInputField from '../components/CostomInputField';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {db} from '../firebase/Index';
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import CostomButton from '../components/CostomButton';

const ContactList = ({route, navigation}) => {
  const {contacts, onSelectContact} = route.params;
  const [search, setSearch] = useState();
  // useEffect(() => {
  //   const sortedContacts = contacts.sort((a, b) =>
  //     a.displayName.localeCompare(b.displayName),
  //   );
  // }, []);
  const [searchedList, setSearchedList] = useState(contacts);

  const filterData = text => {
    let newData = contacts.filter(item => {
      return item.displayNam.toLowerCase().match(text.toLowerCase());
    });
    setSearchedList(newData);
  };

  const handleContactsButton = async item => {
    try {
      const chatRef = doc(collection(db, 'Chats'), 'person');
      const messagesRef = collection(chatRef, 'messages');

      await addDoc(messagesRef, {
        Name: item.displayName,
        PhoneNumber: item.phoneNumbers[0].number,
      });

      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/icons/left-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.inputFieldView}>
        <CostomInputField
          value={search}
          placeholder={'Search Costumer'}
          imgSource={require('../assets/icons/find.png')}
          ChangeText={text => {
            setSearch(text);
            filterData(text);
          }}
        />
      </View>
      <View style={styles.contactListTagContainer}>
        <Text>ContactList</Text>
      </View>
      <FlatList
        data={searchedList}
        keyExtractor={contacts.recordID}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.eachContactContainer}
              onPress={item => handleContactsButton(item)}>
              <View style={styles.contactInfoContainer}>
                {!item.thumbnailPath == '' ? (
                  <Image
                    //source={require('../assets/icons/profile-user.png')}
                    style={styles.icon}
                    source={{uri: item.thumbnailPath}}
                  />
                ) : (
                  <Image
                    source={require('../assets/icons/profile-user.png')}
                    style={styles.icon}
                    // source={{uri: item.thumbnailPath}}
                  />
                )}

                <View>
                  <Text style={styles.contactName}>{item.displayName}</Text>
                  <Text>{item.phoneNumbers[0].number}</Text>
                </View>
                <Text style={styles.contactLable}>
                  {item.phoneNumbers[0].label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <CostomButton />
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  inputFieldView: {
    marginVertical: 14,
  },
  contactListTagContainer: {
    width: wp('100%'),
    height: 30,
    backgroundColor: COLOR.darkGray,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  eachContactContainer: {
    width: wp('100%'),
    height: 60,
    borderWidth: 0.5,
    backgroundColor: COLOR.lightGray,

    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: COLOR.boldGray,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactLable: {
    right: 4,
    position: 'absolute',
  },
});
