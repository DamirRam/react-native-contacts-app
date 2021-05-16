import {Alert} from 'react-native';
export const fetchHandler = (
  url,
  page,
  setData,
  setIsLoading,
  refresh,
  setRefresh,
) => {
  fetch(url + page)
    .then(response => response.json())
    .then(responseJson => setData(responseJson.results))
    .catch(error => {
      setIsLoading(false);
      alertRequestHandler(error, refresh, setRefresh);
    })
    .finally(() => setIsLoading(false));
};

export const asyncHandler = async (
  url,
  page,
  setData,
  setIsLoading,
  refresh,
  setRefresh,
) => {
  try {
    const response = await fetch(url + page);
    const albums = await response.json();
    setData(albums);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    alertRequestHandler(error, refresh, setRefresh);
  }
};

export const onSwipeLeft = (
  outputData,
  indexOfSlide,
  setIndexOfSlide,
  title,
) => {
  const dataLength = outputData.length - 1;
  if (indexOfSlide < dataLength) {
    setIndexOfSlide(indexOfSlide + 1);
  }
  if (indexOfSlide === dataLength) {
    Alert.alert('Message', `This is the end of the ${title}.`, [{text: 'ОК'}]);
  }
};

export const onSwipeRight = (indexOfSlide, setIndexOfSlide, title) => {
  if (indexOfSlide > 0) {
    setIndexOfSlide(indexOfSlide - 1);
  }
  if (indexOfSlide === 0) {
    Alert.alert('Message', `'This is the beginning of the ${title}.`, [
      {text: 'ОК'},
    ]);
  }
};

export const pageDataHandle = (pageNumber, setPageNumber) => {
  if (pageNumber < 5) {
    setPageNumber(pageNumber + 1);
  } else {
    null;
  }
};

export const alertHandler = (title, message) =>
  Alert.alert(title, message, [{text: 'ОК'}]);

const alertRequestHandler = (error, refresh, setRefresh) => {
  Alert.alert(`${error}`, 'Resend the request?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => setRefresh(!refresh)},
  ]);
};

