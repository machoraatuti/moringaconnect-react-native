import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Make sure to install this package

const HomeScreen = () => {
  const batchmates = [
    { id: 1, name: 'Jasmin', year: '2020-2021', hasUpdate: true },
    { id: 2, name: 'Bella', year: '2021', hasUpdate: true },
    { id: 3, name: 'Vicky', year: '2020-2021', hasUpdate: true },
    { id: 4, name: 'LeRob', year: '2023', hasUpdate: true },
  ];

  const events = [
    {
      id: 1,
      title: 'Importance of Research Principles',
      subtitle: 'Virtual Auditorium 2',
      date: 'Mon, Dec 24',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s',
      image: require('../assets/images/bootcamp.jpg'), // You'll need to add your own images
    },
    {
      id: 2,
      title: 'Forum Discussion',
      subtitle: 'Virtual Auditorium 2',
      date: 'Mon, Dec 24',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s',
      image: require('../assets/images/hiking.jpg'), // You'll need to add your own images
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search in By Grad Year or courses"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Batchmates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect with your Batchmates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.batchmateScroll}>
            {batchmates.map((mate) => (
              <View key={mate.id} style={styles.batchmateCard}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/80' }}
                    style={styles.batchmateImage}
                  />
                  {mate.hasUpdate && <View style={styles.updateDot} />}
                </View>
                <Text style={styles.batchmateName}>{mate.name}</Text>
                <Text style={styles.batchmateYear}>{mate.year}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* News Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>News and Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              source={{ uri: 'https://via.placeholder.com/200x150' }}
              style={styles.newsImage}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/200x150' }}
              style={styles.newsImage}
            />
          </ScrollView>
        </View>

        {/* Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {events.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.eventImage} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {event.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    color: '#f4511e', // Orange color from the image
  },
  batchmateScroll: {
    flexDirection: 'row',
  },
  batchmateCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  batchmateImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  updateDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#f44336',
    borderRadius: 8,
  },
  batchmateName: {
    marginTop: 8,
    fontSize: 14,
  },
  batchmateYear: {
    fontSize: 12,
    color: '#666',
  },
  newsImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});

export default HomeScreen;