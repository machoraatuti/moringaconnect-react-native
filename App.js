import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './Redux/store';
import MainComponent from './screens/MainComponent';

export default function App() {
 return (
   <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
       <NavigationContainer>
         <MainComponent />
         <StatusBar style="light" />
       </NavigationContainer>
     </PersistGate>
   </Provider>
 );
}