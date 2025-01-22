import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import Layout from '../shared/Layout';
import { 
  fetchPosts, 
  selectAllPosts, 
  selectPostsLoading, 
  selectPostsError 
} from '../features/postSlice/postSlice';
import CreatePost from '../components/CreatePost'; // Assuming this component exists
import PostCard from '../components/PostCard';     // Assuming this component exists

const colors = {
 primary: '#0A1F44',
 secondary: '#F05A28', 
 background: '#FFF5F2',
 white: '#FFFFFF'
};

const Posts = () => {
  // Redux state selectors
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  // Local component state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Categories for filtering
  const categories = ['all', 'Technology', 'Career', 'Education', 'Events', 'Projects', 'Other'];

  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handler for post creation
  const handlePostCreated = () => {
    setShowCreatePost(false);
    dispatch(fetchPosts());
  };

  // Render loading state
  if (loading) {
    return (
      <Layout>
        <View style={styles.centeredContainer}>
          <Text>Loading posts...</Text>
        </View>
      </Layout>
    );
  }

  // Render error state
  if (error) {
    return (
      <Layout>
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        {/* Header with title and create post button */}
        <View style={styles.header}>
          <Text style={styles.title}>Posts</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreatePost(true)}
          >
            <Icon name="add" size={24} color={colors.white} />
            <Text style={styles.buttonText}>Create Post</Text>
          </TouchableOpacity>
        </View>

        {/* Search and filter section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={24} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search posts..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          
          <Picker
            selectedValue={categoryFilter}
            style={styles.picker}
            onValueChange={setCategoryFilter}
          >
            {categories.map(category => (
              <Picker.Item 
                key={category} 
                label={category.charAt(0).toUpperCase() + category.slice(1)} 
                value={category} 
              />
            ))}
          </Picker>
        </View>

        {/* Posts list */}
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No posts found. {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your filters.' 
                  : 'Be the first to create one!'}
              </Text>
            </View>
          )}
        />

        {/* Create post modal */}
        <Modal
          visible={showCreatePost}
          animationType="slide"
          onRequestClose={() => setShowCreatePost(false)}
        >
          <CreatePost onClose={handlePostCreated} />
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles remain the same)
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});

export default Posts;