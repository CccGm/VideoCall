import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
import Iconics from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = route?.params?.user;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Iconics name="chevron-back" size={25} color="white" />
      </TouchableOpacity>

      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user.user_display_name}</Text>
        <Text style={styles.phoneNumber}>ringing +9 9987 986986 986</Text>
      </View>
      <CallActionBox />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {height: '100%', backgroundColor: '#5bd6a1'},
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {fontSize: 20, color: 'white'},
  buttonContainer: {
    backgroundColor: '#333333',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {backgroundColor: '#4a4a4a', padding: 10, borderRadius: 50},
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});

export default CallingScreen;
