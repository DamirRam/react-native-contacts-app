import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const TapBar = ({navigation, state}) => {
  if (state?.index === 1) {
    return null;
  }

  return (
    <View style={styles.root}>
      {state?.routes.map(item => (
        <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
          <Text style={styles.text}>{item.name.toUpperCase()}</Text>
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
