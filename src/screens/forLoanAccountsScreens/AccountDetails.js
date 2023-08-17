import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import COLOR from '../../assets/colors/Color';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AccountDetails = ({route, navigation}) => {
  const [isTransactionAvalible, setIsTransactionAvalible] = useState(false);
  const [transactionList, setTransactionList] = useState([]); // Initial empty array of users
  const costumerID = route.params.id;
  useEffect(() => {
    const readTransactionList = () => {
      const subscriber = firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Transactions')
        .doc(route.params.id)
        .collection('Transaction')
        .onSnapshot(querySnapshot => {
          const users = [];

          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setTransactionList(users);
          setIsTransactionAvalible(true);
          console.log(transactionList);
          // if (contactList != []) {
          //   setContactAvalible(true);
          // }
        });
      return () => subscriber();
    };
    readTransactionList();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <Header
        leftIcon={require('../../assets/icons/left-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        title={route.params.name}
      />
      <View style={styles.accountSummary}>
        <View style={styles.accountDetailContainer}>
          <Text style={styles.accountDetailTitle}>To Take</Text>
          <Text style={styles.accountDetailAmount}>Rs 500</Text>
        </View>
        <View style={styles.accountDetailContainer}>
          <Text style={styles.accountDetailTitle}>To Give</Text>
          <Text style={styles.accountDetailAmount}>Rs 500</Text>
        </View>
      </View>
      {isTransactionAvalible ? (
        <View>
          <View style={styles.reminderContainer}>
            <View style={styles.reminderEachContainer}>
              <Text style={styles.reminderEachContainerTitle}>
                Remind via SMS
              </Text>
            </View>
            <View style={styles.reminderEachContainer}>
              <Text style={styles.reminderEachContainerTitle}>
                Remind via WhatsApp
              </Text>
            </View>
            <View style={styles.reminderEachContainer}>
              <Text style={styles.reminderEachContainerTitle}>
                Generate Report
              </Text>
            </View>
          </View>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsContainerDate}>Date</Text>
            <Text style={styles.itemDetailsContainerItemName}>Item Name</Text>
            <Text style={styles.itemDetailsContainerTake}>Take</Text>
            <Text style={styles.itemDetailsContainerGive}>Give</Text>
          </View>
          <FlatList
            data={transactionList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.flatListEachContainer}
                onPress={() =>
                  navigation.navigate('ItemDetailsLoanAccount', {data: item})
                }>
                <Text style={styles.itemDetailsContainerDate}>{item.date}</Text>
                <Text style={styles.itemDetailsContainerItemName}>
                  {item.itemName}
                </Text>
                {item.takenAmount !== null ? (
                  <Text style={styles.itemDetailsContainerTake}>
                    Rs {item.takenAmount}
                  </Text>
                ) : (
                  <Text style={styles.itemDetailsContainerTake}></Text>
                )}

                {item.givenAmount !== null ? (
                  <Text style={styles.itemDetailsContainerGive}>
                    Rs {item.givenAmount}
                  </Text>
                ) : (
                  <Text style={styles.itemDetailsContainerGive}></Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.wellcomeNote}>
          <Text style={styles.wellcomeNoteText}>
            To initiate financial transactions with the customer, kindly utilize
            the{' '}
            <Text
              style={[
                styles.wellcomeNoteText,
                {fontSize: 18, color: COLOR.purple, fontWeight: '700'},
              ]}>
              "Take"
            </Text>{' '}
            button for receipt of funds and the{' '}
            <Text
              style={[
                styles.wellcomeNoteText,
                {fontSize: 18, color: COLOR.purple, fontWeight: '700'},
              ]}>
              "Give"
            </Text>{' '}
            button for disbursement of funds to the customer.
          </Text>
        </View>
      )}
      {/* Give and Take Buttons */}
      <TouchableOpacity
        style={styles.giveButton}
        onPress={() => {
          navigation.navigate('NewEntryGive', {id: route.params.id});
          console.log(costumerID);
        }}>
        <Text style={styles.giveButtonText}>Give</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.takeButton}
        onPress={() =>
          navigation.navigate('NewEntryTake', {id: route.params.id})
        }>
        <Text style={styles.takeButtonText}>Take</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
  reminderContainer: {
    height: 70,
    width: wp('100%'),
    backgroundColor: COLOR.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderEachContainer: {
    height: 50,
    width: 120,
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
  itemDetailsContainer: {
    height: 50,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemDetailsContainerDate: {
    width: '20%',
    height: '100%',
    paddingLeft: 5,
    textAlignVertical: 'center',
  },
  itemDetailsContainerItemName: {
    width: '40%',
    height: '100%',
    textAlignVertical: 'center',
    paddingLeft: 10,
  },
  itemDetailsContainerTake: {
    width: '20%',
    height: '100%',
    textAlignVertical: 'center',
    paddingLeft: 5,
  },
  itemDetailsContainerGive: {
    width: '20%',
    height: '100%',
    textAlignVertical: 'center',
    paddingLeft: 5,
    paddingRight: 10,
  },
  giveButton: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    height: 50,
    width: 160,
    backgroundColor: COLOR.purple,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giveButtonText: {
    color: COLOR.pink,
    fontSize: 18,
    fontWeight: '700',
  },
  takeButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    height: 50,
    width: 160,
    backgroundColor: COLOR.pink,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeButtonText: {
    color: COLOR.purple,
    fontSize: 18,
    fontWeight: '700',
  },
  flatListEachContainer: {
    height: 60,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLOR.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: COLOR.boldGray,
  },
});
