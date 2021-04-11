import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Alert
} from 'react-native';
import AlbumCard from '../components/albumCard';
import LoadingIndicator from '../components/loadingIndicator';

const dataUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=10';

const Screen_3 = () => { 
  const[data, setData] = useState([]);
  const[refresh, setRefresh] = useState(false);
  const[isLoading, setIsLoading] = useState (true);

  useEffect(
    () => {
      fetchHandler()
    },
    [refresh]
  )

  const fetchHandler = () => {
    fetch(dataUrl)
      .then(response => response.json())
      .then(responseJson => setData(responseJson))
      .catch((error) => {
        setIsLoading(false)
        AlertHandler(error)
      })
      .finally(() => setIsLoading(false))
  }
  console.log(data)
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
    <AlbumCard imageUri={item.thumbnailUrl} text={item.title} albumId={item.albumId}/>
  );

  return (
  <View style={styles.root}>
    {
    (isLoading) &&
    <LoadingIndicator />
    }
    <FlatList
      data={data}
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
