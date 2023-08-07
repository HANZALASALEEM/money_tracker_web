import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/colors/Color';
import CostomInputField from '../components/CostomInputField';

const LoanAccounts = () => {
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
      <Text>LoanAccounts</Text>
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
});
