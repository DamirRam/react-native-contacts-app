import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ModalPhotoWindow from '../screens/ModalPhotoScreen';

const AlbumCard = ({imageUri, text, albumId}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <ModalPhotoWindow
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        imageUri={imageUri}
      />
      <View style={styles.albumContainer}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image style={styles.image} source={{uri: imageUri}} />
        </TouchableOpacity>
        <View style={styles.albumTextBlock}>
          <Text style={styles.description}>{text}</Text>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Album</Text>
            <Text style={styles.titleCircle}>{albumId}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    paddingTop: 13,
    paddingBottom: 13,
    marginBottom: 10,
    marginTop: 10,
    height: 'auto',
    width: 363,
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    zIndex: 2,
  },
  image: {
    alignSelf: 'center',
    width: '94%',
    height: 118,
  },
  albumTextBlock: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '94%',
    paddingTop: 9,
  },
  description: {
    flex: 3,
    color: '#fff',
    fontSize: 16,
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginRight: 5,
    color: '#00ADD3',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  titleCircle: {
    height: 21,
    width: 21,
    borderRadius: 11,
    backgroundColor: '#00ADD3',
    color: '#fff',
    textAlign: 'center',
  },
});

export default AlbumCard;
