import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../components/Header';

const ModalWindow = ({
  isVisiblePhotoModal,
  setIsVisiblePhotoModal,
  currentImageUri,
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
          zIndex: isVisiblePhotoModal ? 10 : -10,
          width: isVisiblePhotoModal ? '100%' : 0,
          height: isVisiblePhotoModal ? '100%' : 0,
          opacity: isVisiblePhotoModal ? 1 : 0,
        },
      ]}>
      <Header
        screenTitle="Gallery"
        circleButton={true}
        circleButtonHandler={() => setIsVisiblePhotoModal(false)}
      />
      <View style={styles.modalScreen}>
        <Image style={styles.image} source={{uri: currentImageUri}} />
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  gestureStyle: {
    backgroundColor: '#000',
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
    backgroundColor: '#000',
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 35,
    color: '#fff',
  },
});

export default ModalWindow;
