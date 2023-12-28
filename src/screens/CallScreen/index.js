import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CallActionBox from '../../components/CallActionBox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}></View>

      <CallActionBox />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#5bd6a1'},
  cameraPreview: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#467978',
    position: 'absolute',
    right: 10,
    top: 100,
  },
});

export default CallScreen;
