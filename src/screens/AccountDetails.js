import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import COLOR from '../assets/colors/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AccountDetails = ({route}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.purple} />
      <Header
        leftIcon={require('../assets/icons/left-arrow.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        title={route.params.name}
      />
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
      <View style={styles.reminderContainer}>
        <View style={styles.reminderEachContainer}>
          <Text style={styles.reminderEachContainerTitle}>Remind via SMS</Text>
        </View>
        <View style={styles.reminderEachContainer}>
          <Text style={styles.reminderEachContainerTitle}>
            Remind via WhatsApp
          </Text>
        </View>
        <View style={styles.reminderEachContainer}>
          <Text style={styles.reminderEachContainerTitle}>Generate Report</Text>
        </View>
      </View>
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
});
