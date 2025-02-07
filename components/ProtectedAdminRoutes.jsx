import React from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2"
};

const ProtectedAdminRoute = ({ children }) => {
  const navigation = useNavigation();
  const { isAuthenticated, isAdmin, isLoading, user } = useSelector(state => state.auth);

  const verifyAdminStatus = () => {
    return isAuthenticated && isAdmin && user?.role === 'admin';
  };

  React.useEffect(() => {
    if (!isLoading && !verifyAdminStatus()) {
      navigation.replace('Login', { returnTo: navigation.getCurrentRoute()?.name });
    }
  }, [isLoading, isAuthenticated, isAdmin, user]);

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colors.background 
      }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (!verifyAdminStatus()) {
    return null;
  }

  return children;
};

export default ProtectedAdminRoute;