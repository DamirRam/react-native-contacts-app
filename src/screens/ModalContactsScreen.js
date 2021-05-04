import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
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
          zIndex: isVisibleContactsModal ? 10 : -10,
          width: isVisibleContactsModal ? '100%' : 0,
          height: isVisibleContactsModal ? '100%' : 0,
          opacity: isVisibleContactsModal ? 0.8 : 0,
        },
      ]}>
      <View style={styles.header}>
        <CircleButton goBack={() => setIsVisibleContactsModal(false)} />
      </View>
      <View style={styles.modalScreen}>
        <View style={styles.mainIco} />
        <Text style={styles.mainName}>{currentUser.username}</Text>
        <Text style={styles.mainPhone}>Phone: {currentUser.phone}</Text>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  gestureStyle: {
    backgroundColor: '#fff',
    position: 'absolute',
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 298,
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
