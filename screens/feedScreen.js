import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedScreen = () => {
  const posts = [
    {
      id: 1,
      author: 'Anitta Vinter',
      role: 'Designer (UI/UX)',
      period: '2024-2025',
      content: 'Insightful event held Kenya Computer Club on Importance of Virtual Safety',
      image: require('../assets/event-image-1.jpg'),
      timeAgo: '',
    },
    {
      id: 2,
      author: 'Horace Mwaura',
      role: 'Software Developer at Labs BTech(CSE) 2010',
      content: 'Insightful event held Kenya Computer Club on Importance Artificial Intelligence.',
      image: require('../assets/event-image-2.jpg'),
      timeAgo: '3d',
    },
  ];

  const renderPost = (post) => (
    <View key={post.id} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={require('../assets/profile-placeholder.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author}</Text>
          <Text style={styles.authorRole}>{post.role}</Text>
          {post.timeAgo && <Text style={styles.timeAgo}>{post.timeAgo}</Text>}
        </View>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      <Text style={styles.seeMore}>...see more</Text>
      
      <Image source={post.image} style={styles.postImage} />
      
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-up-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feed</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView>
        {posts.map(post => renderPost(post))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/profile-placeholder.jpg')}
            style={styles.navProfile}
          />
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 28,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorRole: {
    fontSize: 14,
    color: '#666',
  },
  timeAgo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  seeMore: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navProfile: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default FeedScreen;