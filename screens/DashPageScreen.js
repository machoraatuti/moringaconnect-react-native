import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const colors = {
  primary: '#1A237E',
  secondary: '#FF5722',
  background: '#F8F9FA',
  white: '#FFFFFF',
};

const Stack = createNativeStackNavigator();

const AdminDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
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
      case 'dashboard': return <Admin />;
      case 'profile': return <Profile />;
      case 'posts': return <Posts />;
      case 'groups': return <Groups />;
      case 'users': return <Users />;
      case 'events': return <AdminEvents />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Admin Panel</Text>
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
            <Icon name="exit-to-app" size={24} color={colors.white} style={styles.icon} />
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
});

export default AdminDashboard;