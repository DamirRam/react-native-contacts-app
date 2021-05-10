import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import UserCard from '../components/UserCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalContactsScreen from '../screens/ModalContactsScreen';
import ModalPickerWindow from './ModalPickerScreenContacts';
import Header from '../components/Header';
import {
  fetchHandler,
  onSwipeLeft,
  onSwipeRight,
  pageDataHandle,
} from '../helpers.js';

const dataUsersUrl = 'https://randomuser.me/api/?results=10&_page=';

const Screen_1 = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [updatedData, setUpdatedData] = useState([]);
  const [outputData, setOutputData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [isVisibleContactsModal, setIsVisibleContactsModal] = useState(false);
  const [indexOfUser, setIndexOfUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isVisiblePickerModal, setIsVisiblePickerModal] = useState(false);
  const [filterValue, setFilterValue] = useState('gender');

  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    fetchHandler(
      dataUsersUrl,
      pageNumber,
      setData,
      setIsLoading,
      refresh,
      setRefresh,
    );
  }, [refresh, pageNumber]);

  useEffect(() => {
    const user = outputData[indexOfUser];
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

  const filterData = filterVal => {
    if (filterVal === 'gender') {
      setOutputData(updatedData);
    } else {
      const filteredData = updatedData.filter(
        item => item.gender === filterVal,
      );
      setOutputData(filteredData);
    }
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
        onSwipeLeft={() =>
          onSwipeLeft(outputData, indexOfUser, setIndexOfUser, 'contacts')
        }
        onSwipeRight={() =>
          onSwipeRight(indexOfUser, setIndexOfUser, 'contacts')
        }
      />
      <ModalPickerWindow
        isVisible={isVisiblePickerModal}
        setIsVisible={setIsVisiblePickerModal}
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
          onEndReached={() => pageDataHandle(pageNumber, setPageNumber)}
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
