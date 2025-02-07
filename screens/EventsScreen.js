import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
  fetchEvents, 
  selectAllEvents, 
  selectEventsLoading, 
  selectEventsError 
} from '../features/eventSlice/eventSlice';

const colors = {
  primary: "#E67E4D",     // Orange theme color
  secondary: "#27174D",   // Dark purple for text
  background: "#FFFFFF",  // White background
  grey: "#666666",       // Grey for secondary text
  lightGrey: "#EEEEEE",  // Light grey for borders
};

const getStatusColor = (status) => {
  const statusColors = {
    upcoming: colors.primary,
    completed: "#4CAF50",
    cancelled: "#F44336",
    rescheduled: "#FFC107"
  };
  return statusColors[status] || colors.primary;
};

const UserEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const EventCard = ({ event }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => setSelectedEvent(event)}
    >
      <Image 
        source={{ uri: event.image }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(event.status)}15` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(event.status) }]}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Text>
        </View>

        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{event.description}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color={colors.primary} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const LoadingScreen = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );

  const ErrorScreen = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {loading ? <LoadingScreen /> : error ? <ErrorScreen /> : (
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventsList}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        </ScrollView>
      )}

      <Modal
        visible={!!selectedEvent}
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedEvent(null)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Event Details</Text>
            <View style={styles.modalHeaderPlaceholder} />
          </View>

          <ScrollView>
            {selectedEvent && (
              <View style={styles.modalContent}>
                <Image 
                  source={{ uri: selectedEvent.image }}
                  style={styles.modalImage}
                />
                
                <View style={styles.modalBody}>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: `${getStatusColor(selectedEvent.status)}15` 
                  }]}>
                    <Text style={[styles.statusText, { 
                      color: getStatusColor(selectedEvent.status) 
                    }]}>
                      {selectedEvent.status}
                    </Text>
                  </View>

                  <Text style={styles.modalEventTitle}>{selectedEvent.title}</Text>
                  <Text style={styles.modalDescription}>{selectedEvent.description}</Text>

                  <View style={styles.detailsGrid}>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>{selectedEvent.date}</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailLabel}>Time</Text>
                      <Text style={styles.detailValue}>{selectedEvent.time}</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailLabel}>Location</Text>
                      <Text style={styles.detailValue}>{selectedEvent.location}</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailLabel}>Attendance</Text>
                      <Text style={styles.detailValue}>
                        {selectedEvent.attendance}/{selectedEvent.maxCapacity}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Register for Event</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.secondary,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
  },
  eventsList: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 8,
  },
  description: {
    color: colors.grey,
    marginBottom: 16,
    lineHeight: 20,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: colors.grey,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
  },
  modalHeaderPlaceholder: {
    width: 24,
  },
  modalImage: {
    height: 240,
    width: '100%',
  },
  modalBody: {
    padding: 16,
  },
  modalEventTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 8,
  },
  modalDescription: {
    color: colors.grey,
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  detailBlock: {
    width: '50%',
    padding: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserEvents;