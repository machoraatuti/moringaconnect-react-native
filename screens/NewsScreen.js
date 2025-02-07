import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header with title */}
      <View style={styles.header}>
        <Text style={styles.headerText}>News</Text>
      </View>

      {/* News Content */}
      <ScrollView style={styles.newsContent}>
        {/* First news item */}
        <View style={styles.newsItem}>
          <Image
            source={{ uri: 'https://your-image-url-1.com' }}  // Replace with actual image URL
            style={styles.newsImage}
          />
          <Text style={styles.newsText}>
            "Last year was a landmark for software development and tech innovation. Key highlights
            included the rise of AI-driven tools like GitHub Copilot, revolutionizing coding efficiency."
          </Text>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>

        {/* Second news item */}
        <View style={styles.newsItem}>
          <Image
            source={{ uri: 'https://your-image-url-2.com' }}  // Replace with actual image URL
            style={styles.newsImage}
          />
          <Text style={styles.newsText}>
            "We launched an AI startup innovation hub, where cutting-edge technology meets creativity.
            Our mission is to empower aspiring innovators, solve real-world problems, and drive the future of AI-driven solutions."
          </Text>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#FF7F32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  newsContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  newsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#FF7F32',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewsScreen;
