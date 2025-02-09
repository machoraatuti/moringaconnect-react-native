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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MentorshipScreen = () => {
  const navigation = useNavigation();
  
  const mentors = [
    {
      id: 1,
      name: 'Sarah Kimani',
      role: 'Senior Software Engineer',
      company: 'Google',
      experience: '8+ years',
      expertise: ['Mobile Development', 'Web Development', 'System Design'],
      image: require('../assets/images/frontend.jpg')
    }
  ];

  const renderMentor = (mentor) => (
    <TouchableOpacity 
      key={mentor.id}
      style={styles.mentorCard}
      onPress={() => navigation.navigate('MentorProfile', { mentor })}
    >
      <Image source={mentor.image} style={styles.mentorCardImage} />
      <View style={styles.mentorInfo}>
        <Text style={styles.mentorName}>{mentor.name}</Text>
        <Text style={styles.mentorRole}>{mentor.role}</Text>
        <Text style={styles.mentorCompany}>{mentor.company}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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

          <Ionicons name="notifications-outline" size={24} color="#E67E4D" />

          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Become a Mentor</Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/frontend.jpg')}
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

        <Text style={styles.sectionTitle}>Available Mentors</Text>
        {mentors.map(mentor => renderMentor(mentor))}

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
    backgroundColor: "(rgba(10, 31, 68, 0.8))"
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
    color: "#fff"
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  mentorCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mentorCardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mentorRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  mentorCompany: {
    fontSize: 14,
    color: '#F05A28',
    marginTop: 2,
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