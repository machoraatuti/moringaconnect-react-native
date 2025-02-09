import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ConnectionsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  
  const connections = [
    {
      id: 1,
      name: 'Sarah Kimani',
      role: 'Software Engineer',
      company: 'Google',
      batch: '2022',
      location: 'Nairobi, Kenya',
      image: require('../assets/images/avatar-dir-1.jpeg'),
      mutual: 15
    },
    {
      id: 2,
      name: 'John Mwangi',
      role: 'UI/UX Designer',
      company: 'Microsoft',
      batch: '2023',
      location: 'Mombasa, Kenya',
      image: require('../assets/images/avatar-dir-2.jpeg'),
      mutual: 8
    },
    {
      id: 3,
      name: 'Alice Njeri',
      role: 'Data Scientist',
      company: 'Safaricom',
      batch: '2021',
      location: 'Nakuru, Kenya',
      image: require('../assets/images/avatar-dir-3.jpeg'),
      mutual: 12
    },
    {
      id: 4,
      name: 'Mike Omondi',
      role: 'DevOps Engineer',
      company: 'Amazon',
      batch: '2023',
      location: 'Remote',
      image: require('../assets/images/avatar-dir-4.jpeg'),
      mutual: 5
    },
    {
      id: 5,
      name: 'Grace Wanjiku',
      role: 'Product Manager',
      company: 'Meta',
      batch: '2022',
      location: 'Nairobi, Kenya',
      image: require('../assets/images/avatar-dir-1.jpeg'),
      mutual: 20
    }
  ];

  const renderConnection = (connection) => (
    <TouchableOpacity 
      key={connection.id} 
      style={styles.connectionCard}
      onPress={() => navigation.navigate('ConnectionProfile', { connection })}
    >
      <Image source={connection.image} style={styles.profileImage} />
      <View style={styles.connectionInfo}>
        <Text style={styles.name}>{connection.name}</Text>
        <Text style={styles.role}>{connection.role}</Text>
        <Text style={styles.company}>{connection.company}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.location}>{connection.location}</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.batch}>Batch of {connection.batch}</Text>
          <Text style={styles.mutual}>{connection.mutual} mutual connections</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble-outline" size={20} color="#E67E4D" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Ionicons name="menu" size={28} color="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Connections</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#E67E4D" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search connections..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>60</Text>
          <Text style={styles.statLabel}>Total Connections</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Same Batch</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>35</Text>
          <Text style={styles.statLabel}>Other Batches</Text>
        </View>
      </View>

      <ScrollView style={styles.connectionsList}>
        {connections.map(connection => renderConnection(connection))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="person-add" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '(rgba(10, 31, 68, 0.8))',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E67E4D',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  connectionsList: {
    flex: 1,
    padding: 16,
  },
  connectionCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  connectionInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  company: {
    fontSize: 14,
    color: '#E67E4D',
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  batch: {
    fontSize: 12,
    color: '#666',
  },
  mutual: {
    fontSize: 12,
    color: '#666',
  },
  messageButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E67E4D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ConnectionsScreen;