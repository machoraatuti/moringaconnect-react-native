
// CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions ,  Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
//import { useDispatch, useSelector } from 'react-redux';
//import { logoutUser } from '../Features/auth/authSlice';
import moringaLogo from "../assets/images/moringalogo.png";

const CustomHeader = () => {
  const navigation = useNavigation();
  //const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const isLargeScreen = windowWidth >= 768;
 // const { isAdmin, isAuthenticated } = useSelector(state => state.auth);

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { text: "Home", icon: 'home', path: "Home" },
    { text: "Groups", icon: 'group', path: "Groups" },
    { text: "Posts", icon: 'article', path: "Posts" },
    { text: "Events", icon: 'event', path: "Events" },
  ];

  const handleProfileClick = () => {
    if (isAdmin) {
      navigation.navigate('Admin');
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={moringaLogo} style={styles.logo} />
        <Text style={styles.title}>Moringa Alumni Connect</Text>
      </View>

      {isLargeScreen ? (
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.text}
              onPress={() => navigation.navigate(item.path)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleSignOut} style={styles.iconButton}>
            <Icon name="exit-to-app" size={24} color="#0A1F44" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Icon name="menu" size={24} color="#0A1F44" />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleProfileClick} style={styles.profileButton}>
        <Icon name="person" size={24} color="#0A1F44" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 8,
  },
  title: {
    color: '#0A1F44',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  menuItem: {
    padding: 8,
  },
  menuText: {
    color: '#0A1F44',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
  },
  menuButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  profileButton: {
    padding: 8,
  }
});

export default CustomHeader;
