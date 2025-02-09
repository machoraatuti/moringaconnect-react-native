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

const MentorProfileScreen = ({ navigation }) => {
  const mentorData = {
    name: "Sarah Kimani",
    role: "Senior Software Engineer",
    company: "Google",
    experience: "8+ years",
    image: require('../assets/images/avatar-dir-1.jpeg'),
    bio: "Passionate about mentoring the next generation of tech leaders. Specialized in full-stack development and system architecture. Currently leading engineering teams at Google.",
    expertise: [
      "Full Stack Development",
      "System Architecture",
      "Cloud Computing",
      "Leadership",
      "Career Development"
    ],
    availability: "10 hours/week",
    mentees: 15,
    rating: 4.9,
    reviews: 28,
    sessions: [
      {
        title: "Career Growth in Tech",
        duration: "45 mins",
        price: "Free"
      },
      {
        title: "Technical Interview Prep",
        duration: "60 mins",
        price: "Free"
      }
    ],
    achievements: [
      {
        icon: "trophy",
        title: "Top Mentor 2023",
      },
      {
        icon: "users",
        title: "50+ Mentees Guided",
      },
      {
        icon: "star",
        title: "4.9 Rating",
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon 
            name="arrow-left" 
            type="font-awesome-5" 
            size={20} 
            color="#F05A28" 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mentor Profile</Text>
        <TouchableOpacity>
          <Icon 
            name="share" 
            type="font-awesome-5" 
            size={20} 
            color="#F05A28" 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={mentorData.image} style={styles.profileImage} />
          <Text style={styles.name}>{mentorData.name}</Text>
          <Text style={styles.role}>{mentorData.role}</Text>
          <Text style={styles.company}>{mentorData.company}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mentorData.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statNumber}>{mentorData.mentees}</Text>
              <Text style={styles.statLabel}>Mentees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mentorData.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{mentorData.bio}</Text>
        </View>

        {/* Expertise Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Areas of Expertise</Text>
          <View style={styles.expertiseContainer}>
            {mentorData.expertise.map((item, index) => (
              <View key={index} style={styles.expertiseItem}>
                <Icon 
                  name="check-circle" 
                  type="font-awesome-5" 
                  size={16} 
                  color="#F05A28" 
                />
                <Text style={styles.expertiseText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {mentorData.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <Icon 
                  name={achievement.icon} 
                  type="font-awesome-5" 
                  size={24} 
                  color="#F05A28" 
                />
                <Text style={styles.achievementText}>{achievement.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mentorship Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mentorship Sessions</Text>
          {mentorData.sessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <View style={styles.sessionDetails}>
                  <Icon 
                    name="clock" 
                    type="font-awesome-5" 
                    size={14} 
                    color="#666" 
                  />
                  <Text style={styles.sessionDuration}>{session.duration}</Text>
                  <Text style={styles.sessionPrice}>{session.price}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Book Mentorship Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request Mentorship</Text>
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
    backgroundColor: "rgba(10, 31, 68, 0.8)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#F05A28',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F05A28',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  expertiseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  expertiseText: {
    marginLeft: 8,
    color: '#666',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementItem: {
    alignItems: 'center',
    flex: 1,
  },
  achievementText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDuration: {
    marginLeft: 8,
    color: '#666',
  },
  sessionPrice: {
    marginLeft: 16,
    color: '#F05A28',
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F05A28',
  },
  bookButtonText: {
    color: '#F05A28',
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  requestButton: {
    backgroundColor: '#F05A28',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MentorProfileScreen;