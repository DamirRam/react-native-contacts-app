import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import UserCard from '../components/UserCard';

const UsersList = ({data}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}>
      {data?.map((user, index) => {
        return <UserCard data={user} index={index} />;
      })}
    </ScrollView>
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

export default UsersList;
