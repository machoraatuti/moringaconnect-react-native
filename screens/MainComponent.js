import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';

// Screens
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

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ 
    headerShown: false,
    gestureEnabled: false // Prevent swipe back to auth
  }}>
    <Stack.Screen name="AuthScreen" component={UserRegistration} />
  </Stack.Navigator>
);

const HomeStack = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeRoot" component={Home} />
      {user && (
        <>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Groups" component={Groups} />
        </>
      )}
    </Stack.Navigator>
  );
};

const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    <Stack.Screen name="ManageUsers" component={Users} />
    <Stack.Screen name="ManageGroups" component={Groups} />
    <Stack.Screen name="ManageEvents" component={UserEvents} />
  </Stack.Navigator>
);

const MainComponent = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0A1F44" />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      id="RootDrawer"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#0A1F44' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#FFF5F2' },
        drawerActiveTintColor: '#F05A28',
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 10 }}
          />
        ),
        unmountOnBlur: true // Reset navigation state on drawer change
      })}
    >
      {!user ? (
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{
            drawerItemStyle: { display: 'none' }, // Hide from drawer
            headerShown: false
          }}
        />
      ) : (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeStack}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="home" type="font-awesome" size={24} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="user" type="font-awesome" size={24} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name="Posts"
            component={Posts}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="newspaper-o" type="font-awesome" size={24} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name="Groups"
            component={Groups}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="users" type="font-awesome" size={24} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name="Events"
            component={UserEvents}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="calendar" type="font-awesome" size={24} color={color} />
              )
            }}
          />
          {isAdmin && (
            <Drawer.Screen
              name="Admin"
              component={AdminStack}
              options={{
                title: 'Admin Dashboard',
                drawerIcon: ({ color }) => (
                  <Icon name="shield" type="font-awesome" size={24} color={color} />
                )
              }}
            />
          )}
        </>
      )}
    </Drawer.Navigator>
  );
};

export default MainComponent;