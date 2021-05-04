import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import CircleButton from '../components/CircleButton';

const ModalWindow = ({
  isVisibleContactsModal,
  setIsVisibleContactsModal,
  currentUser,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={[
        styles.gestureStyle,
        {
          position: 'absolute',
          zIndex: isVisibleContactsModal ? 100 : -10,
          width: isVisibleContactsModal ? '100%' : 0,
          height: isVisibleContactsModal ? '100%' : 0,
          opacity: isVisibleContactsModal ? 0.8 : 0
        },
      ]}>
      <View style={styles.header}>
        <CircleButton goBack={() => setIsVisibleContactsModal(false)} />
        <Text style={styles.headerText}>Gallery</Text>
      </View>
      <View style={styles.modalScreen}>
        
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  gestureStyle: {
    backgroundColor: '#fff',
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 31,
    paddingBottom: 10,
    paddingRight: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 35,
    color: '#fff',
  },
});

export default ModalWindow;
