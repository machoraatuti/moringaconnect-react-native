import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';

const FeedPost = ({ user, title, time, content, image }) => (
  <View style={styles.postContainer}>
    <View style={styles.userInfo}>
      <Image source={user.avatar} style={styles.avatar} />
      <View style={styles.userTextContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          {user.verified && (
            <Icon 
              name="hand-pointing-up" 
              type="material-community" 
              size={16} 
              color="#F05A28"
              style={{ marginLeft: 4 }}
            />
          )}
        </View>
        <Text style={styles.userTitle}>{user.title}</Text>
        <Text style={styles.timeStamp}>{time}</Text>
      </View>
    </View>
    
    <View style={styles.contentContainer}>
      <Text style={styles.contentText}>
        {content}
        <Text style={styles.seeMore}> ...see more</Text>
      </Text>
      <Image source={image} style={styles.contentImage} />
    </View>

    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="thumb-up-outline" type="material-community" size={24} color="#666" />
        <Text style={styles.actionText}>Like</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="comment-outline" type="material-community" size={24} color="#666" />
        <Text style={styles.actionText}>Comment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="share-outline" type="material-community" size={24} color="#666" />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CommunityFeedScreen = () => {
  const feedData = [
    {
      id: '1',
      user: {
        name: 'Anitta Vinter',
        title: 'Designer (UI/UX)\n2024-2025',
        avatar: require('../assets/images/avatar1.jpg'),
        verified: true,
      },
      time: '2h',
      content: 'Insightful event held Kenya Computer Club on Importance of Virtual Safety',
      image: require('../assets/images/event1.jpg'),
    },
    {
      id: '2',
      user: {
        name: 'Horace Mwaura',
        title: 'Software Developer at Labs\nBTech(CSE) 2010',
        avatar: require('../assets/images/avatar2.jpg'),
        verified: false,
      },
      time: '3d',
      content: 'Insightful event held Kenya Computer Club on Importance Artificial Intelligence.',
      image: require('../assets/images/event2.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Feed</Text>
      <ScrollView style={styles.scrollView}>
        {feedData.map(post => (
          <FeedPost key={post.id} {...post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scrollView: {
    flex: 1,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  userTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  timeStamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  contentContainer: {
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
    lineHeight: 20,
  },
  seeMore: {
    color: '#666',
  },
  contentImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
});

export default CommunityFeedScreen;