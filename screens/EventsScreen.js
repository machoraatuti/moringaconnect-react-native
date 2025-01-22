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
 ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchEvents, 
  selectAllEvents, 
  selectEventsLoading, 
  selectEventsError  } from '../features/eventSlice/eventSlice';

import Layout from '../shared/Layout';

const colors = {
 primary: "#0A1F44",
 secondary: "#F05A28", 
 background: "#FFF5F2",
 white: "#FFFFFF",
 success: "#4CAF50",
 warning: "#FFC107",
 error: "#F44336"
};

const getStatusColor = (status) => {
 const statusColors = {
   upcoming: colors.primary,
   completed: colors.success,
   cancelled: colors.error,
   rescheduled: colors.warning
 };
 return statusColors[status] || colors.primary;
};

const UserEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);  // Correctly selects events
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

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
       <View style={[styles.chip, { backgroundColor: `${getStatusColor(event.status)}15` }]}>
         <Text style={[styles.chipText, { color: getStatusColor(event.status) }]}>
           {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
         </Text>
       </View>

       <Text style={styles.title}>{event.title}</Text>
       <Text style={styles.description}>{event.description}</Text>

       <View style={styles.detailsContainer}>
         <View style={styles.detailRow}>
           <Icon name="event" size={18} color={colors.secondary} />
           <Text style={styles.detailText}>{event.date}</Text>
         </View>
         <View style={styles.detailRow}>
           <Icon name="access-time" size={18} color={colors.secondary} />
           <Text style={styles.detailText}>{event.time}</Text>
         </View>
         <View style={styles.detailRow}>
           <Icon name="location-on" size={18} color={colors.secondary} />
           <Text style={styles.detailText}>{event.location}</Text>
         </View>
       </View>
     </View>
   </TouchableOpacity>
 );

 if (loading) {
   return (
     <Layout>
       <View style={styles.loadingContainer}>
         <ActivityIndicator size="large" color={colors.secondary} />
       </View>
     </Layout>
   );
 }

 if (error) {
   return (
     <Layout>
       <View style={styles.errorContainer}>
         <Text style={styles.errorText}>{error}</Text>
       </View>
     </Layout>
   );
 }

 return (
   <Layout>
     <View style={styles.container}>
       <ScrollView>
         <Text style={styles.header}>Upcoming Events</Text>
         <View style={styles.grid}>
           {events.map((event) => (
             <EventCard key={event.id} event={event} />
           ))}
         </View>
       </ScrollView>

       <Modal
         visible={!!selectedEvent}
         animationType="slide"
         onRequestClose={() => setSelectedEvent(null)}
       >
         <View style={styles.modalContainer}>
           <ScrollView>
             {selectedEvent && (
               <View>
                 <Image 
                   source={{ uri: selectedEvent.image }}
                   style={styles.modalImage}
                 />
                 <View style={styles.modalContent}>
                   <View style={[styles.chip, { backgroundColor: `${getStatusColor(selectedEvent.status)}15` }]}>
                     <Text style={[styles.chipText, { color: getStatusColor(selectedEvent.status) }]}>
                       {selectedEvent.status}
                     </Text>
                   </View>

                   <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                   <Text style={styles.modalDescription}>{selectedEvent.description}</Text>

                   <View style={styles.modalGrid}>
                     <View style={styles.gridItem}>
                       <Text style={styles.gridLabel}>Date</Text>
                       <Text style={styles.gridValue}>{selectedEvent.date}</Text>
                     </View>
                     <View style={styles.gridItem}>
                       <Text style={styles.gridLabel}>Time</Text>
                       <Text style={styles.gridValue}>{selectedEvent.time}</Text>
                     </View>
                     <View style={styles.gridItem}>
                       <Text style={styles.gridLabel}>Location</Text>
                       <Text style={styles.gridValue}>{selectedEvent.location}</Text>
                     </View>
                     <View style={styles.gridItem}>
                       <Text style={styles.gridLabel}>Capacity</Text>
                       <Text style={styles.gridValue}>
                         {selectedEvent.attendance} / {selectedEvent.maxCapacity} attendees
                       </Text>
                     </View>
                   </View>
                 </View>

                 <TouchableOpacity
                   style={styles.closeButton}
                   onPress={() => setSelectedEvent(null)}
                 >
                   <Text style={styles.closeButtonText}>Close</Text>
                 </TouchableOpacity>
               </View>
             )}
           </ScrollView>
         </View>
       </Modal>
     </View>
   </Layout>
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
 errorContainer: {
   padding: 16,
 },
 errorText: {
   color: colors.error,
 },
 header: {
   fontSize: 24,
   fontWeight: '600',
   color: colors.primary,
   padding: 16,
 },
 grid: {
   padding: 16,
 },
 card: {
   backgroundColor: colors.white,
   borderRadius: 8,
   marginBottom: 16,
   elevation: 2,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,  
   shadowRadius: 4,
 },
 cardImage: {
   height: 200,
   borderTopLeftRadius: 8,
   borderTopRightRadius: 8,
 },
 cardContent: {
   padding: 16,
 },
 chip: {
   alignSelf: 'flex-start',
   paddingVertical: 4,
   paddingHorizontal: 8,
   borderRadius: 16,
   marginBottom: 8,
 },
 chipText: {
   fontWeight: '500',
 },
 title: {
   fontSize: 18,
   fontWeight: '600', 
   color: colors.primary,
   marginBottom: 8,
 },
 description: {
   color: '#666',
   marginBottom: 16,
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
   color: '#666',
 },
 modalContainer: {
   flex: 1,
   backgroundColor: colors.white,
 },
 modalImage: {
   height: 240,
 },
 modalContent: {
   padding: 16,
 },
 modalTitle: {
   fontSize: 20,
   fontWeight: '600',
   color: colors.primary,
   marginBottom: 8,
 },
 modalDescription: {
   marginBottom: 16,
 },
 modalGrid: {
   flexDirection: 'row',
   flexWrap: 'wrap',
 },
 gridItem: {
   width: '50%',
   padding: 8,
 },
 gridLabel: {
   color: '#666',
   fontSize: 12,
 },
 gridValue: {
   marginTop: 4,
 },
 closeButton: {
   margin: 16,
   padding: 12,
   alignItems: 'center',
 },
 closeButtonText: {
   color: colors.primary,
   fontWeight: '600',
 },
});

export default UserEvents;