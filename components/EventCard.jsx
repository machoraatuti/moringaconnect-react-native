import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF"
};

const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return colors.primary;
    case 'completed':
      return '#2ECC71'; // A green that complements the palette
    case 'cancelled':
      return '#E74C3C'; // A red that works with the color scheme
    default:
      return colors.secondary;
  }
};

const EventCard = ({ event, onPress, onActionPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: event.image || 'https://via.placeholder.com/300' }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          {onActionPress && (
            <TouchableOpacity onPress={onActionPress}>
              <Icon name="more-vert" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View 
          style={[
            styles.statusChip, 
            { backgroundColor: getStatusColor(event.status) }
          ]}
        >
          <Text style={styles.statusText}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {event.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="location-on" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="event" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>
              {new Date(event.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="access-time" size={16} color={colors.secondary} />
            <Text style={styles.detailText}>
              {event.startTime} - {event.endTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
    marginRight: 8,
  },
  statusChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  description: {
    color: '#666',
    marginBottom: 12,
    fontSize: 14,
  },
  details: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#666',
    fontSize: 14,
  },
});

export default EventCard;