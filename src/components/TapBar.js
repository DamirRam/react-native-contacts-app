import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppState} from '@react-native-community/hooks';

const TapBar = ({navigation, state}) => {
  const [isAutorized, setIsAutorized] = useState(false);
  const currentAppState = useAppState();

  useEffect(() => {
    getAutorized();
  });

  useEffect(() => {
    if (currentAppState === ('background' || 'inactive')) {
      removeAutorized();
    }
  }, [currentAppState]);

  const getAutorized = async () => {
    try {
      const value = await AsyncStorage.getItem('autorized');
      if (Boolean(value) === true) {
        setIsAutorized(true);
      }
    } catch (e) {}
  };

  const removeAutorized = async () => {
    try {
      await AsyncStorage.removeItem('autorized');
      if (isAutorized === true && state.index !== 0) {
        navigation.popToTop();
      }
      setIsAutorized(false);
    } catch (e) {}
  };

  const handleItem = (item, index) => {
    if (isAutorized && index === 1) {
      navigation.navigate('Log in', {screen: 'Gallery'});
    } else {
      navigation.navigate(item.name);
    }
  };

  if (state?.index === 1) {
    return null;
  }

  return (
    <View style={styles.root}>
      {state?.routes.map((item, index) => (
        <TouchableOpacity onPress={() => handleItem(item, index)}>
          <Text style={styles.text}>
            {isAutorized === true && index === 1
              ? 'gallery'.toUpperCase()
              : item.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 20,
    width: 265,
    height: 51,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#0A0A0A',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TapBar;
