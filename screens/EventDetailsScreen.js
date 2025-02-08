import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  primary: "#E67E4D",
  secondary: "#27174D",
  background: "#FFFFFF",
  grey: "#666666",
  lightGrey: "#EEEEEE",
};

const EventDetailsScreen = ({ route, navigation }) => {
  const event = route.params.event;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${event.title} on ${event.date} at ${event.location}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRegister = () => {
    // Handle registration logic
    console.log('Register for event:', event.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <TouchableOpacity 
          onPress={handleShare}
          style={styles.shareButton}
        >
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Event Image */}
        <Image 
          source={event.image}
          style={styles.eventImage}
        />

        {/* Status Badge */}
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: `${colors.primary}15` }]}>
            <Text style={styles.badgeText}>
              {event.attendance}/{event.maxCapacity} spots remaining
            </Text>
          </View>
          {event.attendance < event.maxCapacity && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Registration Open</Text>
            </View>
          )}
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="calendar-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailText}>{event.date}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="time-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailText}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailText}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="people-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Attendance</Text>
                <Text style={styles.detailText}>
                  {event.attendance} registered out of {event.maxCapacity} spots
                </Text>
              </View>
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>What to Expect</Text>
            <View style={styles.expectationsList}>
              <View style={styles.expectationItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={styles.expectationText}>Networking opportunities with industry professionals</Text>
              </View>
              <View style={styles.expectationItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={styles.expectationText}>Interactive sessions and workshops</Text>
              </View>
              <View style={styles.expectationItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={styles.expectationText}>Certificate of participation</Text>
              </View>
            </View>
          </View>

          {/* Organizer Info */}
          <View style={styles.organizerSection}>
            <Text style={styles.sectionTitle}>Organizer</Text>
            <View style={styles.organizerCard}>
              <Image 
                source={require('../assets/images/moringalogo.png')}
                style={styles.organizerLogo}
              />
              <View style={styles.organizerInfo}>
                <Text style={styles.organizerName}>Moringa School</Text>
                <Text style={styles.organizerRole}>Event Organizer</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Register Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  eventImage: {
    width: '100%',
    height: 240,
  },
  badgeContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '500',
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.grey,
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 40,
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.grey,
  },
  detailText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '500',
    marginTop: 2,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 16,
  },
  expectationsList: {
    gap: 12,
  },
  expectationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  expectationText: {
    flex: 1,
    fontSize: 16,
    color: colors.grey,
  },
  organizerSection: {
    marginBottom: 100,
  },
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  organizerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  organizerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  organizerRole: {
    fontSize: 14,
    color: colors.grey,
  },
  contactButton: {
    padding: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
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

export default EventDetailsScreen;