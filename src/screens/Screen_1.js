import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, View, ScrollView} from 'react-native';
import UserCard from '../components/UserCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ModalContactsScreen from '../screens/ModalContactsScreen';
import Header from '../components/Header';

const dataUsersUrl = 'https://randomuser.me/api/?results=10';

const Screen_1 = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isVisibleContactsModal, setIsVisibleContactsModal] = useState(false);
  const [indexOfUser, setIndexOfUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchHandler();
  }, [refresh]);

  useEffect(() => {
    const user = data[indexOfUser];
    if (!isLoading) {
      const userData = {
        username: `${user?.name.title} ${user?.name.first} ${user?.name.last}`,
        phone: user?.phone,
      };
      setCurrentUser(userData);
    }
  }, [indexOfUser]);

  const fetchHandler = () => {
    fetch(dataUsersUrl)
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

  const contactsModalHandle = index => {
    setIndexOfUser(index);
    setIsVisibleContactsModal(true);
  };

  const onSwipeLeft = () => {
    const dataLength = data.length - 1;
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

  return (
    <>
      <ModalContactsScreen
        isVisibleContactsModal={isVisibleContactsModal}
        setIsVisibleContactsModal={setIsVisibleContactsModal}
        currentUser={currentUser}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View style={styles.container}>
        {isLoading && <LoadingIndicator />}
        <Header screenTitle="Contacts" />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}>
          {data?.map((user, index) => {
            return (
              <UserCard
                data={user}
                index={index}
                contactsModalHandle={contactsModalHandle}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 70,
  },
});

export default Screen_1;
