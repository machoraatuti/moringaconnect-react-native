import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';

import Home from './HomeScreen';
import UserRegistration from './UserRegistrationScreen';
import Profile from './ProfileScreen';
import Posts from './PostsScreen';
import AdminDashboard from './DashPageScreen';
import UserEvents from './EventsScreen';
import Groups from './groupScreen';
import Users from '../components/Users';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
 return (
   <Stack.Navigator
     screenOptions={{
       headerStyle: {
         backgroundColor: '#0A1F44'
       },
       headerTintColor: '#fff'
     }}>
     <Stack.Screen 
       name="Dashboard" 
       component={AdminDashboard}
     />
     <Stack.Screen name="ManageUsers" component={Users} />
     <Stack.Screen name="ManageGroups" component={Groups} />
     <Stack.Screen name="ManageEvents" component={UserEvents} />
   </Stack.Navigator>
 );
};

const MainNavigator = () => {
 return (
   <Stack.Navigator
     screenOptions={{
       headerStyle: {
         backgroundColor: '#0A1F44'
       },
       headerTintColor: '#fff'
     }}>
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="Login" component={UserRegistration} />
     <Stack.Screen name="Profile" component={Profile} />
     <Stack.Screen name="Posts" component={Posts} />
     <Stack.Screen name="Events" component={UserEvents} />
     <Stack.Screen name="Groups" component={Groups} />
   </Stack.Navigator>
 );
};

const MainComponent = () => {
 return (
   <Drawer.Navigator
     initialRouteName='Home'
     drawerStyle={{
       backgroundColor: '#FFF5F2'
     }}
     screenOptions={({ navigation }) => ({
       headerStyle: {
         backgroundColor: '#0A1F44'
       },
       headerTintColor: '#fff',
       drawerActiveTintColor: '#F05A28',
       headerLeft: () => (
         <Icon
           name='menu'
           size={24}
           color='white'
           onPress={() => navigation.toggleDrawer()}
         />
       )
     })}>
     <Drawer.Screen
       name="MainNav"
       component={MainNavigator}
       options={{
         title: 'Home',
         drawerIcon: ({ color }) => (
           <Icon name='home' type='font-awesome' size={24} color={color} />
         )
       }}
     />
     <Drawer.Screen
       name="Admin"
       component={AdminNavigator}
       options={{
         title: 'Admin Dashboard',
         drawerIcon: ({ color }) => (
           <Icon name='dashboard' type='font-awesome' size={24} color={color} />
         )
       }}
     />
     <Drawer.Screen
       name="Profile"
       component={Profile}
       options={{
         drawerIcon: ({ color }) => (
           <Icon name='user' type='font-awesome' size={24} color={color} />
         )
       }}
     />
     <Drawer.Screen
       name="Posts"
       component={Posts}
       options={{
         drawerIcon: ({ color }) => (
           <Icon name='newspaper-o' type='font-awesome' size={24} color={color} />
         )
       }}
     />
     <Drawer.Screen
       name="Events"
       component={UserEvents}
       options={{
         drawerIcon: ({ color }) => (
           <Icon name='calendar' type='font-awesome' size={24} color={color} />
         )
       }}
     />
   </Drawer.Navigator>
 );
};

export default MainComponent;