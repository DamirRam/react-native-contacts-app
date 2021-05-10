import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, BackHandler} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AlbumCard from '../components/AlbumCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalPickerWindow from './ModalPickerScreen';
import ModalPhotoWindow from '../screens/ModalPhotoScreen';
import Header from '../components/Header';
import {dataAlbum} from '../dataAlbum';
import {
  asyncHandler,
  pageDataHandle,
  onSwipeLeft,
  onSwipeRight,
} from '../helpers';

const Screen_3 = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [isVisiblePickerModal, setIsVisiblePickerModal] = useState(false);

  const [isVisiblePhotoModal, setIsVisiblePhotoModal] = useState(false);
  const [indexOfImage, setIndexOfImage] = useState(null);
  const [currentImageUri, setCurrentImageUri] = useState(null);

  const [updatedData, setUpdatedData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    asyncHandler(
      dataAlbum[activeAlbumIndex].url,
      pageNumber,
      setData,
      setIsLoading,
      refresh,
      setRefresh,
    );
  }, [refresh, pageNumber, activeAlbumIndex]);

  useEffect(() => {
    if (indexOfImage !== null) {
      setCurrentImageUri(updatedData[indexOfImage].thumbnailUrl);
    }
  }, [indexOfImage, isLoading]);

  useEffect(() => {
    if (pageNumber === 1) {
      setUpdatedData(data);
    } else {
      setUpdatedData(updatedData.concat(data));
    }
  }, [data]);

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

  const photoModalHandle = index => {
    setIndexOfImage(index);
    setIsVisiblePhotoModal(true);
  };

  const renderCard = ({item, index}) => (
    <AlbumCard
      imageUri={item.thumbnailUrl}
      text={item.title}
      albumId={activeAlbumIndex + 1}
      index={index}
      photoModalHandle={photoModalHandle}
    />
  );

  return (
    <View style={styles.root}>
      <Header
        screenTitle="Gallery"
        selectAlbum={true}
        activeAlbumNumber={activeAlbumIndex}
        setIsVisibleModal={setIsVisiblePickerModal}
      />
      <ModalPickerWindow
        isVisible={isVisiblePickerModal}
        setIsVisible={setIsVisiblePickerModal}
        activeAlbumIndex={activeAlbumIndex}
        setActiveAlbumIndex={setActiveAlbumIndex}
        setUpdatedData={setUpdatedData}
        setPageNumber={setPageNumber}
        setIsLoading={setIsLoading}
        dataAlbum={dataAlbum}
      />
      <ModalPhotoWindow
        isVisiblePhotoModal={isVisiblePhotoModal}
        setIsVisiblePhotoModal={setIsVisiblePhotoModal}
        currentImageUri={currentImageUri}
        onSwipeLeft={() =>
          onSwipeLeft(updatedData, indexOfImage, setIndexOfImage, 'gallery')
        }
        onSwipeRight={() =>
          onSwipeRight(indexOfImage, setIndexOfImage, 'gallery')
        }
      />
      {isLoading && <LoadingIndicator />}
      <FlatList
        data={updatedData}
        renderItem={renderCard}
        extraData={updatedData}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold="0.9"
        onEndReached={() => pageDataHandle(pageNumber, setPageNumber)}
      />
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
