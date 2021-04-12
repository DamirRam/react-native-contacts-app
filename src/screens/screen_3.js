import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Alert
} from 'react-native';
import AlbumCard from '../components/albumCard';
import LoadingIndicator from '../components/loadingIndicator';
import ModalWindow from './modalScreen';
import {dataAlbum} from '../dataAlbum'

const Screen_3 = ({isVisibleModal, setIsVisibleModal, activeAlbumIndex, setActiveAlbumIndex}) => { 
  const[data, setData] = useState([]);
  const[refresh, setRefresh] = useState(false);
  const[isLoading, setIsLoading] = useState (true);

  useEffect(
    () => {
      asyncHandler(dataAlbum[activeAlbumIndex].value)
    },
    [refresh]
  )

  const asyncHandler = async (url) => {
    try {
      const response = await fetch(url)
      const albums = await response.json()
      setData(albums)
      setIsLoading(false) 
    } catch (error) {
      setIsLoading(false)
      AlertHandler(error)
    }
    
  }

  const AlertHandler = (error) =>{
    Alert.alert(
      `${error}`,
      "Resend the request?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setRefresh(!refresh) }
      ]
    );
  }
  
  const renderCard = ({ item }) => (
    <AlbumCard 
    imageUri={item.thumbnailUrl} 
    text={item.title} 
    albumId={activeAlbumIndex+1}/>
  );

  return (
  <View style={styles.root}>
    <ModalWindow 
    isVisible={isVisibleModal} 
    setIsVisible={setIsVisibleModal}
    activeAlbumIndex={activeAlbumIndex}
    setActiveAlbumIndex={setActiveAlbumIndex}
    asyncHandler={asyncHandler}
    dataAlbum={dataAlbum}
    />
    {
    (isLoading) &&
    <LoadingIndicator />
    }
    <FlatList
      data={data}
      renderItem={renderCard}
    />
  </View>  
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000'
  }
});

export default Screen_3;
