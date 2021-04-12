import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ModalWindow = ({isVisible, setIsVisible, activeAlbumIndex, setActiveAlbumIndex, asyncHandler, dataAlbum}) => {

    return (
      <Modal 
      visible={isVisible}
      animationType='fade'
      transparent
      >
        <View style={styles.modalScreen}>
          <View style={styles.modalInner}>
            <Picker
              selectedValue={dataAlbum[activeAlbumIndex].value}
              onValueChange={(itemValue, itemIndex) =>{
                setIsVisible(false)
                setActiveAlbumIndex(itemIndex)
                asyncHandler(itemValue)
                }
              }
              mode='dropdown'
              dropdownIconColor='#fff'
              style={styles.pickerBox}>
              {
                dataAlbum.map((item) => {
                  return (<Picker.Item 
                    style={styles.pickerText} 
                    label={item.title} 
                    value={item.value}
                   />)
                })
              }
            </Picker>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      opacity: 0.8
    },
    modalInner: {
      width: 363,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      borderWidth: 1,
      borderColor: '#444444',
      borderRadius: 15,
      overflow: 'hidden'
    },
    pickerBox: {
      width: 250,
      height: 220
    },
    pickerText: {
        color: '#fff',
        backgroundColor: '#000',
        borderColor: '#444',
        borderWidth: 1
    }
})

export default ModalWindow;