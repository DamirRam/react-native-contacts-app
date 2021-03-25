 import React from 'react';
 import {
   StyleSheet,
   ScrollView
 } from 'react-native';
 import UserCard from './src/components/userCard';
 import {DATA} from './src/data';

 const App = () => {
  return (
    <ScrollView
    style={styles.container}
    contentContainerStyle={styles.scrollContainer}
    >
    {DATA.map((user, index) => {
      return <UserCard data={user} key={index} index={index}/>
      })
    }
    </ScrollView>
  )
 };

 const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
 });

 export default App;