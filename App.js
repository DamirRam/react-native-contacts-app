import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './src/components/header';
import TapBar from './src/components/tapbar';
import Screen_1 from './src/screens/screen_1';
import Screen_2 from './src/screens/screen_2';
import Screen_3 from './src/screens/screen_3';

const screenTitles = ['Contacts', 'Log In', 'Gallery'];
const dataUsersUrl = 'https://randomuser.me/api/?results=30';


const App = () => {
  const [activeScreen, setActiveScreen] = useState (0);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

  return (
    <View style={styles.root}>
      <Header 
      changeScreen={setActiveScreen}
      activeScreen={activeScreen}
      screenTitles={screenTitles}
      setIsVisibleModal={setIsVisibleModal}
      activeAlbumIndex={activeAlbumIndex}/>
      {  
        (activeScreen === 0) ?
          <>
            <Screen_1 dataUrl={dataUsersUrl}/>
            <TapBar changeScreen={setActiveScreen} screenNames={screenTitles}/>
          </>
          :
        (activeScreen === 1) ?
          <Screen_2 changeScreen={setActiveScreen} />
          :
          <Screen_3 
          isVisibleModal={isVisibleModal} 
          setIsVisibleModal={setIsVisibleModal}
          activeAlbumIndex={activeAlbumIndex}
          setActiveAlbumIndex={setActiveAlbumIndex}
          />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default App;
