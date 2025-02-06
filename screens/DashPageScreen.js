import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  StatusBar,
  FlatList,Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Import necessary components
import Profile from '../screens/ProfileScreen';
import Posts from '../screens/PostsScreen';
import Groups from '../screens/groupScreen';
import User from '../components/Users';
import UserEvents from '../screens/AdminEventsScreen';
import { logoutUser } from '../features/authSlice/authSlice';

const { width } = Dimensions.get('window');

const colors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF"
};

const AdminDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [selectedTab, setSelectedTab] = useState('dashboard');

  const dashboardItems = [
    { 
      name: 'dashboard', 
      icon: 'grid-outline', 
      label: 'Dashboard', 
      color: colors.secondary,
      component: (
        <View style={styles.dashboardWelcome}>
          <Icon name="analytics-outline" size={64} color={colors.primary} />
          <Text style={styles.welcomeTitle}>Welcome, {user?.name || 'Admin'}</Text>
          <Text style={styles.welcomeSubtitle}>Administrator Dashboard</Text>
        </View>
      )
    },
    { 
      name: 'users', 
      icon: 'people-outline', 
      label: 'Users', 
      color: colors.primary,
      component: <User />
    },
    { 
      name: 'posts', 
      icon: 'document-text-outline', 
      label: 'Posts', 
      color: colors.secondary,
      component: <Posts />
    },
    { 
      name: 'groups', 
      icon: 'layers-outline', 
      label: 'Groups', 
      color: colors.primary,
      component: <Groups />
    },
    { 
      name: 'events', 
      icon: 'calendar-outline', 
      label: 'Events', 
      color: colors.secondary,
      component: <UserEvents />
    }
  ];

  const handleLogout = () => {
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

  const renderNavigationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.navigationItem,
        selectedTab === item.name && styles.selectedNavigationItem
      ]}
      onPress={() => setSelectedTab(item.name)}
    >
      <View style={[
        styles.navigationIconContainer,
        {
          backgroundColor: selectedTab === item.name 
            ? item.color 
            : 'transparent'
        }
      ]}>
        <Icon 
          name={item.icon} 
          size={24} 
          color={selectedTab === item.name ? colors.white : colors.primary}
        />
      </View>
      <Text 
        style={[
          styles.navigationItemText,
          selectedTab === item.name && styles.selectedNavigationItemText
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderDashboardContent = () => {
    const selectedItem = dashboardItems.find(item => item.name === selectedTab);
    return selectedItem ? selectedItem.component : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="log-out-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <FlatList
          data={dashboardItems}
          renderItem={renderNavigationItem}
          keyExtractor={item => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navigationScrollView}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>
          {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        </Text>
        <View style={styles.contentInnerContainer}>
          {renderDashboardContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  logoutButton: {
    padding: 10,
  },
  navigationContainer: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationScrollView: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  navigationItem: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
  },
  selectedNavigationItem: {
    transform: [{ scale: 1.05 }],
  },
  navigationIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  navigationItemText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedNavigationItemText: {
    color: colors.secondary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentInnerContainer: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  dashboardWelcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 20,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 10,
    textAlign: 'center',
  }
});

export default AdminDashboard;