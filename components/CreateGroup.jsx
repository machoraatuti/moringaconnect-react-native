import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { createGroup } from '../features/groupSlice/groupSlice';
import { baseUrl } from '../shared/baseUrl';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const categories = ['Software Engineering', 'Design', 'Data Science'];

const CreateGroup = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    category: ''
  });

  const handleSubmit = async () => {
    if (!groupData.name || !groupData.description || !groupData.category) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await fetch(baseUrl + 'groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      const newGroup = await response.json();
      dispatch(createGroup(newGroup));
      Alert.alert('Success', 'Group created successfully');
      setGroupData({ name: '', description: '', category: '' });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create group. Try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create New Group</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Group Name"
            value={groupData.name}
            onChangeText={(text) => setGroupData({ ...groupData, name: text })}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={groupData.category}
              onValueChange={(value) => setGroupData({ ...groupData, category: value })}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Group Description"
            multiline
            numberOfLines={4}
            value={groupData.description}
            onChangeText={(text) => setGroupData({ ...groupData, description: text })}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary
  },
  closeButton: {
    fontSize: 24,
    color: colors.primary
  },
  input: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    marginBottom: 16
  },
  picker: {
    height: 50
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center'
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.primary
  },
  submitButton: {
    backgroundColor: colors.secondary
  },
  cancelButtonText: {
    color: colors.primary
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: 'bold'
  }
});

export default CreateGroup;