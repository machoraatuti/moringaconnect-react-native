import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewsScreen = () => {
  const navigation = useNavigation();

  const newsItems = [
    {
      id: 1,
      image: require('../assets/images/frontend.jpg'),
      title: 'Tech Innovation 2024',
      content: 'Last year was a landmark for software development and tech innovation. Key highlights included the rise of AI-driven tools like GitHub Copilot, revolutionizing coding efficiency.',
      fullContent: 'Extended version of the news article...'
    },
    {
      id: 2,
      image: require('../assets/images/cybersecurity.jpg'),
      title: 'AI Innovation Hub Launch',
      content: 'We launched an AI startup innovation hub, where cutting-edge technology meets creativity. Our mission is to empower aspiring innovators, solve real-world problems, and drive the future of AI-driven solutions.',
      fullContent: 'Extended version of the news article...'
    }
  ];

  const renderNewsItem = (item) => (
    <View key={item.id} style={styles.newsItem}>
      <Image
        source={item.image}
        style={styles.newsImage}
      />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsText}>{item.content}</Text>
      <TouchableOpacity 
        style={styles.readMoreButton}
        onPress={() => navigation.navigate('NewsDetails', { news: item })}
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>News</Text>
      </View>

      <ScrollView style={styles.newsContent}>

        {newsItems.map(item => renderNewsItem(item))}

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
    backgroundColor: '(rgba(10, 31, 68, 0.8))',
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
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  newsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
  },
  readMoreText: {
    color: '#FF7F32',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewsScreen;