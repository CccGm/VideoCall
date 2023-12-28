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

const ContactsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContacts, setFilterContacts] = useState(dummyData);
  const navigation = useNavigation();

  useEffect(() => {
    const newContact = dummyData.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilterContacts(newContact);
  }, [searchTerm]);

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
            <Text style={styles.contactName}>{item.user_display_name}</Text>
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
