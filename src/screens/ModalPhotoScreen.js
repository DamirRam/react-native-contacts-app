import React from 'react';
import {Modal, View, Image, Text, StyleSheet} from 'react-native';
import CircleButton from '../components/CircleButton';

const ModalWindow = ({isVisible, setIsVisible, imageUri}) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.header}>
        <CircleButton goBack={() => setIsVisible(false)} />
        <Text style={styles.headerText}>Gallery</Text>
      </View>
      <View style={styles.modalScreen}>
        <Image style={styles.image} source={{uri: imageUri}} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
