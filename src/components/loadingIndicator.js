import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      style={styles.activityIndicatorStyle}
      size="large"
      color="#00add3"
    />
  );
};

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 34,
    height: 34,
    transform: [{translateX: -17}, {translateY: -17}],
  },
});

export default LoadingIndicator;
