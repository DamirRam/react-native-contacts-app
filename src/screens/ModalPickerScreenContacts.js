import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ModalWindow = ({
  isVisible,
  setIsVisible,
  filterValue,
  setFilterValue,
  filterData,
}) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalScreen}>
        <View style={styles.modalInner}>
          <Picker
            selectedValue={filterValue}
            onValueChange={itemValue => {
              setIsVisible(false);
              setFilterValue(itemValue);
              filterData(itemValue);
            }}
            mode="dropdown"
            dropdownIconColor="#000"
            style={styles.pickerBox}>
            <Picker.Item style={styles.pickerText} label="male" value="male" />
            <Picker.Item
              style={styles.pickerText}
              label="female"
              value="female"
            />
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  modalInner: {
    width: 363,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    overflow: 'hidden',
  },
  pickerBox: {
    width: 250,
    height: 120,
  },
  pickerText: {
    color: '#000',
    fontSize: 18,
    backgroundColor: '#fff',
    borderColor: '#444',
    borderWidth: 1,
  },
});

export default ModalWindow;
