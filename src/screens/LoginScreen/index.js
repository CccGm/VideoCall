import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Voximplant} from 'react-native-voximplant';
import {useNavigation} from '@react-navigation/native';
import {ACC_NAME, APP_NAME} from '../../Constance';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPasseord] = useState('');

  const client = Voximplant.getInstance();
  const navigation = useNavigation();

  useEffect(() => {
    async function connect() {
      try {
        let state = await client.getClientState();
        if (state === Voximplant.ClientState.DISCONNECTED) {
          await client.connect();
        } else if (state === Voximplant.ClientState.LOGGED_IN) {
          redirectHome();
        }
      } catch (e) {
        console.log(e.name + e.message);
      }
    }
    connect();
  }, []);
  const signIn = async () => {
    const fqUserName = `${userName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;

    try {
      const data = await client.login(fqUserName, password);
      redirectHome();
    } catch (error) {
      Alert.alert('AuthResult', 'ErrorCode  ' + error.code);
    }
  };

  const redirectHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Contacts',
        },
      ],
    });
  };

  return (
    <View style={Styles.page}>
      <TextInput
        placeholder="userName"
        value={userName}
        onChangeText={setUserName}
        style={Styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPasseord}
        style={Styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={Styles.button} onPress={signIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default LoginScreen;
