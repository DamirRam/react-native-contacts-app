import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import CircleButton from './circleButton';

const Header = ({changeScreen, activeScreen, screenTitles}) => {
 return (
  <View style={[styles.root, {backgroundColor: (activeScreen === 2) ?  '#000' : '#fff'}]}>
    {
      (activeScreen === 1) && 
      <CircleButton changeScreen={changeScreen} />
    }
    <Text style={[styles.headerText, {color: (activeScreen === 2) ? '#fff' : '#000'}]}>
      {screenTitles[activeScreen]}
    </Text>
    {
      (activeScreen === 2) && 
       
        <View style={styles.titleBlock}>
          <TouchableOpacity>
            <Text style={styles.title}>Select album</Text>
          </TouchableOpacity>  
          <Text style={styles.titleCircle}>2</Text>
        </View>
    }
  </View>
 )
};

const styles = StyleSheet.create({
 root: {
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingTop: 31,
   paddingBottom: 10,
   paddingRight: 10,
   width: '100%'
 },
 headerText: {
   alignSelf: 'flex-start',
   paddingLeft: 10,
   fontSize: 35,
   color: '#0A0A0A'
 },
 titleBlock: {
   display: 'flex',
   flexDirection: 'row'
 },
 title: {
   marginRight: 5,
   color: '#00ADD3',
   fontSize: 26,
   borderWidth: 1,
   borderBottomColor: '#00ADD3'
 },
 titleCircle: {
   height: 36,
   width: 36,
   borderRadius: 18,
   backgroundColor: '#00ADD3',
   color: '#fff',
   textAlign: 'center',
   fontSize: 26,
 }
});

export default Header;