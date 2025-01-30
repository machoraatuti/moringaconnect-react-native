import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventCard from '../components/EventCard';
import { colors } from '../constants';
import { fetchEvents } from '../redux/slices/eventSlice';

const AdminEvents = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => state.auth);
  const { events, isLoading } = useSelector(state => state.events);

  useEffect(() => {
    if (!isAdmin) {
      navigation.navigate('Login');
      return;
    }
    dispatch(fetchEvents());
  }, [isAdmin]);

  const handleEventPress = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard 
            event={item}
            onPress={() => handleEventPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB onPress={() => navigation.navigate('CreateEvent')} />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.title}>Events</Text>
    <TouchableOpacity 
      onPress={() => navigation.navigate('CreateEvent')}
      style={styles.headerButton}
    >
      <Icon name="add" size={24} color={colors.white} />
    </TouchableOpacity>
  </View>
);

const FAB = ({ onPress }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress}>
    <Icon name="add" size={24} color={colors.white} />
  </TouchableOpacity>
);

const LoadingView = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white
  },
  headerButton: {
    padding: 8,
    borderRadius: 8
  },
  list: {
    padding: 16
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AdminEvents;