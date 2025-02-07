import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Modal, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const colors = {
  primary: "#0A1F44",
  secondary: "#F05A28", 
  background: "#FFF5F2",
  white: "#FFFFFF",
  textGray: "#666666",
  borderColor: "#E0E0E0"
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(state => state.auth);
  
  const [editingPicture, setEditingPicture] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [showActivity, setShowActivity] = useState(true);
  const [showDonationDate, setShowDonationDate] = useState(false);
  const [allowConnection, setAllowConnection] = useState(false);

  const handlePhotoUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => setEditingPicture(true)} style={styles.avatarContainer}>
          <Image 
            source={{ uri: newProfilePicture || user?.avatar }}
            style={styles.avatar}
          />
          <View style={styles.plusIconContainer}>
            <Icon name="add" size={20} color={colors.white} />
          </View>
        </TouchableOpacity>
        
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Anitta Vinter</Text>
          <Text style={styles.role}>Alumni</Text>
          <Text style={styles.designation}>Designer (UI/UX) 2023</Text>
        </View>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.experienceItem}>
          <Text style={styles.jobTitle}>Designer (UI/UX)</Text>
          <Text style={styles.jobPeriod}>2024-2025</Text>
          <Text style={styles.company}>Alléen/Anteroz Company</Text>
        </View>
      </View>

      {/* Activity Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <Text style={styles.activityText}>Attended Tech events and start-ups.</Text>
      </View>

      {/* General Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Activity</Text>
            <Text style={styles.settingDescription}>Allow users to see your activity</Text>
          </View>
          <Switch
            value={showActivity}
            onValueChange={setShowActivity}
            trackColor={{ false: colors.borderColor, true: colors.secondary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Show Donation Date</Text>
            <Text style={styles.settingDescription}>Donation date is displayed to other users</Text>
          </View>
          <Switch
            value={showDonationDate}
            onValueChange={setShowDonationDate}
            trackColor={{ false: colors.borderColor, true: colors.secondary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Allow users to connect</Text>
            <Text style={styles.settingDescription}>Allows people to message you on app directly</Text>
          </View>
          <Switch
            value={allowConnection}
            onValueChange={setAllowConnection}
            trackColor={{ false: colors.borderColor, true: colors.secondary }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Photo Upload Modal */}
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
              style={styles.closeButton}
              onPress={() => setEditingPicture(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  avatarContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd'
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginTop: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
  },
  role: {
    fontSize: 16,
    color: colors.textGray,
    marginTop: 4,
  },
  designation: {
    fontSize: 16,
    color: colors.textGray,
    marginTop: 2,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.secondary,
    marginBottom: 12,
  },
  experienceItem: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  jobPeriod: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 2,
  },
  company: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 2,
  },
  activityText: {
    fontSize: 14,
    color: colors.textGray,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.primary,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: colors.secondary,
    margin: 16,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
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