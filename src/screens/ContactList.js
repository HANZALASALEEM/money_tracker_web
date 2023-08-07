import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import COLOR from '../assets/colors/Color';
import Header from '../components/Header';
import CostomInputField from '../components/CostomInputField';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContactList = ({route}) => {
  const {contacts, onSelectContact} = route.params;
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.inputFieldView}>
        <CostomInputField
          placeholder={'Search Costumer'}
          imgSource={require('../assets/icons/find.png')}
        />
      </View>
      <View style={styles.contactListTagContainer}>
        <Text>ContactList</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={contacts.recordID}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.eachContactContainer}>
              <View style={styles.contactInfoContainer}>
                <Image
                  source={require('../assets/icons/profile-user.png')}
                  style={styles.icon}
                />
                <View>
                  <Text>{item.displayName}</Text>
                  <Text>{item.phoneNumbers[0].number}</Text>
                </View>
                <Text>{item.phoneNumbers[0].label}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    marginBottom: 9,
    paddingHorizontal: 10,
    borderRadius: 5,
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
  },
});
