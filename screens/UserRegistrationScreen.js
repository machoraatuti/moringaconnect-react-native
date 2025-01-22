import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../features/authSlice/authSlice';

const colors = {
 primary: "#0A1F44", 
 secondary: "#F05A28",
 background: "#FFF5F2",
 white: "#FFFFFF"
};

const UserRegistration = ({ navigation }) => {
 const dispatch = useDispatch();
 const { loading, error, isAuthenticated } = useSelector(state => state.auth);
 const [authTab, setAuthTab] = useState(0);
 const [formData, setFormData] = useState({
   fullName: '',
   email: '',
   password: '',
   confirmPassword: ''
 });

 useEffect(() => {
   dispatch(clearError());
 }, [dispatch]);

 const validateForm = () => {
   const errors = {};
   if (authTab === 1) {
     if (!formData.fullName) {
       Alert.alert('Error', 'Full name is required');
       return false;
     }
     if (formData.password !== formData.confirmPassword) {
       Alert.alert('Error', 'Passwords do not match');
       return false;
     }
   }
   
   if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
     Alert.alert('Error', 'Please enter a valid email');
     return false;
   }
   
   if (!formData.password || formData.password.length < 6) {
     Alert.alert('Error', 'Password must be at least 6 characters');
     return false;
   }

   return true;
 };

 const handleLogin = async () => {
   if (!validateForm()) return;

   try {
     const result = await dispatch(loginUser({
       email: formData.email,
       password: formData.password
     })).unwrap();
     
     navigation.navigate(result.user?.role === 'admin' ? 'Admin' : 'Groups');
   } catch (err) {
     Alert.alert('Error', err.message || 'Login failed');
   }
 };

 const handleSignUp = async () => {
   if (!validateForm()) return;

   try {
     await dispatch(registerUser({
       fullName: formData.fullName,
       email: formData.email,
       password: formData.password
     })).unwrap();
     navigation.navigate('Groups');
   } catch (err) {
     Alert.alert('Error', err.message || 'Registration failed');
   }
 };

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

       {error && (
         <Text style={styles.error}>{error}</Text>
       )}

       {authTab === 0 ? (
         <View>
           <TextInput
             style={styles.input}
             placeholder="Email"
             value={formData.email}
             onChangeText={(text) => setFormData({...formData, email: text})}
             keyboardType="email-address"
           />
           <TextInput
             style={styles.input}
             placeholder="Password"
             value={formData.password}
             onChangeText={(text) => setFormData({...formData, password: text})}
             secureTextEntry
           />
           <TouchableOpacity 
             style={styles.button}
             onPress={handleLogin}
             disabled={loading}
           >
             {loading ? (
               <ActivityIndicator color={colors.white} />
             ) : (
               <Text style={styles.buttonText}>Login</Text>
             )}
           </TouchableOpacity>
         </View>
       ) : (
         <View>
           <TextInput
             style={styles.input}
             placeholder="Full Name"
             value={formData.fullName}
             onChangeText={(text) => setFormData({...formData, fullName: text})}
           />
           <TextInput
             style={styles.input}
             placeholder="Email"
             value={formData.email}
             onChangeText={(text) => setFormData({...formData, email: text})}
             keyboardType="email-address"
           />
           <TextInput
             style={styles.input}
             placeholder="Password"
             value={formData.password}
             onChangeText={(text) => setFormData({...formData, password: text})}
             secureTextEntry
           />
           <TextInput
             style={styles.input}
             placeholder="Confirm Password" 
             value={formData.confirmPassword}
             onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
             secureTextEntry
           />
           <TouchableOpacity
             style={styles.button}
             onPress={handleSignUp}
             disabled={loading}
           >
             {loading ? (
               <ActivityIndicator color={colors.white} />
             ) : (
               <Text style={styles.buttonText}>Sign Up</Text>
             )}
           </TouchableOpacity>
         </View>
       )}
     </View>
   </ScrollView>
 );
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
 input: {
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 8,
   padding: 12,
   marginBottom: 12,
 },
 button: {
   backgroundColor: colors.secondary,
   padding: 15,
   borderRadius: 8,
   alignItems: 'center',
 },
 buttonText: {
   color: colors.white,
   fontWeight: '600',
 },
 error: {
   color: 'red',
   marginBottom: 10,
   textAlign: 'center',
 }
});

export default UserRegistration;