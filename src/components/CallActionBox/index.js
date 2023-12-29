import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallActionBox = ({onHangUp}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicroPhoneOn, setIsMicroPhoneOn] = useState(true);

  const onReverseCamera = () => {};
  const onToggeleCamera = () => {
    setIsCameraOn(currentValue => !currentValue);
  };
  const onToggleMicroPhone = () => {
    setIsMicroPhoneOn(currentValue => !currentValue);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="camera-reverse" size={30} color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggeleCamera} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isCameraOn ? 'camera-off' : 'camera'}
          size={30}
          color={'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleMicroPhone} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isMicroPhoneOn ? 'microphone-off' : 'microphone'}
          size={30}
          color={'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onHangUp}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialCommunityIcons name="phone-hangup" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#333333',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {backgroundColor: '#4a4a4a', padding: 10, borderRadius: 50},
});

export default CallActionBox;
