import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const Screen_2 = ({changeScreen}) => {
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          onChangeText={changeLogin}
          value={login}
          placeholder={'Enter your Login'}
        />
        <TextInput
          style={styles.input}
          onChangeText={changePassword}
          value={password}
          placeholder={'Enter your Password'}
          secureTextEntry
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => changeScreen(2)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 27,
    marginBottom: 19,
    height: 51,
    width: '90%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C0C1C1',
    fontSize: 16,
    color: '#C0C1C1',
  },
  button: {
    width: 265,
    height: 51,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#00ADD3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Screen_2;
