// screens/AdminEvents.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Modal, TextInput, Image, StyleSheet,
  FlatList, Alert, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import { colors, eventTypes } from '../constants';
import { fetchEvents, updateEventStatus, deleteEvent } from '../redux/slices/eventSlice';

const AdminEvents = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => state.auth);
  const { events, isLoading, errMess } = useSelector(state => state.events);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigation.navigate('Login');
    } else {
      dispatch(fetchEvents());
    }
  }, [isAdmin]);

  const handleStatusChange = async (newStatus) => {
    try {
      await dispatch(updateEventStatus({ 
        eventId: selectedEvent.id, 
        status: newStatus 
      })).unwrap();
      Alert.alert('Success', `Event status updated to ${newStatus}`);
      setActionModalVisible(false);
      dispatch(fetchEvents());
    } catch (error) {
      Alert.alert('Error', 'Failed to update event status');
    }
  };

  const handleDeleteEvent = async () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteEvent(selectedEvent.id)).unwrap();
              Alert.alert('Success', 'Event deleted successfully');
              setActionModalVisible(false);
              dispatch(fetchEvents());
            } catch (error) {
              Alert.alert('Error', 'Failed to delete event');
            }
          }
        }
      ]
    );
  };

  const renderActionModal = () => (
    <Modal
      visible={actionModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setActionModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.actionModalContent}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusChange('completed')}
          >
            <Icon name="check" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Mark as Completed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusChange('cancelled')}
          >
            <Icon name="event-busy" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Cancel Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusChange('rescheduled')}
          >
            <Icon name="schedule" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Reschedule Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDeleteEvent}
          >
            <Icon name="delete" size={24} color="red" />
            <Text style={[styles.actionButtonText, { color: 'red' }]}>Delete Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => setActionModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Event Management</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setCreateModalVisible(true)}
        >
          <Icon name="add" size={24} color={colors.white} />
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onActionPress={() => {
              setSelectedEvent(item);
              setActionModalVisible(true);
            }}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
      />

      <CreateEventModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSuccess={() => {
          setCreateModalVisible(false);
          dispatch(fetchEvents());
        }}
      />

      {renderActionModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  eventsList: {
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  actionModalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  actionButtonText: {
    marginLeft: 16,
    fontSize: 16,
    color: colors.primary,
  },
  deleteButton: {
    borderBottomWidth: 0,
  },
  cancelButton: {
    marginTop: 8,
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminEvents;