import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './HomeScreen';
import UserRegistration from './UserRegistrationScreen';
import Profile from './ProfileScreen';
import Posts from './PostsScreen';
import AdminDashboard from './DashPageScreen';
import UserEvents from './EventsScreen';

const Stack = createNativeStackNavigator();

const MainComponent = () => {
 return (
   <Stack.Navigator
     initialRouteName="Home"
     screenOptions={{
       headerStyle: {
         backgroundColor: '#0A1F44',
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
     }}
   >
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="Login" component={UserRegistration} />
     <Stack.Screen name="Profile" component={Profile} />
     <Stack.Screen name="Posts" component={Posts} />
     <Stack.Screen name="Events" component={UserEvents} />
     <Stack.Screen 
       name="Admin" 
       component={AdminDashboard}
       options={{ headerShown: false }}
     />
   </Stack.Navigator>
 );
};

export default MainComponent;