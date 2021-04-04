import React from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import UserCard from '../components/userCard';
import {DATA} from '../data';

const Screen_1 = () => {
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
   paddingTop: 25,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Screen_1;