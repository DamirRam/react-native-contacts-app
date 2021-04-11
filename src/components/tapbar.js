import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const TapBar = ({changeScreen, screenNames}) => {
 return (
  <View style={styles.root}>
    {screenNames.map((item, index) => (
      <TouchableOpacity 
        onPress={()=>changeScreen(index)}
      >
        <Text style={styles.text}>{item.toUpperCase()}</Text>
      </TouchableOpacity>
    ))}
  </View>
 )
};

const styles = StyleSheet.create({
 root: {
     position: 'absolute',
     bottom: 20,
     width: 265,
     height: 51,
     flex: 1,
     alignSelf: 'center',
     justifyContent: 'space-around',
     flexDirection: 'row',
     alignItems: 'center',
     borderRadius: 20,
     backgroundColor: '#0A0A0A'
 },
 text: {
   fontSize: 16,
   color: '#fff'
 }
});

export default TapBar;