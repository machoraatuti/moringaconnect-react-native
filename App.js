import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { Provider } from 'react-redux';
import MainComponent from './screens/MainComponent';
// import store from './src/store';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MainComponent />
        <StatusBar style="auto" />
      </NavigationContainer>
    </>
  );
}