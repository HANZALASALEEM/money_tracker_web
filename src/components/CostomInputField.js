import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import React from 'react';
import COLOR from '../assets/colors/Color';

const CostomInputField = ({ChangeText, value, placeholder, imgSource}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={text => ChangeText(text)}
        value={value}
        placeholder={placeholder}
      />
      <Image source={imgSource} style={styles.icon} />
    </View>
  );
};

export default CostomInputField;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: COLOR.lightGray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.darkGray,
  },
  input: {
    width: '90%',
    height: '100%',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
