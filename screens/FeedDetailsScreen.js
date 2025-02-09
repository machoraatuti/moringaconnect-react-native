import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedDetailsScreen = ({ route, navigation }) => {
  const [comment, setComment] = useState('');
  const post = route.params.post;

  // Mock comments data
  const comments = [
    {
      id: 1,
      author: 'James Kimani',
      role: 'Software Engineer',
      content: 'This is really insightful! Looking forward to more events like this.',
      timeAgo: '2h',
      likes: 5,
      image: require('../assets/images/bootcamp.jpg')
    },
    {
      id: 2,
      author: 'Mary Wanjiku',
      role: 'UI/UX Designer',
      content: 'Great initiative! The presentations were very informative.',
      timeAgo: '1h',
      likes: 3,
      image: require('../assets/images/cybersecurity.jpg')
    }
  ];

  const handleComment = () => {
    if (comment.trim()) {
      // Handle comment submission
      setComment('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     

      <ScrollView style={styles.content}>
        {/* Author Info */}
        <View style={styles.authorSection}>
          <Image
            source={require('../assets/images/frontend.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{post.author}</Text>
            <Text style={styles.authorRole}>{post.role}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo || 'Just now'}</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postText}>{post.content}</Text>
          <Image source={post.image} style={styles.postImage} />
        </View>

        {/* Engagement Stats */}
        <View style={styles.engagementStats}>
          <View style={styles.statItem}>
            <Ionicons name="thumbs-up" size={16} color="#E67E4D" />
            <Text style={styles.statText}>24 likes</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubble-outline" size={16} color="#666" />
            <Text style={styles.statText}>{comments.length} comments</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="share-social-outline" size={16} color="#666" />
            <Text style={styles.statText}>5 shares</Text>
          </View>
        </View>

        {/* Action Buttons */}
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

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>Comments</Text>
          
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image source={comment.image} style={styles.commentorImage} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <View>
                    <Text style={styles.commentorName}>{comment.author}</Text>
                    <Text style={styles.commentorRole}>{comment.role}</Text>
                  </View>
                  <Text style={styles.commentTime}>{comment.timeAgo}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.commentAction}>
                    <Ionicons name="thumbs-up-outline" size={16} color="#666" />
                    <Text style={styles.commentActionText}>{comment.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.commentAction}>
                    <Text style={styles.commentActionText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <Image
          source={require('../assets/images/frontend.jpg')}
          style={styles.commentorImage}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: comment.trim() ? 1 : 0.5 }]}
          onPress={handleComment}
        >
          <Ionicons name="send" size={24} color="#E67E4D" />
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
  content: {
    flex: 1,
  },
  authorSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
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
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#E67E4D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  postContent: {
    padding: 16,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  engagementStats: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    color: '#666',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
    color: '#666',
  },
  commentsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentorRole: {
    fontSize: 12,
    color: '#666',
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentActionText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
});

export default FeedDetailsScreen;