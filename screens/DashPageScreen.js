import React, { useState } from 'react';
import { 
 View, 
 Text, 
 StyleSheet, 
 TouchableOpacity, 
 ScrollView, 
 SafeAreaView 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import necessary components
import Profile from '../screens/ProfileScreen';
import Posts from '../screens/PostsScreen';
import Groups from '../screens/groupScreen';
import User from '../components/Users';
import UserEvents from '../screens/EventsScreen';
import { logoutUser } from '../features/authSlice/authSlice';

const colors = {
 primary: '#1A237E',
 secondary: '#FF5722',
 background: '#F8F9FA',
 white: '#FFFFFF',
 text: '#333333'
};

const Stack = createNativeStackNavigator();

const DefaultDashboard = () => (
 <View style={styles.defaultDashboardContainer}>
   <Icon 
     name="dashboard" 
     size={64} 
     color={colors.primary} 
     style={styles.dashboardIcon}
   />
   <Text style={styles.defaultDashboardText}>
     Welcome to Admin Dashboard
   </Text>
 </View>
);

const AdminDashboard = ({ navigation }) => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);

 const [selectedTab, setSelectedTab] = useState('dashboard');

 const sidebarItems = [
   { name: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
   { name: 'profile', icon: 'account-circle', label: 'Profile' },
   { name: 'posts', icon: 'article', label: 'Posts' },
   { name: 'groups', icon: 'group', label: 'Groups' },
   { name: 'users', icon: 'person', label: 'Users' },
   { name: 'events', icon: 'event', label: 'Events' }
 ];

 const handleSignOut = async () => {
   try {
     await dispatch(logoutUser()).unwrap();
     navigation.navigate('Login');
   } catch (error) {
     console.error('Logout failed:', error);
   }
 };

 const renderContent = () => {
   switch(selectedTab) {
     case 'dashboard': return <DefaultDashboard />;
     case 'profile': return <Profile />;
     case 'posts': return <Posts />;
     case 'groups': return <Groups />;
     case 'users': return <User />;
     case 'events': return <UserEvents />;
     default: return <DefaultDashboard />;
   }
 };

 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.drawer}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Admin Panel</Text>
       </View>
       
       <View style={styles.userInfoContainer}>
         <Icon 
           name="account-circle" 
           size={50} 
           color={colors.white} 
         />
         <Text style={styles.userNameText}>
           {user?.name || 'Admin User'}
         </Text>
         <Text style={styles.userRoleText}>
           Administrator
         </Text>
       </View>

       <ScrollView style={styles.menuContainer}>
         {sidebarItems.map((item) => (
           <TouchableOpacity
             key={item.name}
             style={[
               styles.menuItem,
               selectedTab === item.name && styles.selectedMenuItem
             ]}
             onPress={() => setSelectedTab(item.name)}
           >
             <Icon 
               name={item.icon} 
               size={24} 
               color={colors.white} 
               style={styles.icon}
             />
             <Text style={styles.menuText}>{item.label}</Text>
           </TouchableOpacity>
         ))}
         
         <TouchableOpacity
           style={styles.signOutButton}
           onPress={handleSignOut}
         >
           <Icon 
             name="exit-to-app" 
             size={24} 
             color={colors.white} 
             style={styles.icon} 
           />
           <Text style={styles.menuText}>Sign Out</Text>
         </TouchableOpacity>
       </ScrollView>
     </View>

     <View style={styles.content}>
       <Text style={styles.contentHeader}>
         {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
       </Text>
       {renderContent()}
     </View>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection: 'row',
   backgroundColor: colors.background,
 },
 drawer: {
   width: 240,
   backgroundColor: colors.primary,
 },
 header: {
   padding: 16,
   backgroundColor: colors.secondary,
   alignItems: 'center',
 },
 headerText: {
   color: colors.white,
   fontSize: 20,
   fontWeight: '600',
 },
 userInfoContainer: {
   alignItems: 'center',
   paddingVertical: 20,
   borderBottomWidth: 1,
   borderBottomColor: 'rgba(255,255,255,0.2)',
 },
 userNameText: {
   color: colors.white,
   fontSize: 18,
   fontWeight: '600',
   marginTop: 10,
 },
 userRoleText: {
   color: 'rgba(255,255,255,0.7)',
   fontSize: 14,
 },
 menuContainer: {
   flex: 1,
   padding: 8,
 },
 menuItem: {
   flexDirection: 'row',
   alignItems: 'center',
   padding: 12,
   borderRadius: 8,
   marginBottom: 8,
 },
 selectedMenuItem: {
   backgroundColor: colors.secondary,
 },
 icon: {
   marginRight: 12,
 },
 menuText: {
   color: colors.white,
   fontSize: 16,
 },
 signOutButton: {
   flexDirection: 'row',
   alignItems: 'center',
   padding: 12,
   borderRadius: 8,
   marginTop: 16,
 },
 content: {
   flex: 1,
   padding: 16,
   backgroundColor: colors.white,
 },
 contentHeader: {
   fontSize: 24,
   color: colors.primary,
   fontWeight: '600',
   marginBottom: 16,
 },
 defaultDashboardContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 20,
 },
 dashboardIcon: {
   marginBottom: 20,
 },
 defaultDashboardText: {
   fontSize: 22,
   fontWeight: 'bold',
   color: colors.primary,
 }
});

export default AdminDashboard;