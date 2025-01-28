import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../features/authSlice/authSlice';
import { Icon } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

const UserRegistration = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector(state => state.auth);
  const [authTab, setAuthTab] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Clear errors when switching tabs
  useEffect(() => {
    dispatch(clearError());
  }, [authTab, dispatch]);

  // Handle successful authentication
  useEffect(() => {
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{
            name: 'RootDrawer',
            state: {
              routes: [{
                name: user.role === 'admin' ? 'Admin' : 'Home'
              }]
            }
          }]
        })
      );
    }
  }, [user, navigation]);

  const validateForm = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    if (authTab === 1 && !formData.fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    if (authTab === 1 && formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const action = authTab === 0 ? loginUser : registerUser;
      await dispatch(action({
        email: formData.email,
        password: formData.password,
        ...(authTab === 1 && { fullName: formData.fullName })
      })).unwrap();

      if (authTab === 1) {
        Alert.alert('Success', 'Account created successfully! Please login');
        setAuthTab(0);
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      }
    } catch (error) {
      Alert.alert('Error', error?.message || 'Authentication failed');
    }
  };

  const renderInput = (placeholder, value, onChange, icon, props = {}) => (
    <View style={styles.inputContainer}>
      <Icon name={icon} type="font-awesome" size={20} color={colors.primary} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {authTab === 0 ? "Welcome Back" : "Create Account"}
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, authTab === 0 && styles.activeTab]}
            onPress={() => setAuthTab(0)}
          >
            <Text style={[styles.tabText, authTab === 0 && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, authTab === 1 && styles.activeTab]}
            onPress={() => setAuthTab(1)}
          >
            <Text style={[styles.tabText, authTab === 1 && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.form}>
          {authTab === 1 && 
            renderInput(
              "Full Name",
              formData.fullName,
              (text) => setFormData({...formData, fullName: text}),
              "user"
            )
          }
          
          {renderInput(
            "Email",
            formData.email,
            (text) => setFormData({...formData, email: text}),
            "envelope",
            { 
              autoCapitalize: "none",
              keyboardType: "email-address",
              autoComplete: "email"
            }
          )}
          
          {renderInput(
            "Password",
            formData.password,
            (text) => setFormData({...formData, password: text}),
            "lock",
            { 
              secureTextEntry: true,
              autoComplete: "password"
            }
          )}
          
          {authTab === 1 &&
            renderInput(
              "Confirm Password",
              formData.confirmPassword,
              (text) => setFormData({...formData, confirmPassword: text}),
              "lock",
              { 
                secureTextEntry: true,
                autoComplete: "password"
              }
            )
          }

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>
                {authTab === 0 ? "Login" : "Sign Up"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const colors = {
  primary: "#0A1F44",
  secondary: "#F05A28", 
  background: "#FFF5F2",
  white: "#FFFFFF"
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  tabText: {
    color: colors.primary,
  },
  activeTabText: {
    color: colors.secondary,
    fontWeight: '600',
  },
  form: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
});


export default UserRegistration;