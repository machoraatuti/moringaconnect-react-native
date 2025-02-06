import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';

// Screens
import Home from './HomeScreen';
import UserRegistration from './UserRegistrationScreen';
import Profile from './ProfileScreen';
import AdminDashboard from './DashPageScreen';
import UserEvents from './EventsScreen';
import Groups from './groupScreen';
import Users from '../components/Users';
import Messages from './MessageScreen';
import Search from './SearchScreen';
import Settings from './SettingsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NotificationIcon = () => (
  <TouchableOpacity 
    style={{ marginRight: 16 }}
    onPress={() => {
      console.log('Notifications pressed');
    }}
  >
    <View style={{ position: 'relative' }}>
      <Icon 
        name="bell" 
        type="font-awesome" 
        size={24} 
        color="#fff" 
      />
      <View style={{
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#f44336',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
      }}>
        <Text style={{ color: '#fff', fontSize: 12 }}>2</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
    <Stack.Screen name="AuthScreen" component={UserRegistration} options={{ animationEnabled: false }} />
  </Stack.Navigator>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'Messages':
              iconName = 'envelope';
              break;
            case 'Groups':
              iconName = 'users';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Profile':
              iconName = 'user';
              break;
          }
          return <Icon name={iconName} type="font-awesome" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F05A28',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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
  const dispatch = useDispatch();
  const [activeRouteName, setActiveRouteName] = React.useState('Home');

  const handleLogout = (navigation) => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          onPress: () => {
            dispatch({ type: 'LOGOUT' });
            navigation.navigate('Auth');
          }
        }
      ]
    );
  };

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
      initialRouteName={!user ? 'Auth' : isAdmin ? 'Admin' : 'Main'}
      screenOptions={({ route, navigation }) => ({
        headerStyle: { 
          backgroundColor: '#0A1F44',
          elevation: 0,
          shadowOpacity: 0,
        },
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
        headerRight: () => {
          if (route.name === 'Main' && activeRouteName === 'Home') {
            return <NotificationIcon />;
          }
          return null;
        }
      })}
    >
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      
      <Drawer.Screen
        name="Main"
        component={BottomTabs}
        options={{
          title: activeRouteName,
          drawerItemStyle: { display: 'none' },
        }}
        listeners={{
          state: (e) => {
            const route = e.data.state?.routes[e.data.state?.index || 0];
            if (route) {
              let newRouteName = '';
              switch (route.name) {
                case 'HomeTab':
                  newRouteName = 'Home';
                  break;
                case 'Messages':
                  newRouteName = 'Messages';
                  break;
                case 'Groups':
                  newRouteName = 'Groups';
                  break;
                case 'Search':
                  newRouteName = 'Search';
                  break;
                case 'Profile':
                  newRouteName = 'Profile';
                  break;
                default:
                  newRouteName = 'Home';
              }
              if (newRouteName !== activeRouteName) {
                setActiveRouteName(newRouteName);
              }
            }
          }
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
      
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="cog" type="font-awesome" size={24} color={color} />
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

      <Drawer.Screen
        name="Logout"
        component={() => null}
        listeners={({ navigation }) => ({
          drawerItemPress: () => handleLogout(navigation),
        })}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="sign-out" type="font-awesome" size={24} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainComponent;