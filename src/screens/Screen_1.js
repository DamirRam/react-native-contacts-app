import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, View, FlatList} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import UserCard from '../components/UserCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalContactsScreen from '../screens/ModalContactsScreen';
import ModalPickerWindow from './ModalPickerScreenContacts';
import Header from '../components/Header';

const dataUsersUrl = 'https://randomuser.me/api/?results=10&_page=';

const Screen_1 = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isVisibleContactsModal, setIsVisibleContactsModal] = useState(false);
  const [indexOfUser, setIndexOfUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isVisiblePickerModal, setIsVisiblePickerModal] = useState(false);
  const [filterValue, setFilterValue] = useState('gender');

  const [updatedData, setUpdatedData] = useState([]);
  const [outputData, setOutputData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    fetchHandler(dataUsersUrl, pageNumber);
  }, [refresh, pageNumber]);

  useEffect(() => {
    const user = updatedData[indexOfUser];
    if (!isLoading) {
      const userData = {
        username: `${user?.name.title} ${user?.name.first} ${user?.name.last}`,
        phone: user?.phone,
      };
      setCurrentUser(userData);
    }
  }, [indexOfUser]);

  useEffect(() => {
    if (pageNumber === 1) {
      setUpdatedData(data);
    } else {
      setUpdatedData(updatedData.concat(data));
    }
  }, [data]);

  useEffect(() => {
    filterData(filterValue);
  }, [updatedData, filterValue]);

  const pageHandle = () => {
    if (pageNumber < 5) {
      setPageNumber(pageNumber + 1);
    } else {
      null;
    }
  };

  const filterData = filterValue => {
    if (filterValue === 'gender') {
      setOutputData(updatedData);
    } else {
      const filteredData = updatedData.filter(
        item => item.gender === filterValue,
      );
      setOutputData(filteredData);
    }
  };

  const fetchHandler = (url, page) => {
    fetch(url + page)
      .then(response => response.json())
      .then(responseJson => setData(responseJson.results))
      .catch(error => {
        setIsLoading(false);
        AlertHandler(error);
      })
      .finally(() => setIsLoading(false));
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

  const contactsModalOpenHandle = index => {
    setIndexOfUser(index);
    setIsVisibleContactsModal(true);
    navigationState.setHideTapBar(true);
  };

  const contactsModalCloseHandle = () => {
    setIsVisibleContactsModal(false);
    navigationState.setHideTapBar(false);
  };

  const onSwipeLeft = () => {
    const dataLength = updatedData.length - 1;
    if (indexOfUser < dataLength) {
      setIndexOfUser(indexOfUser + 1);
    }
    if (indexOfUser === dataLength) {
      Alert.alert('Message', 'This is the end of the contacts.', [
        {text: 'ОК'},
      ]);
    }
  };

  const onSwipeRight = () => {
    if (indexOfUser > 0) {
      setIndexOfUser(indexOfUser - 1);
    }
    if (indexOfUser === 0) {
      Alert.alert('Message', 'This is the beginning of the contacts.', [
        {text: 'ОК'},
      ]);
    }
  };

  const renderCard = ({item, index}) => {
    return (
      <UserCard
        data={item}
        index={index}
        contactsModalOpenHandle={contactsModalOpenHandle}
      />
    );
  };

  return (
    <>
      <ModalContactsScreen
        isVisibleContactsModal={isVisibleContactsModal}
        contactsModalCloseHandle={contactsModalCloseHandle}
        currentUser={currentUser}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <ModalPickerWindow
        isVisible={isVisiblePickerModal}
        setIsVisible={setIsVisiblePickerModal}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        filterData={filterData}
      />
      <View style={styles.container}>
        {isLoading && <LoadingIndicator />}
        <Header
          screenTitle="Contacts"
          filter={true}
          setIsVisibleModalContacts={setIsVisiblePickerModal}
          filterValue={filterValue}
          circleButtonHandler={() => setFilterValue('gender')}
        />
        <FlatList
          data={outputData}
          renderItem={renderCard}
          extraData={outputData}
          keyExtractor={(item, index) => index}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={styles.flatlist}
          onEndReachedThreshold="0.9"
          onEndReached={() => pageHandle()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatlist: {
    height: 70,
  },
});

export default Screen_1;
