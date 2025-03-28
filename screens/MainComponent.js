import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../features/authSlice/authSlice';

// Screens
import LandingScreen from '../screens/LandingScreen';
import Home from '../screens/HomeScreen';
import UserRegistration from '../screens/UserRegistrationScreen';
import Profile from '../screens/ProfileScreen';
import AdminDashboard from '../screens/DashPageScreen';
import UserEvents from '../screens/EventsScreen';
import EventDetails from '../screens/EventDetailsScreen';
import Groups from '../screens/groupScreen';
import GroupDetails from '../screens/GroupDetailsScreen';
import Users from '../components/Users';
import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';
import Search from '../screens/SearchScreen';
import Settings from '../screens/SettingsScreen';
import AlumniDirectory from '../screens/AlumniDirectoryScreen';
import AlumniProfile from '../screens/AlumniProfileScreen';
import Feed from '../screens/feedScreen';
import FeedDetails from '../screens/FeedDetailsScreen';
import JobBoard from '../screens/JobBoardScreen';
import JobDetails from '../screens/JobDetailsScreen';
import Connections from './ConnectionsScreen';
import ConnectionProfile from '../screens/ConnectionProfileScreen';
import Mentorship from '../screens/MentorshipScreen';
import MentorProfile from '../screens/MentorProfileScreen';
import NewsUpdates from '../screens/NewsScreen';
import NewsDetails from '../screens/NewsDetailsScreen';
import EventsScreen from '../screens/EventsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigators for each section
const AlumniStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AlumniDirectoryMain" component={AlumniDirectory} />
    <Stack.Screen 
      name="AlumniProfile" 
      component={AlumniProfile}
      options={{
        headerShown: true,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);


const ConnectionsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ConnectionsMain" component={Connections} />
    <Stack.Screen 
      name="ConnectionProfile" 
      component={ConnectionProfile}
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const FeedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FeedMain" component={Feed} />
    <Stack.Screen 
      name="FeedDetails" 
      component={FeedDetails}
      options={{
        headerShown: true,
        headerStyle: { backgroundColor: "rgba(10, 31, 68, 0.8)" },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const JobBoardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="JobBoardMain" component={JobBoard} />
    <Stack.Screen 
      name="JobDetails" 
      component={JobDetails}
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const MentorshipStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MentorshipMain" component={Mentorship} />
    <Stack.Screen 
      name="MentorProfile" 
      component={MentorProfile}
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const NewsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NewsMain" component={NewsUpdates} />
    <Stack.Screen 
      name="NewsDetails" 
      component={NewsDetails}
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const GroupsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GroupsMain" component={Groups} />
    <Stack.Screen 
      name="GroupDetails" 
      component={GroupDetails}
      options={{
        headerShown: false,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const EventsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="EventsMain" component={EventsScreen} />
    <Stack.Screen 
      name="EventDetails" 
      component={EventDetails}
      options={{
        headerShown: true,
        headerStyle: { backgroundColor: '#E67E4D' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const MessagesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MessagesMain" component={MessagesScreen} />
    <Stack.Screen 
      name="Chat" 
      component={ChatScreen}
      options={{
        headerShown: true,
        headerStyle: {  backgroundColor: "rgba(10, 31, 68, 0.8)" },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsMain" component={Settings} />
    {/* Add additional settings-related screens here */}
  </Stack.Navigator>
);

const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    <Stack.Screen name="ManageUsers" component={Users} />
    <Stack.Screen name="ManageGroups" component={Groups} />
    <Stack.Screen name="ManageEvents" component={UserEvents} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
    <Stack.Screen 
      name="AuthScreen" 
      component={UserRegistration} 
      options={{ animationEnabled: false }} 
    />
  </Stack.Navigator>
);

// Bottom Tabs Navigation
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
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
      <Tab.Screen 
        name="Messages" 
        component={MessagesStack} 
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon name="envelope" type="font-awesome" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Groups" component={GroupsStack} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  const handleSignOut = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          onPress: () => {
            dispatch({ type: 'LOGOUT' });
          }
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.drawerHeader}>
        <Image 
          source={require('../assets/images/Graduation-cap.jpeg')}
          style={styles.drawerHeaderImage}
        />
      </View>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Home')}
      >
        <Icon name="home" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Home</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Alumni Directory')}
      >
        <Icon name="graduation-cap" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Alumni Directory</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Connections')}
      >
        <Icon name="users" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>My Connections</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Feed')}
      >
        <Icon name="rss" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Feed</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('JobBoard')}
      >
        <Icon name="briefcase" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Job Board & Career Support</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Mentorship')}
      >
        <Icon name="user" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Mentorship Program</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('NewsUpdates')}
      >
        <Icon name="newspaper-o" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>News and Updates</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Groups')}
      >
        <Icon name="users" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Community Groups</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Events')}
      >
        <Icon name="calendar" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Events</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Settings')}
      >
        <Icon name="cog" type="font-awesome" size={24} color="#666" />
        <Text style={styles.drawerItemText}>Settings</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      </TouchableOpacity>

      {isAdmin && (
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Admin')}
        >
          <Icon name="shield" type="font-awesome" size={24} color="#666" />
          <Text style={styles.drawerItemText}>Admin Dashboard</Text>
          <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
        <Icon name="sign-out" type="font-awesome" size={20} color="#FFF" />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const MainComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Instead of checking user?.role, provide a default role
  const isAdmin = user?.role === 'admin' || false;
  const [activeRouteName, setActiveRouteName] = useState('Home');

  // Remove authentication checks and loading states
  // Always show the main application interface
  
  return (
    <Drawer.Navigator
      id="RootDrawer"
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerStyle: { 
          backgroundColor: '#E67E4D',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#FFF' },
        drawerActiveTintColor: '#E67E4D',
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
          if (route.name === 'Home' && activeRouteName === 'Home') {
            return (
              <TouchableOpacity 
                onPress={() => navigation.navigate('Notifications', { screen: 'NotificationsMain' })}
                style={{ marginRight: 15 }}
              >
                <Icon 
                  name="bell" 
                  type="font-awesome" 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
            );
          }
          return null;
        }
      })}
    >
      <Drawer.Screen name="Home"
        component={BottomTabs}
        options={{
          title: "",
        }}
        listeners={({ navigation }) => ({
          state: (e) => {
            if (e.data.state) {
              const routes = e.data.state.routes;
              const currentRoute = routes[e.data.state.index];
              if (currentRoute) {
                let newRouteName = currentRoute.name.replace('Tab', '');
                setActiveRouteName(newRouteName);
              }
            }
          },
        })}
      />
      <Drawer.Screen 
        name="Alumni Directory" 
        component={AlumniStack}
      />
      <Drawer.Screen 
        name="Connections" 
        component={ConnectionsStack}
      />
      <Drawer.Screen 
        name="Feed" 
        component={FeedStack}
      />
      <Drawer.Screen 
        name="JobBoard" 
        component={JobBoardStack}
      />
      <Drawer.Screen 
        name="Mentorship" 
        component={MentorshipStack}
      />
      <Drawer.Screen 
        name="NewsUpdates" 
        component={NewsStack}
        options={{
          title: 'News & Updates'
        }}
      />
      <Drawer.Screen 
        name="Groups" 
        component={GroupsStack}
      />
      <Drawer.Screen 
        name="Events" 
        component={EventsStack}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsStack}
      />

      {isAdmin && (
        <Drawer.Screen
          name="Admin"
          component={AdminStack}
          options={{
            title: 'Admin Dashboard'
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerHeaderImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E67E4D',
    margin: 16,
    padding: 12,
    borderRadius: 25,
    gap: 8,
  },
  signOutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MainComponent;