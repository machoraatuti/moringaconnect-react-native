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
import { Ionicons } from '@expo/vector-icons';

const ConnectionProfileScreen = ({ route, navigation }) => {
  const { connection = {
    id: 1,
    name: 'Sarah Kimani',
    role: 'Software Engineer',
    company: 'Google',
    batch: '2022',
    location: 'Nairobi, Kenya',
    image: require('../assets/images/avatar-dir-1.jpeg'),
    mutual: 15,
    bio: 'Passionate software engineer with expertise in full-stack development.',
    skills: ['React Native', 'Node.js', 'Python', 'AWS', 'MongoDB'],
    experience: [
      {
        role: 'Software Engineer',
        company: 'Google',
        duration: '2022 - Present',
        location: 'Nairobi, Kenya'
      }
    ],
    education: {
      institution: 'Moringa School',
      course: 'Software Engineering',
      year: '2022'
    },
    mutualConnections: []
  }} = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image source={connection.image} style={styles.profileImage} />
          <Text style={styles.name}>{connection.name}</Text>
          <Text style={styles.role}>{connection.role}</Text>
          <Text style={styles.company}>{connection.company}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.location}>{connection.location}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.connectButton}>
              <Ionicons name="person-add-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{connection.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {connection.skills?.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {connection.experience?.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.companyIcon}>
                <Ionicons name="briefcase-outline" size={24} color="#E67E4D" />
              </View>
              <View style={styles.experienceInfo}>
                <Text style={styles.experienceRole}>{exp.role}</Text>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                <Text style={styles.experienceDuration}>{exp.duration}</Text>
                <Text style={styles.experienceLocation}>{exp.location}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {connection.education && (
            <View style={styles.educationItem}>
              <View style={styles.educationIcon}>
                <Ionicons name="school-outline" size={24} color="#E67E4D" />
              </View>
              <View style={styles.educationInfo}>
                <Text style={styles.institutionName}>{connection.education.institution}</Text>
                <Text style={styles.courseName}>{connection.education.course}</Text>
                <Text style={styles.graduationYear}>Class of {connection.education.year}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mutual Connections ({connection.mutual})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mutualsList}>
            {connection.mutualConnections?.map((mutual) => (
              <TouchableOpacity key={mutual.id} style={styles.mutualItem}>
                <Image source={mutual.image} style={styles.mutualImage} />
                <Text style={styles.mutualName}>{mutual.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    backgroundColor: '(rgba(10, 31, 68, 0.8))',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E67E4D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27174D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillText: {
    color: '#666',
    fontSize: 14,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  companyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  experienceInfo: {
    flex: 1,
  },
  experienceRole: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 14,
    color: '#E67E4D',
    marginBottom: 2,
  },
  experienceDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  experienceLocation: {
    fontSize: 14,
    color: '#666',
  },
  educationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  educationInfo: {
    flex: 1,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  graduationYear: {
    fontSize: 14,
    color: '#666',
  },
  mutualsList: {
    flexDirection: 'row',
  },
  mutualItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  mutualImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  mutualName: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  }
});

export default ConnectionProfileScreen;