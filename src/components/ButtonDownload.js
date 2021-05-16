import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ButtonDownload = ({buttonText, buttonHandle}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={buttonHandle}>
      <Text style={styles.buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 40,
    backgroundColor: '#00ADD3',
    borderRadius: 20,
  },
  buttonTextStyle: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});

export default ButtonDownload;
