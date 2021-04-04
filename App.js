import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './src/components/header';
import TapBar from './src/components/tapbar';
import Screen_1 from './src/screens/screen_1';
import Screen_2 from './src/screens/screen_2';
import Screen_3 from './src/screens/screen_3';

const screenTitles = ['Contacts', 'Log In', 'Gallery'];

const App = () => {
  const [activeScreen, setActiveScreen] = useState (0);

  return (
    <View style={styles.root}>
      <Header 
      changeScreen={setActiveScreen}
      activeScreen={activeScreen}
      screenTitles={screenTitles}/>
      {  
        (activeScreen === 0) ?
          <>
            <Screen_1 /> 
            <TapBar changeScreen={setActiveScreen} />
          </>
          :
        (activeScreen === 1) ?
          <Screen_2 changeScreen={setActiveScreen} />
          :
          <Screen_3/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;
