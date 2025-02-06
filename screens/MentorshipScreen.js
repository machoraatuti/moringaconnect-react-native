import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MentorshipScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Mentorship Program</Text>
        <TouchableOpacity style={styles.headerRight}>
          <Icon 
            name="bell" 
            type="font-awesome" 
            size={24} 
            color="#000"
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Become a Mentor</Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/mentorship.jpg')}
            style={styles.mentorImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.subtitle}>Become a mentor and help students.</Text>

        <Text style={styles.description}>
          "We make this happen by leveraging a unique network of professionals and organizations committed to driving innovation and improving practices. As a mentor, my goal is to guide aspiring tech students and those already in the field, helping them grow, innovate, and make a difference through technology."
        </Text>

        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>+more</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.becomeButton}>
          <Text style={styles.becomeButtonText}>Become a Mentor</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flex: 1,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: '#F05A28',
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 2,
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F05A28',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mentorImage: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  moreButton: {
    marginBottom: 24,
  },
  moreText: {
    color: '#F05A28',
    fontSize: 16,
  },
  becomeButton: {
    backgroundColor: '#F05A28',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  becomeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MentorshipScreen;