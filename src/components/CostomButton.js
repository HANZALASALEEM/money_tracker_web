import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLOR from '../assets/colors/Color';

const CostomButton = () => {
  return (
    <View style={styles.container}>
      <Text>CostomButton</Text>
    </View>
  );
};

export default CostomButton;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    backgroundColor: COLOR.purple,
    position: 'absolute',
  },
});
