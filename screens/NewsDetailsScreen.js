import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Share 
} from 'react-native';
import { Icon } from 'react-native-elements';

const NewsDetailsScreen = ({ route, navigation }) => {
  const newsData = {
    title: "Tech Innovation Hub Launches AI Startup Initiative",
    image: require('../assets/images/frontend.jpg'),
    date: "February 8, 2024",
    author: {
      name: "Sarah Kimani",
      role: "Tech Correspondent",
      image: require('../assets/images/avatar-dir-1.jpeg')
    },
    content: `We're excited to announce the launch of our AI startup innovation hub, where cutting-edge technology meets creativity. Our mission is to empower aspiring innovators, solve real-world problems, and drive the future of AI-driven solutions.

The hub will provide state-of-the-art facilities, mentorship programs, and funding opportunities for promising AI startups. Key focus areas include machine learning, natural language processing, and computer vision applications.

Last year was truly a landmark for software development and tech innovation. Key highlights included the rise of AI-driven tools like GitHub Copilot, revolutionizing coding efficiency and developer productivity.

The initiative aims to:
• Support early-stage AI startups
• Provide technical resources and infrastructure
• Facilitate networking with industry leaders
• Offer specialized AI/ML training programs

We believe this hub will play a crucial role in fostering the next generation of AI innovations and supporting Kenya's growing tech ecosystem.`,
    relatedImages: [
      require('../assets/images/cybersecurity.jpg'),
      require('../assets/images/bootcamp.jpg'),
      require('../assets/images/hiking.jpg')
    ],
    tags: ["Innovation", "AI", "Startups", "Technology"],
    likes: 245,
    comments: 56,
    shares: 89
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${newsData.title}\n\nRead more about this exciting news on MoringaConnect!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="ionicon" color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share" type="ionicon" color="#000" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Main Image */}
        <Image source={newsData.image} style={styles.mainImage} />

        {/* Title & Date */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{newsData.title}</Text>
          <Text style={styles.date}>{newsData.date}</Text>
        </View>

        {/* Author Info */}
        <View style={styles.authorContainer}>
          <Image source={newsData.author.image} style={styles.authorImage} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{newsData.author.name}</Text>
            <Text style={styles.authorRole}>{newsData.author.role}</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}
        >
          {newsData.tags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tagButton}>
              <Text style={styles.tagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main Content */}
        <Text style={styles.content}>{newsData.content}</Text>

        {/* Related Images */}
        <Text style={styles.sectionTitle}>Related Images</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.relatedImagesContainer}
        >
          {newsData.relatedImages.map((image, index) => (
            <Image key={index} source={image} style={styles.relatedImage} />
          ))}
        </ScrollView>

        {/* Engagement Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="heart" type="ionicon" color="#FF7F32" size={24} />
            <Text style={styles.statText}>{newsData.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="chatbubble-outline" type="ionicon" color="#666" size={24} />
            <Text style={styles.statText}>{newsData.comments}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="share-social-outline" type="ionicon" color="#666" size={24} />
            <Text style={styles.statText}>{newsData.shares}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-outline" type="ionicon" color="#666" size={24} />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubble-outline" type="ionicon" color="#666" size={24} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bookmark-outline" type="ionicon" color="#666" size={24} />
          <Text style={styles.actionText}>Save</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1,
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  titleContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  authorRole: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#FF7F32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tagsContainer: {
    padding: 16,
  },
  tagButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: {
    color: '#FF7F32',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
  },
  relatedImagesContainer: {
    padding: 16,
  },
  relatedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
    color: '#666',
  },
});

export default NewsDetailsScreen;