import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockEvents = [
  {
    id: 1,
    title: 'Tech Career Fair 2024',
    description: 'Join us for a day of networking with top tech companies. Meet recruiters, attend workshops, and explore job opportunities.',
    date: 'March 15, 2024',
    time: '9:00 AM - 4:00 PM',
    location: 'Nairobi Garage, Kilimani',
    status: 'upcoming',
    image: require('../assets/images/cybersecurity.jpg'),
    attendance: 150,
    maxCapacity: 200
  },
  {
    id: 2,
    title: 'Alumni Networking Night',
    description: 'An evening of networking and sharing experiences with fellow alumni. Light refreshments will be served.',
    date: 'March 20, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Moringa School, Ngong Road',
    status: 'upcoming',
    image: require('../assets/images/graduation.jpg'),
    attendance: 80,
    maxCapacity: 100
  },
  {
    id: 3,
    title: 'Web Development Workshop',
    description: 'Learn the latest web development technologies and best practices from industry experts.',
    date: 'April 5, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'Virtual Event',
    status: 'upcoming',
    image: require('../assets/images/hiking.jpg'),
    attendance: 200,
    maxCapacity: 300
  },
  {
    id: 4,
    title: 'Data Science Bootcamp',
    description: 'Intensive one-day bootcamp covering data analysis, machine learning, and practical applications.',
    date: 'March 25, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'iHub, Senteu Plaza',
    status: 'upcoming',
    image: require('../assets/images/bootcamp.jpg'),
    attendance: 45,
    maxCapacity: 50
  }
];

const colors = {
  primary: "(rgba(10, 31, 68, 0.8))",
  secondary: "#27174D",
  background: "#FFFFFF",
  grey: "#666666",
  lightGrey: "#EEEEEE",
};

const EventsScreen = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderEventCard = (event) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventCard}
      onPress={() => setSelectedEvent(event)}
    >
      <Image 
        source={event.image}
        style={styles.eventImage}
      />
      <View style={styles.eventContent}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{event.date}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {event.attendance}/{event.maxCapacity} spots
            </Text>
          </View>
        </View>
        
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Ionicons name="menu" size={28} color="#FFF" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#E67E4D" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={styles.activeFilterText}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Past Events</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsList}>
          {mockEvents.map(event => renderEventCard(event))}
        </View>
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={!!selectedEvent}
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setSelectedEvent(null)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Event Details</Text>
            <View style={{ width: 24 }} />
          </View>

          {selectedEvent && (
            <ScrollView>
              <Image 
                source={selectedEvent.image}
                style={styles.modalImage}
              />
              <View style={styles.modalContent}>
                <Text style={styles.modalEventTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalDescription}>{selectedEvent.description}</Text>

                <View style={styles.modalDetailCard}>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                    <Text style={styles.modalDetailText}>{selectedEvent.date}</Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="time-outline" size={20} color={colors.primary} />
                    <Text style={styles.modalDetailText}>{selectedEvent.time}</Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="location-outline" size={20} color={colors.primary} />
                    <Text style={styles.modalDetailText}>{selectedEvent.location}</Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="people-outline" size={20} color={colors.primary} />
                    <Text style={styles.modalDetailText}>
                      {selectedEvent.attendance} attending out of {selectedEvent.maxCapacity} spots
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Register Now</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
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
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.primary,
  },
  activeFilterText: {
    color: colors.background,
  },
  eventsList: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    color: colors.primary,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: `${colors.primary}15`,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  eventDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: colors.grey,
    fontSize: 14,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
  },
  modalImage: {
    width: '100%',
    height: 240,
  },
  modalContent: {
    padding: 16,
  },
  modalEventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    color: colors.grey,
    lineHeight: 24,
    marginBottom: 24,
  },
  modalDetailCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalDetailText: {
    fontSize: 16,
    color: colors.secondary,
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

export default EventsScreen;