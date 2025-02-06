// SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'People', 'Groups', 'Events', 'Posts'];

  const searchResults = [
    { id: '1', type: 'People', title: 'John Doe', subtitle: 'Software Developer' },
    { id: '2', type: 'Groups', title: 'Tech Enthusiasts', subtitle: '1.2k members' },
    { id: '3', type: 'Events', title: 'Annual Meetup', subtitle: 'Dec 24, 2024' },
    // Add more search results as needed
  ];

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity style={styles.searchItem}>
      <View style={styles.searchItemLeft}>
        <Icon
          name={item.type === 'People' ? 'user' : item.type === 'Groups' ? 'users' : 'calendar'}
          type="font-awesome"
          size={24}
          color="#666"
        />
        <View style={styles.searchItemContent}>
          <Text style={styles.searchItemTitle}>{item.title}</Text>
          <Text style={styles.searchItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
    </TouchableOpacity>
  );

  const filteredResults = activeFilter === 'All'
    ? searchResults
    : searchResults.filter(item => item.type === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="font-awesome" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredResults}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.id}
        style={styles.resultsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    padding: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilterButton: {
    backgroundColor: '#f4511e',
    borderColor: '#f4511e',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  resultsList: {
    flex: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchItemContent: {
    marginLeft: 12,
  },
  searchItemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  searchItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default SearchScreen;