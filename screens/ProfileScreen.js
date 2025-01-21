import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Layout from '../shared/Layout';

const colors = {
 primary: "#0A1F44",
 secondary: "#F05A28",
 background: "#FFF5F2",
 white: "#FFFFFF",
};

const Profile = () => {
 const dispatch = useDispatch();
 const navigation = useNavigation();
 const { user, isAuthenticated } = useSelector(state => state.auth);
 
 const [editing, setEditing] = useState(false);
 const [description, setDescription] = useState("");
 const [location, setLocation] = useState("");
 const [editingPicture, setEditingPicture] = useState(false);
 const [newProfilePicture, setNewProfilePicture] = useState("");

 useEffect(() => {
   if (!isAuthenticated) {
     navigation.navigate('Login');
   }
 }, [isAuthenticated, navigation]);

 useEffect(() => {
   if (user) {
     setDescription(user.description || "");
     setLocation(user.location || "");
   }
 }, [user]);

 const handlePhotoUpload = async () => {
   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
   
   if (permissionResult.granted === false) {
     Alert.alert('Permission required', 'Please allow access to your photo library');
     return;
   }

   const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [1, 1],
     quality: 1,
   });

   if (!result.canceled) {
     setNewProfilePicture(result.assets[0].uri);
     setEditingPicture(false);
   }
 };

 const handleTakePhoto = async () => {
   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

   if (permissionResult.granted === false) {
     Alert.alert('Permission required', 'Please allow access to your camera');
     return;
   }

   const result = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [1, 1],
     quality: 1,
   });

   if (!result.canceled) {
     setNewProfilePicture(result.assets[0].uri);
     setEditingPicture(false);
   }
 };

 const handleSave = () => {
   setEditing(false);
   Alert.alert('Success', 'Profile updated successfully');
 };

 const handleDeleteAccount = () => {
   Alert.alert(
     "Delete Account",
     "Are you sure? This action cannot be undone.",
     [
       { text: "Cancel", style: "cancel" },
       { 
         text: "Delete", 
         style: "destructive", 
         onPress: () => navigation.navigate('Login')
       }
     ]
   );
 };

 const handleLogout = () => {
   Alert.alert(
     "Logout",
     "Are you sure you want to logout?",
     [
       { text: "Cancel", style: "cancel" },
       { 
         text: "Logout", 
         onPress: () => navigation.navigate('Login')
       }
     ]
   );
 };

 if (!user || !isAuthenticated) return null;

 return (
   <Layout>
     <ScrollView style={styles.container}>
       <View style={styles.header}>
         <TouchableOpacity onPress={() => setEditingPicture(true)}>
           <View style={styles.avatarContainer}>
             <Image 
               source={{ uri: newProfilePicture || user.avatar }}
               style={styles.avatar}
             />
             <View style={styles.editIcon}>
               <Icon name="edit" size={20} color={colors.white} />
             </View>
           </View>
         </TouchableOpacity>
         <Text style={styles.name}>{user.name}</Text>
         <Text style={styles.email}>{user.email}</Text>
       </View>

       <View style={styles.section}>
         <Text style={styles.sectionTitle}>About Me</Text>
         {editing ? (
           <>
             <TextInput
               multiline
               style={styles.input}
               value={description}
               onChangeText={setDescription}
               placeholder="Add description..."
             />
             <TextInput
               style={styles.input}
               value={location}
               onChangeText={setLocation}
               placeholder="Add location..."
             />
             <TouchableOpacity 
               style={styles.button}
               onPress={handleSave}
             >
               <Text style={styles.buttonText}>Save</Text>
             </TouchableOpacity>
           </>
         ) : (
           <>
             <Text style={styles.text}>{description || "No description added yet."}</Text>
             <Text style={styles.text}>Location: {location || "No location added yet."}</Text>
             <TouchableOpacity 
               style={styles.button}
               onPress={() => setEditing(true)}
             >
               <Text style={styles.buttonText}>Edit</Text>
             </TouchableOpacity>
           </>
         )}
       </View>

       <TouchableOpacity 
         style={styles.button} 
         onPress={() => Alert.alert("Change Password", "Feature coming soon")}
       >
         <Text style={styles.buttonText}>Change Password</Text>
       </TouchableOpacity>

       <TouchableOpacity 
         style={[styles.button, styles.deleteButton]} 
         onPress={handleDeleteAccount}
       >
         <Text style={styles.buttonText}>Delete Account</Text>
       </TouchableOpacity>

       <TouchableOpacity 
         style={[styles.button, styles.logoutButton]} 
         onPress={handleLogout}
       >
         <Text style={styles.buttonText}>Logout</Text>
       </TouchableOpacity>

       <Modal
         visible={editingPicture}
         animationType="slide"
         transparent={true}
       >
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <Text style={styles.modalTitle}>Update Profile Picture</Text>
             
             <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
               <Icon name="camera-alt" size={24} color={colors.primary} />
               <Text style={styles.modalButtonText}>Take Photo</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.modalButton} onPress={handlePhotoUpload}>
               <Icon name="photo-library" size={24} color={colors.primary} />
               <Text style={styles.modalButtonText}>Choose from Device</Text>
             </TouchableOpacity>

             <TouchableOpacity 
               style={[styles.modalButton, styles.deleteButton]}
               onPress={() => {
                 setNewProfilePicture("");
                 setEditingPicture(false);
               }}
             >
               <Icon name="delete" size={24} color="#ff4444" />
               <Text style={[styles.modalButtonText, { color: "#ff4444" }]}>
                 Delete Current Photo
               </Text>
             </TouchableOpacity>

             <TouchableOpacity 
               style={styles.closeButton}
               onPress={() => setEditingPicture(false)}
             >
               <Text style={styles.closeButtonText}>Close</Text>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>
     </ScrollView>
   </Layout>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: colors.background,
 },
 header: {
   alignItems: 'center',
   padding: 20,
 },
 avatarContainer: {
   position: 'relative',
 },
 avatar: {
   width: 120,
   height: 120,
   borderRadius: 60,
   backgroundColor: '#ddd'
 },
 editIcon: {
   position: 'absolute',
   bottom: 0,
   right: 0,
   backgroundColor: colors.primary,
   borderRadius: 15,
   padding: 5,
 },
 name: {
   fontSize: 24,
   fontWeight: '600',
   color: colors.primary,
   marginTop: 10,
 },
 email: {
   color: colors.primary,
 },
 section: {
   padding: 20,
 },
 sectionTitle: {
   fontSize: 20,
   fontWeight: '600',
   color: colors.primary,
   marginBottom: 10,
 },
 input: {
   backgroundColor: colors.white,
   padding: 10,
   borderRadius: 8,
   marginBottom: 10,
 },
 text: {
   color: colors.primary,
   marginBottom: 5,
 },
 button: {
   backgroundColor: colors.secondary,
   padding: 15,
   borderRadius: 8,
   alignItems: 'center',
   marginHorizontal: 20,
   marginBottom: 10,
 },
 buttonText: {
   color: colors.white,
   fontWeight: '600',
 },
 deleteButton: {
   backgroundColor: '#ff4444',
 },
 logoutButton: {
   backgroundColor: colors.primary,
 },
 modalContainer: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'rgba(0,0,0,0.5)',
 },
 modalContent: {
   backgroundColor: colors.white,
   margin: 20,
   padding: 20,
   borderRadius: 8,
 },
 modalTitle: {
   fontSize: 20,
   fontWeight: '600',
   marginBottom: 20,
   color: colors.primary,
 },
 modalButton: {
   flexDirection: 'row',
   alignItems: 'center',
   padding: 15,
   borderWidth: 1,
   borderColor: colors.primary,
   borderRadius: 8,
   marginBottom: 10,
 },
 modalButtonText: {
   marginLeft: 10,
   color: colors.primary,
 },
 closeButton: {
   marginTop: 10,
   padding: 15,
   alignItems: 'center',
 },
 closeButtonText: {
   color: colors.primary,
   fontWeight: '600',
 },
});

export default Profile;