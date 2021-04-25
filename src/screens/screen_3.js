import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, Alert, BackHandler} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AlbumCard from '../components/AlbumCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalWindow from './ModalScreen';
import Header from '../components/Header';
import {dataAlbum} from '../dataAlbum';

const Screen_3 = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    asyncHandler(dataAlbum[activeAlbumIndex].value);
  }, [refresh]);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const onBackPress = () => {
    navigation.popToTop();
  };

  const asyncHandler = async url => {
    try {
      const response = await fetch(url);
      const albums = await response.json();
      setData(albums);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      AlertHandler(error);
    }
  };

  const AlertHandler = error => {
    Alert.alert(`${error}`, 'Resend the request?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setRefresh(!refresh)},
    ]);
  };

  const renderCard = ({item}) => (
    <AlbumCard
      imageUri={item.thumbnailUrl}
      text={item.title}
      albumId={activeAlbumIndex + 1}
    />
  );

  return (
    <View style={styles.root}>
      <Header
        screenTitle="Gallery"
        activeAlbumNumber={activeAlbumIndex}
        setIsVisibleModal={setIsVisibleModal}
      />
      <ModalWindow
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        activeAlbumIndex={activeAlbumIndex}
        setActiveAlbumIndex={setActiveAlbumIndex}
        setIsLoading={setIsLoading}
        asyncHandler={asyncHandler}
        dataAlbum={dataAlbum}
      />
      {isLoading && <LoadingIndicator />}
      <FlatList data={data} renderItem={renderCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default Screen_3;
