import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CircleButton from './CircleButton';

const Header = ({
  screenTitle,
  selectAlbum,
  circleButton,
  circleButtonHandler,
  activeAlbumNumber,
  setIsVisibleModal,
  setIsVisibleModalContacts,
  filter,
  filterValue,
}) => {
  return (
    <View
      style={[
        styles.root,
        {
          justifyContent:
            selectAlbum || filter === true ? 'space-between' : 'flex-start',
        },
      ]}>
      {circleButton === true && (
        <CircleButton goBack={() => circleButtonHandler()} />
      )}
      <Text
        style={[
          styles.headerText,
          {color: screenTitle === 'Gallery' ? '#fff' : '#000'},
        ]}>
        {screenTitle}
      </Text>
      {selectAlbum === true && (
        <View style={styles.titleBlock}>
          <TouchableOpacity onPress={() => setIsVisibleModal(true)}>
            <Text style={styles.title}>Select album</Text>
          </TouchableOpacity>
          <Text style={styles.titleCircle}>{activeAlbumNumber + 1}</Text>
        </View>
      )}
      {filter === true && (
        <View style={styles.titleBlockContacts}>
          {filterValue !== 'gender' && (
            <CircleButton goBack={() => circleButtonHandler()} crossOn={true} />
          )}
          <TouchableOpacity onPress={() => setIsVisibleModalContacts(true)}>
            <Text style={styles.titleContacts}>{filterValue}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 31,
    paddingBottom: 10,
    paddingRight: 10,
    width: '100%',
  },
  headerText: {
    paddingLeft: 10,
    fontSize: 35,
    color: '#0A0A0A',
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginRight: 5,
    color: '#00ADD3',
    fontSize: 26,
    borderBottomColor: '#00ADD3',
  },
  titleBlockContacts: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleContacts: {
    width: 90,
    marginLeft: 5,
    marginRight: 5,
    color: '#0A0A0A',
    textAlign: 'right',
    fontSize: 26,
  },
  titleCircle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#00ADD3',
    color: '#fff',
    textAlign: 'center',
    fontSize: 26,
  },
});

export default Header;
