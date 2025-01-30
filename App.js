import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
// import { Provider } from 'react-redux';
import MainComponent from './screens/MainComponent';
// import store from './src/store';

export default function App() {

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async() => {
      try{
        await SplashScreen.preventAutoHideAsync();

        await new Promise(resolve => setTimeout(resolve, 5000));
      } finally{
        setAppReady(true);
      }
    };
    
    prepare();
  }, []);

  useEffect(() => {
    if(appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <>
      <NavigationContainer>
        <MainComponent />
        <StatusBar style="auto" />
      </NavigationContainer>
    </>
  );
}