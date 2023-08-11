import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import COLOR from '../assets/colors/Color';

const CostomButton = ({title, onClick}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CostomButton;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    backgroundColor: COLOR.purple,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
  title: {
    fontSize: 18,
    color: COLOR.white,
    fontWeight: '700',
  },
});
