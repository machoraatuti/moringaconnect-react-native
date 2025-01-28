import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { store, persistor } from './Redux/store';
import MainComponent from './screens/MainComponent';
import { checkAuthToken } from './features/authSlice/authSlice';
import { useDispatch } from 'react-redux';

const LoadingScreen = () => (
 <View style={{ 
   flex: 1, 
   justifyContent: 'center', 
   alignItems: 'center', 
   backgroundColor: '#0A1F44' 
 }}>
   <ActivityIndicator size="large" color="#F05A28" />
 </View>
);

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
 return (
   <Provider store={store}>
     <PersistGate loading={<LoadingScreen />} persistor={persistor}>
       <AppContent />
     </PersistGate>
   </Provider>
 );
}