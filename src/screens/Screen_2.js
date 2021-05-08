import React, {useState, useEffect, useRef} from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';

const secureObject = {
  login: 'admin',
  password: 'admin',
};

const Screen_2 = () => {
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const [animateInputState, setAnimateInputState] = useState(true);
  const animateInput = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    animateInput.current.animate('wobble', 600);
  }, [animateInputState]);

  const saveAutorized = async value => {
    try {
      await AsyncStorage.setItem('autorized', value);
    } catch (e) {
      console.log('async storage save error');
    }
  };

  const handleLogin = () => {
    if (
      login.toLowerCase() !== secureObject.login &&
      password.toLowerCase() !== secureObject.password
    ) {
      setTimeout(() => {
        alertHandler('Error', 'Please enter correct login and password');
      }, 1000);
      setAnimateInputState(!animateInputState);
      return;
    }
    if (login.toLowerCase() !== secureObject.login) {
      setTimeout(() => {
        alertHandler('Error', 'Please enter correct login');
      }, 1000);
      setAnimateInputState(!animateInputState);
      return;
    }
    if (password.toLowerCase() !== secureObject.password) {
      setTimeout(() => {
        alertHandler('Error', 'Please enter correct password');
      }, 1000);
      setAnimateInputState(!animateInputState);
      return;
    }
    if (
      login.toLowerCase() === secureObject.login &&
      password.toLowerCase() === secureObject.password
    ) {
      alertHandler('Succes', 'Sign in, please wait');
      saveAutorized(login, password);
      navigation.navigate('Gallery');
    }
  };

  const alertHandler = (title, message) =>
    Alert.alert(title, message, [{text: 'ОК'}]);

  return (
    <View style={styles.root}>
      <Header
        screenTitle="Log in"
        circleButton={true}
        circleButtonHandler={() => navigation.navigate('Contacts')}
      />
      <TouchableWithoutFeedback
        style={styles.rootBox}
        onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Animatable.View style={styles.scrollView} ref={animateInput}>
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
              onEndEditing={() => {
                Keyboard.dismiss();
                handleLogin();
              }}
            />
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootBox: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '90%',
  },
  input: {
    paddingLeft: 27,
    marginBottom: 19,
    height: 51,
    width: '100%',
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
