import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import arrow from '../assets/img/arrow.png';
import cross from '../assets/img/cross.png';

const CircleButton = ({goBack, crossOn}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.circle} onPress={() => goBack()}>
        {crossOn ? (
          <Image style={styles.image} source={cross} />
        ) : (
          <Image style={styles.image} source={arrow} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00ADD3',
  },
  image: {
    height: 27,
    width: 12,
    resizeMode: 'contain',
  },
});

export default CircleButton;
