import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
  Pressable,
  PermissionsAndroid,
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
import SendSMS from 'react-native-sms';
import ModelView from '../../components/ModelView';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
const AccountDetails = ({route, navigation}) => {
  const [isTransactionAvalible, setIsTransactionAvalible] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [totalTakenAmount, setTotalTakenAmount] = useState(0);
  const [totalGivenAmount, setTotalGivenAmount] = useState(0); // Initial empty array of users
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isMenuCalled, setIsMenuCalled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const costumerID = route.params.id;
  useEffect(() => {
    const readTransactionList = () => {
      const subscriber = firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Transactions')
        .doc(route.params.id)
        .collection('Transaction')
        .orderBy('date', 'desc')
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
  }, []);

  const makePhoneCall = phoneNumber => {
    const phoneNumberWithCountryCode = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberWithCountryCode).catch(error =>
      console.error('Error making phone call: ', error),
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

  // Generate PDF
  const formattedDate = moment().format('YYYY-MM-DD');
  const generatePDFhandler = async () => {
    setIsLoading(true);
    try {
      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              header, footer {
                height: 50px;
                background-color: #fff;
                color: #000;
                display: flex;
                justify-content: center;
                padding: 0 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>${route.params.name}</h1>
            </header>
            <h1>Account Detail</h1>
            <table>
              <tr>
                <th>Costomer Name</th>
                <td>${route.params.name}</td> 
              </tr>
              <tr>
                <th>Download Date</th>
                <td>${formattedDate}</td>
              </tr>
              <tr>
                <th>Total Taken Amount</th>
                <td>Rs ${totalTakenAmount}</td>
              </tr>
              <tr>
                <th>Total Given Amount</th>
                <td>Rs ${totalGivenAmount}</td>
              </tr>
            </table>
            <h1>Transaction List</h1>
            <table>
              <tr>
                <th>Date</th>
                <th>Item Name</th>
                <th>Taken Amount</th>
                <th>Given Amount</th>
              </tr>
              ${transactionList
                .map(
                  line => `
                <tr>
                  <td>${line.date}</td>
                  <td>${line.itemName}</td>
                  <td>${line.takenAmount}</td>
                  <td>${line.givenAmount}</td>
                </tr>
              `,
                )
                .join('')}
            </table>
            <footer>
              <p>Thank you for your business!</p>
            </footer>
          </body>
        </html>
      `;
      const options = {
        html,
        fileName: `invoice_${count}`,
        directory: 'Invoices',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
      setCount(count + 1);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const generateEXCELhandler = async () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(transactionList);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission needed',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const filePath = RNFS.ExternalDirectoryPath + '/my_exported_file.xlsx';
        await RNFS.writeFile(filePath, wbout, 'ascii');
        console.log('File saved at:', filePath);
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.log('Error while requesting permission or writing file:', error);
    }
  };

  const deleteAllTransactions = async () => {
    const userUid = auth().currentUser.uid;
    const customerId = route.params.id;

    try {
      const transactionSnapshot = await firestore()
        .collection('Users')
        .doc(userUid)
        .collection('Transactions')
        .doc(customerId)
        .collection('Transaction')
        .get();

      const batch = firestore().batch();

      transactionSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      console.log('All transactions deleted!');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting transactions:', error);
    }
  };
  const deleteCostomerButton = async () => {
    const userUid = auth().currentUser.uid;
    const customerId = route.params.id;

    try {
      const transactionSnapshot = await firestore()
        .collection('Users')
        .doc(userUid)
        .collection('Transactions')
        .doc(customerId)
        .collection('Transaction')
        .get();

      const batch = firestore().batch();

      transactionSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Contacts')
        .doc(route.params.id)
        .delete()
        .then(() => {
          console.log('User deleted!');
          navigation.replace('BottomNavigator');
          console.log(route.params.id);
        });
    } catch (error) {
      console.error('Error deleting transactions:', error);
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
        title={route.params.name}
        rightIcon={require('../../assets/icons/dots.png')}
        onClickRightIcon={() => {
          setIsMenuCalled(true);
        }}
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
              onPress={() => {
                makePhoneCall(route.params.number);
              }}>
              <Text style={styles.reminderEachContainerTitle}>
                Remind via Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reminderEachContainer}
              onPress={sendWhatsAppMessage(
                route.params.number,
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
                onPress={() => {
                  navigation.navigate('ItemDetailsLoanAccount', {
                    data: item,
                    id: route.params.id,
                  });
                }}>
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
        onClickFirstOption={generatePDFhandler}
        onClickSecondOption={generateEXCELhandler}
        firstIcon={require('../../assets/icons/pdf.png')}
        secondIcon={require('../../assets/icons/excel.png')}
      />
      <ModelView
        isVisibleModal={isMenuCalled}
        firstOption={'Delete all Transactions'}
        secondOption={'Delete Costumer'}
        onClickClose={() => setIsVisibleModal(false)}
        onClickFirstOption={deleteAllTransactions}
        onClickSecondOption={deleteCostomerButton}
        firstIcon={require('../../assets/icons/delete.png')}
        secondIcon={require('../../assets/icons/remove-user.png')}
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
    borderWidth: 0.5,
    borderColor: COLOR.boldGray,
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
    color: 'red',
  },
  itemDetailsContainerGive: {
    width: '20%',
    height: '100%',
    textAlignVertical: 'center',
    paddingLeft: 5,
    paddingRight: 10,
    color: 'green',
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
