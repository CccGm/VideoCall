import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import dummyData from '../../assets/data/Contects.json';
import {useNavigation} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';

const ContactsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContacts, setFilterContacts] = useState(dummyData);
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const newContact = dummyData.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilterContacts(newContact);
  }, [searchTerm]);

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });
    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  const callUser = user => {
    navigation.navigate('Calling', {user});
  };

  return (
    <View style={styles.page}>
      <TextInput
        placeholder="search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />
      <FlatList
        data={filterContacts}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => callUser(item)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <Text style={styles.contactName}>{item.user_display_name}</Text>
              <Text style={styles.contactName}>{item.password}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.seprator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {padding: 15, backgroundColor: 'white', flex: 1},
  contactName: {fontSize: 16, marginVertical: 10},
  seprator: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: 1,
    color: '#909109',
  },
  searchInput: {backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10},
});

export default ContactsScreen;
