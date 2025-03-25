import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './Redux/store';
import * as SplashScreen from 'expo-splash-screen';
import LaunchScreen from './components/LaunchScreen';
import MainComponent from './screens/MainComponent';

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync();

// Simplified AppContent - removed the auth check dispatch
const AppContent = () => {
  return (
    <NavigationContainer>
      <MainComponent />
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        console.log("App is starting...");
        
        // Hide splash screen
        await SplashScreen.hideAsync();
        setSplashHidden(true);
        
        console.log("App is ready!");
        setAppReady(true);
      } catch (error) {
        console.log("Error during app preparation:", error);
      }
    };

    prepareApp();
  }, []);

  if (!splashHidden) {
    return null; // Keeps the splash screen visible
  }

  // Simplified - go straight to AppContent
  return (
    <Provider store={store}>
      <PersistGate loading={<LaunchScreen />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}