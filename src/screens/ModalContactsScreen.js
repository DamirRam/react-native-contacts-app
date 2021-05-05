import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../components/Header';

const ModalWindow = ({
  isVisibleContactsModal,
  contactsModalCloseHandle,
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
          opacity: isVisibleContactsModal ? 0.9 : 0,
        },
      ]}>
      <Header
        circleButton={true}
        circleButtonHandler={() => contactsModalCloseHandle()}
      />
      <View style={styles.modalScreen}>
        <Text style={styles.mainName}>{currentUser.username}</Text>
        <Text style={styles.mainPhone}>Phone: {currentUser.phone}</Text>
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
  mainPhone: {
    fontSize: 16,
    fontWeight: '400',
    color: '#00add3',
  },
  mainName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#00add3',
  },
});

export default ModalWindow;
