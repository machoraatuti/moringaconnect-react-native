import React, { useCallback} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';

// Screens
import LandingScreen from './LandingScreen';
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
import AlumniDirectory from './AlumniDirectoryScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NotificationIcon = ({ count = 0 }) => {
  return (
    <TouchableOpacity style={{ marginRight: 16 }} onPress={() => console.log("Notifications pressed")}>
      <View style={{ position: "relative" }}>
        <Icon name="bell" type="font-awesome" size={24} color="#fff" />
        {count > 0 && (
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "#f44336",
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};


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
           case 'Explore':
             iconName = 'compass';
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
     <Tab.Screen name="Explore" component={Search} />
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

//Landing Stack
const LandingStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome"
        component={LandingScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#0A1F44"
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          padding: 20
        }}
      />
    </Stack.Navigator>
  )
}

const MainComponent = () => {
 const { user, isLoading } = useSelector((state) => state.auth);
 const isAdmin = user?.role === 'admin';
 const dispatch = useDispatch();
 const [activeRouteName, setActiveRouteName] = React.useState('Home');

 const handleLogout = useCallback((navigation) => {
  Alert.alert("Logout", "Are you sure you want to logout?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Logout",
      onPress: () => dispatch({ type: "LOGOUT" }),
    },
  ]);
}, [dispatch]);


 if (isLoading) {
   return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size="large" color="#0A1F44" />
     </View>
   );
 }

 if (!user) {
   return <AuthStack />;
 }

 return (
   <Drawer.Navigator
     id="RootDrawer"
     initialRouteName="Main"
     screenOptions={({ route, navigation }) => ({
       headerStyle: { 
         backgroundColor: '#0A1F44',
         height: 80,
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
        name="Welcome"
        component={LandingStack}
        options={({ navigation }) => ({
          drawerIcon: ({ color }) => (
              <Icon name="door-open" type="font-awesome-5" size={24} color={color} />
          ),
          headerTitleAlign: "center", // Keep title centered
      })}
     />

      <Drawer.Screen
        name="Home"
        component={BottomTabs}
        options={{
          title: activeRouteName,
          drawerIcon: ({ color }) => (
            <Icon name="home-heart" type="material-community" size={24} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          state: (e) => {
            const state = navigation.getState();
            if (state?.routes?.length > 0) {
              const currentRoute = state.routes[state.index]?.name.replace("Tab", "");
              setActiveRouteName(currentRoute);
            }
          },
        })}
        
      />

<Drawer.Screen
    name="Alumni Directory"
    component={AlumniDirectory}
    options={({ navigation }) => ({
        drawerIcon: ({ color }) => (
            <Icon name="folder" type="font-awesome" size={24} color={color} />
        ),
        headerRight: () => (
            <TouchableOpacity 
                onPress={() => alert("Notifications clicked!")} 
                style={{ marginRight: 15 }}
            >
                <Icon name="bell" type="font-awesome" color="#F05A28" size={22} />
            </TouchableOpacity>
        ),
        headerTitleAlign: "center", // Keep title centered
    })}
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
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="sign-out" type="font-awesome" size={24} color={color} />
          ),
          drawerLabel: "Logout",
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault(); // Prevent navigating to a blank screen
            handleLogout(navigation);
          },
        })}
      />

   </Drawer.Navigator>
 );
};

export default MainComponent;