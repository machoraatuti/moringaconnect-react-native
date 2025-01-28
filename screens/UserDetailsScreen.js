import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';

const UserDetailsScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company,
    location: user.location,
    avatar: user.avatar
  });

  const handleImagePick = () => {
    if (!isEditing) return;
    
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true
    }, (response) => {
      if (response.assets) {
        setFormData(prev => ({
          ...prev,
          avatar: response.assets[0].uri
        }));
      }
    });
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateUser({ id: user.id, ...formData })).unwrap();
      Alert.alert('Success', 'User updated successfully');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteUser(user.id)).unwrap();
              Alert.alert('Success', 'User deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
        {formData.avatar ? (
          <Image source={{ uri: formData.avatar }} style={styles.avatar} />
        ) : (
          <Icon name="person" size={40} color={colors.primary} />
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, !isEditing && styles.disabled]}
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          editable={isEditing}
        />
        <TextInput
          style={[styles.input, !isEditing && styles.disabled]}
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          editable={isEditing}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, !isEditing && styles.disabled]}
          value={formData.role}
          onChangeText={(text) => setFormData(prev => ({ ...prev, role: text }))}
          editable={isEditing}
        />
        <TextInput
          style={[styles.input, !isEditing && styles.disabled]}
          value={formData.company}
          onChangeText={(text) => setFormData(prev => ({ ...prev, company: text }))}
          editable={isEditing}
        />
        <TextInput
          style={[styles.input, !isEditing && styles.disabled]}
          value={formData.location}
          onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
          editable={isEditing}
        />

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.updateButton]} 
                onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => setIsEditing(false)}
              >
                <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.editButton]} 
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Edit User</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.deleteButton]} 
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete User</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.divider,
    marginVertical: 16,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  form: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  disabled: {
    backgroundColor: colors.divider,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  updateButton: {
    backgroundColor: colors.success,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: colors.divider,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  cancelText: {
    color: colors.primary,
  },
});

export default UserDetailsScreen;