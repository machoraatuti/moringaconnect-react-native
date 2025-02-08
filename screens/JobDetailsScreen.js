import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobDetailsScreen = ({ route, navigation }) => {
  const job = route.params?.job || {
    id: 1,
    position: 'Swift Developer Intern',
    company: 'Apple Inc.',
    location: 'Nairobi, Kenya',
    posted: '1hr',
    salary: '$3,000 - $4,000 /month',
    type: 'Internship (6 months)',
    experience: '0-1 years',
    postedBy: {
      name: 'Sarah Kimani',
      role: 'Senior iOS Developer',
      image: require('../assets/images/avatar-dir-1.jpeg')
    },
    description: 'We are looking for a passionate Swift Developer Intern to join our iOS development team. You will work on exciting projects and learn from experienced developers.',
    requirements: [
      'Currently pursuing or recently completed a degree in Computer Science or related field',
      'Basic knowledge of Swift programming language',
      'Understanding of iOS development principles',
      'Strong problem-solving skills',
      'Good communication skills',
      'Ability to work in a team'
    ],
    responsibilities: [
      'Assist in developing and maintaining iOS applications',
      'Write clean, maintainable code',
      'Collaborate with the development team',
      'Participate in code reviews',
      'Debug and fix issues',
      'Document technical specifications'
    ],
    benefits: [
      'Competitive internship stipend',
      'Mentorship from senior developers',
      'Flexible working hours',
      'Learning and development opportunities',
      'Possibility of full-time employment',
      'Modern work equipment provided'
    ]
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this job opportunity: ${job.position} at ${job.company}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleApply = () => {
    // Handle job application
    console.log('Applying for job:', job.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Job Header Info */}
        <View style={styles.jobHeader}>
          <Text style={styles.position}>{job.position}</Text>
          <Text style={styles.company}>{job.company}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.location}>{job.location}</Text>
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoContainer}>
            <View style={styles.infoCard}>
              <Ionicons name="cash-outline" size={20} color="#E67E4D" />
              <Text style={styles.infoText}>{job.salary}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={20} color="#E67E4D" />
              <Text style={styles.infoText}>{job.type}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="briefcase-outline" size={20} color="#E67E4D" />
              <Text style={styles.infoText}>{job.experience}</Text>
            </View>
          </View>
        </View>

        {/* Posted By */}
        <View style={styles.postedBySection}>
          <View style={styles.postedByInfo}>
            <Image source={job.postedBy.image} style={styles.posterImage} />
            <View style={styles.posterDetails}>
              <Text style={styles.posterName}>Posted by {job.postedBy.name}</Text>
              <Text style={styles.posterRole}>{job.postedBy.role}</Text>
              <Text style={styles.timePosted}>{job.posted} ago</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#E67E4D" />
          </TouchableOpacity>
        </View>

        {/* Job Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.descriptionText}>{job.description}</Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {job.requirements.map((req, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#E67E4D" />
              <Text style={styles.bulletText}>{req}</Text>
            </View>
          ))}
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsibilities</Text>
          {job.responsibilities.map((resp, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Ionicons name="arrow-forward-circle" size={20} color="#E67E4D" />
              <Text style={styles.bulletText}>{resp}</Text>
            </View>
          ))}
        </View>

        {/* Benefits */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.benefitsGrid}>
            {job.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="gift-outline" size={24} color="#E67E4D" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
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
    backgroundColor: '#E67E4D',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  jobHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  position: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    color: '#E67E4D',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    marginLeft: 4,
    color: '#666',
  },
  quickInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  postedBySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postedByInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  posterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  posterDetails: {
    flex: 1,
  },
  posterName: {
    fontSize: 16,
    fontWeight: '500',
  },
  posterRole: {
    fontSize: 14,
    color: '#666',
  },
  timePosted: {
    fontSize: 12,
    color: '#999',
  },
  messageButton: {
    padding: 8,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastSection: {
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
  benefitItem: {
    width: '50%',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButton: {
    backgroundColor: '#E67E4D',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JobDetailsScreen;