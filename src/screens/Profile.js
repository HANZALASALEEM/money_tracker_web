import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLOR from '../assets/colors/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CostomViewField from '../components/CostomViewField';
const Profile = ({navigation}) => {
  const [user, setUser] = useState({}); // Initialize an empty user object

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
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.emptySpace}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/left-arrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Image source={{uri: user.photo}} style={styles.image} />
        <View style={styles.viewFieldContainer}>
          <Text style={styles.heading}>Name</Text>
          <CostomViewField
            title={user.name}
            imgSource={require('../assets/icons/profile-user.png')}
          />
        </View>
        <Text style={styles.heading}>Mobile No</Text>
        <CostomViewField
          title={user.number}
          imgSource={require('../assets/icons/call.png')}
        />
        <Text style={styles.heading}>Email</Text>
        <CostomViewField
          title={user.email}
          imgSource={require('../assets/icons/email.png')}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.purple,
  },
  emptySpace: {
    height: hp('25%'),
  },
  backButton: {
    marginLeft: 15,
    marginTop: 15,
  },
  icon: {
    height: 24,
    width: 24,
  },
  details: {
    height: hp('72%'),
    backgroundColor: COLOR.white,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderRadius: 75,
    marginTop: -75,
  },
  viewFieldContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 30,
  },
});
