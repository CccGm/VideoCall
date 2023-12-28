import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import bg from '../../assets/images/backImage.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const IncomingCallScreen = () => {
  const onDecline = () => {};

  const onAccept = () => {};

  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <Text style={styles.name}>Incoming Screen</Text>
      <Text style={styles.phoneNumber}>WhatsApp Video...</Text>

      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" size={30} color={'white'} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="message1" size={30} color={'white'} />
          <Text style={styles.iconText}>Message me</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <TouchableOpacity onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" size={35} color={'white'} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: 'green'}]}>
            <Feather name="check" size={35} color={'white'} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  page: {height: '100%'},
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {fontSize: 20, color: 'white'},
  bg: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 20,
  },
  iconContainer: {alignItems: 'center', marginVerticalL: 20},
  iconText: {color: 'white', marginTop: 10},
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 60,
  },
});

export default IncomingCallScreen;
