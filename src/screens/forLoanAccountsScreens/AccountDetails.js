import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Linking,
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
import SmsAndroid from 'react-native-sms';
import {SMS} from 'react-native-sms';
import ModelView from '../../components/ModelView';

const AccountDetails = ({route, navigation}) => {
  const [isTransactionAvalible, setIsTransactionAvalible] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [totalTakenAmount, setTotalTakenAmount] = useState(0);
  const [totalGivenAmount, setTotalGivenAmount] = useState(0); // Initial empty array of users
  const [isVisibleModal, setIsVisibleModal] = useState(false);
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
          let totalTaken = 0;
          let totalGiven = 0;
          querySnapshot.forEach(documentSnapshot => {
            // To Calculate the sum of all Taken Amounts
            const taken = documentSnapshot.data().takenAmount;
            if (documentSnapshot.data().takenAmount === null) {
              totalTaken += 0;
            } else {
              totalTaken += parseFloat(taken);
            }

            // To Calculate the sum of all Given Amounts
            const given = documentSnapshot.data().givenAmount;
            if (documentSnapshot.data().givenAmount === null) {
              totalGiven += 0;
            } else {
              totalGiven += parseFloat(given);
            }

            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setTotalTakenAmount(totalTaken);
          setTotalGivenAmount(totalGiven);
          setTransactionList(users);

          console.log(transactionList);
          // if (contactList != []) {
          //   setContactAvalible(true);
          // }
        });
      return () => subscriber();
    };
    readTransactionList();
    // if (transactionList.length != 0) {
    //   setIsTransactionAvalible(true);
    // }
  }, []);

  const sendSMS = () => {
    SMS.send(
      {
        body: 'Hello from my React Native app!',
        recipients: ['+923207409403'], // Replace with the recipient's phone number
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS sent successfully');
        } else if (cancelled) {
          console.log('SMS sending cancelled');
        } else if (error) {
          console.error('Error sending SMS:', error);
        }
      },
    );
  };

  const sendWhatsAppMessage = (phoneNumber, message) => {
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, ''); // Remove spaces
    const whatsappUrl = `https://wa.me/${phoneNumberWithoutSpaces}?text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(whatsappUrl).catch(err =>
      console.error('Error opening WhatsApp:', err),
    );
  };

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
          <Text style={styles.accountDetailAmount}>Rs {totalTakenAmount}</Text>
        </View>
        <View style={styles.accountDetailContainer}>
          <Text style={styles.accountDetailTitle}>To Give</Text>
          <Text style={styles.accountDetailAmount}>Rs {totalGivenAmount}</Text>
        </View>
      </View>
      {transactionList.length !== 0 ? (
        <View>
          <View style={styles.reminderContainer}>
            <TouchableOpacity
              style={styles.reminderEachContainer}
              onPress={sendSMS}>
              <Text style={styles.reminderEachContainerTitle}>
                Remind via SMS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reminderEachContainer}
              onPress={sendWhatsAppMessage(
                '+923076315596',
                'Hello from my React Native app!',
              )}>
              <Text style={styles.reminderEachContainerTitle}>
                Remind via WhatsApp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reminderEachContainer}
              onPress={() => {
                setIsVisibleModal(true);
              }}>
              <Text style={styles.reminderEachContainerTitle}>
                Generate Report
              </Text>
            </TouchableOpacity>
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
      <ModelView
        isVisibleModal={isVisibleModal}
        firstOption={'Generate as PDF'}
        secondOption={'Generate as EXCEL'}
        onClickClose={() => setIsVisibleModal(false)}
        onClickFirstOption={() => {}}
        onClickSecondOption={() => {}}
        firstIcon={require('../../assets/icons/pdf.png')}
        secondIcon={require('../../assets/icons/excel.png')}
      />
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
