import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './Redux/store';
import * as SplashScreen from 'expo-splash-screen';
import LaunchScreen from './components/LaunchScreen';
import MainComponent from './screens/MainComponent';
import { checkAuthToken } from './features/authSlice/authSlice';

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthToken());
  }, [dispatch]);

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
        
        // Simulate splash screen duration
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Hide splash screen
        await SplashScreen.hideAsync();
        setSplashHidden(true);

        // Simulate loading screen duration
        await new Promise(resolve => setTimeout(resolve, 5000));
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

  return (
    <Provider store={store}>
      <PersistGate loading={<LaunchScreen />} persistor={persistor}>
        {appReady ? <AppContent /> : <LaunchScreen />}
      </PersistGate>
    </Provider>
  );
}

