import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../features/eventSlice/eventSlice';

const colors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF"
};

const AdminEvents = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => state.auth);
  const { events, isLoading } = useSelector(state => state.events);

  useEffect(() => {
    if (!isAdmin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }]
      });
      return;
    }
    dispatch(fetchEvents());
  }, [isAdmin, dispatch, navigation]);

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
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={EmptyListView}
      />
      <FAB onPress={() => navigation.navigate('CreateEvent')} />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.title}>Events Management</Text>
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
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.secondary} />
    <Text style={styles.loadingText}>Loading Events...</Text>
  </View>
);

const EmptyListView = () => (
  <View style={styles.emptyContainer}>
    <Icon name="event" size={64} color={colors.primary} style={styles.emptyIcon} />
    <Text style={styles.emptyTitle}>No Events Found</Text>
    <Text style={styles.emptySubtitle}>Create your first event!</Text>
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
    backgroundColor: colors.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  loadingText: {
    marginTop: 16,
    color: colors.primary,
    fontSize: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyIcon: {
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center'
  }
});

export default AdminEvents;