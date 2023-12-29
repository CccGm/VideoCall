import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Iconics from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';
import CallActionBox from '../../components/CallActionBox';

const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const voximplant = Voximplant.getInstance();
  const {user, call: incoming, isIncomingCall} = route?.params;
  const call = useRef(incoming);
  const endpoint = useRef(null);

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoSteramId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoSteramId] = useState('');

  const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const onHangUpPress = () => {
    try {
      call.current.hangup();
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const recordAudio = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
      const camera = granted[PermissionsAndroid.PERMISSIONS.CAMERA];
      if (!camera || !recordAudio) {
        Alert.alert('Permission Not Granted');
      } else {
        setPermissionGranted(true);
      }
    };
    if (Platform.OS == 'android') {
      getPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      subscribeToCallEvents();
    };

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndPointEvent();
      call.current.answer(callSettings);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showError(callEvent.reason);
      });

      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        // showError(callEvent.reason);
        setCallStatus('Calling...');
      });

      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        // showError(callEvent.reason);
        setCallStatus('Connected');
      });

      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        // showError(callEvent.reason);
        navigation.navigate('Contacts');
      });

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoSteramId(callEvent.videoStream.id);
        },
      );

      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndPointEvent();
      });
    };

    const subscribeToEndPointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endPointEvent => {
          setRemoteVideoSteramId(endPointEvent.videoStream.id);
        },
      );
    };

    const showError = reason => {
      Alert.alert('call failed', `Reason: ${reason}`, [
        {
          text: 'OK',
          onPress: navigation.navigate('Contacts'),
        },
      ]);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      try {
        call.current.off(Voximplant.CallEvents.Failed);
        call.current.off(Voximplant.CallEvents.ProgressToneStart);
        call.current.off(Voximplant.CallEvents.Connected);
        call.current.off(Voximplant.CallEvents.Disconnected);
      } catch (error) {
        console.log('error', error);
      }
    };
  }, [permissionGranted]);

  return (
    <View style={styles.page}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Iconics name="chevron-back" size={25} color="white" />
      </TouchableOpacity>

      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
      />

      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
      />

      {callStatus == 'Connected' ? null : (
        <View style={styles.cameraPreview}>
          <Text style={styles.name}>{user?.user_display_name}</Text>
          <Text style={styles.phoneNumber}>{callStatus}</Text>
        </View>
      )}
      <CallActionBox onHangUp={onHangUpPress} />
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
  localVideo: {
    backgroundColor: '#ffff6e',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    bottom: 30,
  },
  remoteVideo: {
    backgroundColor: '#7b4e80',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: '50%',
  },
});

export default CallingScreen;
