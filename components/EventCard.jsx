// components/EventCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants';

const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return colors.primary;
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'orange';
  }
};

const EventCard = ({ event, onActionPress }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: event.image || 'https://via.placeholder.com/300' }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <TouchableOpacity onPress={onActionPress}>
            <Icon name="more-vert" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.statusChip, { backgroundColor: getStatusColor(event.status) }]}>
          <Text style={styles.statusText}>{event.status}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
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
  },
  description: {
    color: 'gray',
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
    color: 'gray',
    fontSize: 14,
  },
});

export default EventCard;