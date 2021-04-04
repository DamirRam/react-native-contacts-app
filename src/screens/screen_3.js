import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import AlbumCard from '../components/albumCard';
import {albumDATA} from '../albumData';

const Screen_3 = () => {
  const renderCard = ({ item }) => (
    <AlbumCard imageUri={item.image} text={item.text}/>
  );

  return (
  <View style={styles.root}>
     <FlatList
        data={albumDATA}
        renderItem={renderCard}
        style={styles.flatlist}
      />
  </View>  
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  flatlist: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default Screen_3;
