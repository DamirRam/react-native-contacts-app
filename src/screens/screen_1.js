import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Alert, View} from 'react-native';
import UserCard from '../components/UserCard';
import LoadingIndicator from '../components/LoadingIndicator';
import Header from '../components/Header';

const dataUsersUrl = 'https://randomuser.me/api/?results=20';

const Screen_1 = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHandler();
  }, [refresh]);

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

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator />}
      <Header screenTitle="Contacts" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
        {data.map((user, index) => {
          return <UserCard data={user} index={index} />;
        })}
      </ScrollView>
    </View>
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
