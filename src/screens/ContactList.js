import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../assets/colors/Color';
import Header from '../components/Header';
import CostomInputField from '../components/CostomInputField';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CostomButton from '../components/CostomButton';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const ContactList = ({route, navigation}) => {
  const {contacts, onSelectContact} = route.params;
  const [search, setSearch] = useState();
  const [searchedList, setSearchedList] = useState(contacts);

  const filterData = text => {
    let newData = contacts.filter(item => {
      // return item.displayNam.toLowerCase().match(text.toLowerCase());
      return item.displayName.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedList(newData);
  };

  const userId = uuid.v4();
  const handleContactsButton = async item => {
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        name: item.displayName,
        number: item.phoneNumbers[0].number,
      })
      .then(() => {
        console.log('User added!');
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
        keyExtractor={item => item.recordID}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.eachContactContainer}
              onPress={() => handleContactsButton(item)}>
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
      <View style={styles.buttonContainer}>
        <CostomButton
          title={'Add Costumer'}
          onClick={() => {
            navigation.navigate('AddCostumer');
          }}
        />
      </View>
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
  buttonContainer: {
    bottom: 70,
  },
});
