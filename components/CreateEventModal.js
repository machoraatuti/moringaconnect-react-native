// components/CreateEventModal.js
import React, { useState } from 'react';
import {
  View, Text, Modal, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, Image, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { createEvent } from '../redux/slices/eventSlice';
import { colors, eventTypes } from '../constants';

const CreateEventModal = ({ visible, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: '',
    description: '',
    location: '',
    capacity: '',
    registrationDeadline: '',
    contactPerson: '',
    contactEmail: '',
    image: null,
  });

  const [showPicker, setShowPicker] = useState({
    date: false,
    startTime: false,
    endTime: false,
    deadline: false,
  });

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    }, (response) => {
      if (!response.didCancel && !response.error) {
        setFormData({ ...formData, image: response.assets[0] });
      }
    });
  };

  const handleDateConfirm = (date, field) => {
    if (field === 'date' || field === 'registrationDeadline') {
      setFormData({ 
        ...formData, 
        [field]: date.toISOString().split('T')[0] 
      });
    } else {
      const timeString = date.toTimeString().split(' ')[0].substring(0, 5);
      setFormData({ ...formData, [field]: timeString });
    }
    setShowPicker({ ...showPicker, [field]: false });
  };

  const validateForm = () => {
    const requiredFields = [
      'title', 'date', 'startTime', 'endTime', 'type',
      'description', 'location', 'capacity', 'registrationDeadline',
      'contactPerson', 'contactEmail'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      Alert.alert('Required Fields', `Please fill in: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const eventFormData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          eventFormData.append('image', {
            uri: formData[key].uri,
            type: formData[key].type,
            name: formData[key].fileName
          });
        } else {
          eventFormData.append(key, formData[key]);
        }
      });

      await dispatch(createEvent(eventFormData)).unwrap();
      Alert.alert('Success', 'Event created successfully');
      onSuccess();
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Event</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowPicker({ ...showPicker, date: true })}
          >
            <Text style={formData.date ? styles.inputText : styles.placeholder}>
              {formData.date || 'Select Date'}
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.input, styles.halfInput]}
              onPress={() => setShowPicker({ ...showPicker, startTime: true })}
            >
              <Text style={formData.startTime ? styles.inputText : styles.placeholder}>
                {formData.startTime || 'Start Time'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.input, styles.halfInput]}
              onPress={() => setShowPicker({ ...showPicker, endTime: true })}
            >
              <Text style={formData.endTime ? styles.inputText : styles.placeholder}>
                {formData.endTime || 'End Time'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
              style={styles.picker}
            >
              <Picker.Item label="Select Event Type" value="" />
              {eventTypes.map(type => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Capacity"
            keyboardType="numeric"
            value={formData.capacity}
            onChangeText={(text) => setFormData({ ...formData, capacity: text })}
          />

          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowPicker({ ...showPicker, deadline: true })}
          >
            <Text style={formData.registrationDeadline ? styles.inputText : styles.placeholder}>
              {formData.registrationDeadline || 'Registration Deadline'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Contact Person"
            value={formData.contactPerson}
            onChangeText={(text) => setFormData({ ...formData, contactPerson: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Contact Email"
            keyboardType="email-address"
            value={formData.contactEmail}
            onChangeText={(text) => setFormData({ ...formData, contactEmail: text })}
          />

          <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
            <Icon name="add-photo-alternate" size={24} color={colors.secondary} />
            <Text style={styles.imageButtonText}>
              {formData.image ? 'Change Image' : 'Add Event Image'}
            </Text>
          </TouchableOpacity>

          {formData.image && (
            <Image
              source={{ uri: formData.image.uri }}
              style={styles.imagePreview}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Event</Text>
          </TouchableOpacity>
        </ScrollView>

        <DateTimePickerModal
          isVisible={showPicker.date}
          mode="date"
          onConfirm={(date) => handleDateConfirm(date, 'date')}
          onCancel={() => setShowPicker({ ...showPicker, date: false })}
        />

        <DateTimePickerModal
          isVisible={showPicker.startTime}
          mode="time"
          onConfirm={(date) => handleDateConfirm(date, 'startTime')}
          onCancel={() => setShowPicker({ ...showPicker, startTime: false })}
        />

        <DateTimePickerModal
          isVisible={showPicker.endTime}
          mode="time"
          onConfirm={(date) => handleDateConfirm(date, 'endTime')}
          onCancel={() => setShowPicker({ ...showPicker, endTime: false })}
        />

        <DateTimePickerModal
          isVisible={showPicker.deadline}
          mode="date"
          onConfirm={(date) => handleDateConfirm(date, 'registrationDeadline')}
          onCancel={() => setShowPicker({ ...showPicker, deadline: false })}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
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
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.secondary,
    borderRadius: 8,
    marginBottom: 16,
  },
  imageButtonText: {
    marginLeft: 8,
    color: colors.secondary,
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder: {
    color: 'gray',
  },
  inputText: {
    color: colors.primary,
  },
});

export default CreateEventModal;