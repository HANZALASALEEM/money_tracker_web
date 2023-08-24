import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLOR from '../assets/colors/Color';
import Header from '../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const CashInOut = ({navigation}) => {
  const [transactionList, setTransactionList] = useState([]);
  const [totalEarnedAmount, setTotalEarnedAmount] = useState(0);
  const [totalSpendAmount, setTotalSpendAmount] = useState(0);
  const [totalProfitAmount, setTotalProfitAmount] = useState(0); // Initial empty

  useEffect(() => {
    const readTransactionList = () => {
      const subscriber = firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('CashInOut')
        .orderBy('date', 'asc')
        .onSnapshot(querySnapshot => {
          const users = [];
          let totalEarn = 0;
          let totalSpend = 0;
          querySnapshot.forEach(documentSnapshot => {
            // To Calculate the sum of all Taken Amounts
            const earn = documentSnapshot.data().earnedAmount;
            if (documentSnapshot.data().earnedAmount === null) {
              totalEarn += 0;
            } else {
              totalEarn += parseFloat(earn);
            }

            // To Calculate the sum of all Given Amounts
            const spend = documentSnapshot.data().spendAmount;
            if (documentSnapshot.data().spendAmount === null) {
              totalSpend += 0;
            } else {
              totalSpend += parseFloat(spend);
            }

            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setTotalEarnedAmount(totalEarn);
          setTotalSpendAmount(totalSpend);
          setTotalProfitAmount(totalEarn - totalSpend);
          setTransactionList(users);

          console.log(transactionList);
        });
      return () => subscriber();
    };
    readTransactionList();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <Header title={'Cash In/Out'} />

      {/* Account Summary Container */}
      <View style={styles.accountSummary}>
        {totalEarnedAmount - totalSpendAmount < 0 ? (
          <View style={styles.accountDetailContainer}>
            <Text style={styles.accountDetailTitle}>Total Loss</Text>
            <Text style={[styles.accountDetailAmount, {color: 'red'}]}>
              Rs {totalSpendAmount - totalEarnedAmount}
            </Text>
          </View>
        ) : (
          <View style={styles.accountDetailContainer}>
            <Text style={styles.accountDetailTitle}>Total Profit</Text>
            <Text style={[styles.accountDetailAmount, {color: 'green'}]}>
              Rs {totalEarnedAmount - totalSpendAmount}
            </Text>
          </View>
        )}

        <View style={styles.accountDetailContainer}>
          <Text style={styles.accountDetailTitle}>Earned</Text>
          <Text style={styles.accountDetailAmount}>Rs {totalEarnedAmount}</Text>
        </View>
        <View style={styles.accountDetailContainer}>
          <Text style={styles.accountDetailTitle}>Spend</Text>
          <Text style={styles.accountDetailAmount}>Rs {totalSpendAmount}</Text>
        </View>
      </View>
      {/* Item Detail Bar */}
      {transactionList.length !== 0 ? (
        <View>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsContainerDate}>Date</Text>
            <Text style={styles.itemDetailsContainerItemName}>Item Name</Text>
            <Text style={styles.itemDetailsContainerTake}>Earned</Text>
            <Text style={styles.itemDetailsContainerGive}>Spend</Text>
          </View>
          <FlatList
            data={transactionList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.flatListEachContainer}
                onPress={() =>
                  navigation.navigate('ItemDetailsCashInOut', {data: item})
                }>
                <Text style={styles.itemDetailsContainerDate}>{item.date}</Text>
                <Text style={styles.itemDetailsContainerItemName}>
                  {item.itemName}
                </Text>
                {item.earnedAmount !== null ? (
                  <Text
                    style={[
                      styles.itemDetailsContainerTake,
                      {color: COLOR.purple},
                    ]}>
                    Rs {item.earnedAmount}
                  </Text>
                ) : (
                  <Text style={styles.itemDetailsContainerTake}></Text>
                )}

                {item.spendAmount !== null ? (
                  <Text style={styles.itemDetailsContainerGive}>
                    Rs {item.spendAmount}
                  </Text>
                ) : (
                  <Text style={styles.itemDetailsContainerGive}></Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View></View>
      )}

      {/* Give and Take Buttons */}
      <TouchableOpacity
        style={styles.earnedButton}
        onPress={() => {
          navigation.navigate('NewEntryEarned');
        }}>
        <Text style={styles.earnedButtonText}>Earned</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.spendButton}
        onPress={() => navigation.navigate('NewEntrySpend')}>
        <Text style={styles.spendButtonText}>Spend</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CashInOut;

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
    width: '32%',
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
    paddingRight: 5,
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
  earnedButton: {
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
  earnedButtonText: {
    color: COLOR.pink,
    fontSize: 18,
    fontWeight: '700',
  },
  spendButton: {
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
  spendButtonText: {
    color: COLOR.purple,
    fontSize: 18,
    fontWeight: '700',
  },
});
