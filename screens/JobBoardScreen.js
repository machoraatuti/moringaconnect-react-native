import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const JobBoardScreen = () => {
  const navigation = useNavigation();
  
  const jobListings = [
    {
      id: 1,
      position: 'Swift Developer Intern',
      company: 'Apple Inc.',
      location: 'Nairobi, Kenya',
      posted: '1hr',
      postedBy: {
        name: 'Sarah Kimani',
        image: require('../assets/images/avatar-dir-1.jpeg')
      }
    },
    {
      id: 2,
      position: 'UI/UX Designer',
      company: 'Microsoft',
      location: 'Remote',
      posted: '1hr',
      postedBy: {
        name: 'Jimmy',
        image: require('../assets/images/avatar-dir-2.jpeg')
      }
    },
    {
      id: 3,
      position: 'Java Developer',
      company: 'Safaricom',
      location: 'Nairobi, Kenya',
      posted: '1hr',
      postedBy: {
        name: 'Ethan',
        image: require('../assets/images/avatar-dir-3.jpeg')
      }
    },
    {
      id: 4,
      position: 'Python Developer Intern',
      company: 'Google',
      location: 'Remote',
      posted: '1hr',
      postedBy: {
        name: 'mishael',
        image: require('../assets/images/avatar-dir-4.jpeg')
      }
    },
    {
      id: 5,
      position: 'C++ Developer Intern',
      company: 'Intel',
      location: 'Mombasa, Kenya',
      posted: '1hr',
      postedBy: {
        name: 'vinter',
        image: require('../assets/images/avatar-dir-5.jpeg')
      }
    }
  ];

  const handleCareerMentorship = () => {
    Linking.openURL('mailto:careers@moringaschool.com');
  };

  const renderJobItem = (job) => (
    <TouchableOpacity 
      key={job.id} 
      style={styles.jobItem}
      onPress={() => navigation.navigate('JobDetails', { job })}
    >
      <Image source={job.postedBy.image} style={styles.profileImage} />
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>Opening for {job.position}</Text>
        <Text style={styles.companyName}>{job.company}</Text>
        <Text style={styles.location}>{job.location}</Text>
      </View>
      <View style={styles.jobMeta}>
        <Text style={styles.timePosted}>{job.posted}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Board & Career Support</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Jobs Posted"
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Recently Posted by Alumni's</Text>
        
        {jobListings.map(job => renderJobItem(job))}

        <View style={styles.mentorshipSection}>
          <Text style={styles.mentorshipTitle}>Need Career Guidance?</Text>
          <Text style={styles.mentorshipText}>
            Connect with our career mentors for professional guidance and support.
          </Text>
          <TouchableOpacity 
            style={styles.mentorshipButton}
            onPress={handleCareerMentorship}
          >
            <Text style={styles.mentorshipButtonText}>
              Contact Career Support
            </Text>
          </TouchableOpacity>
          <Text style={styles.emailText}>
            careers@moringaschool.com
          </Text>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 16,
  },
  jobItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#999',
  },
  jobMeta: {
    alignItems: 'flex-end',
  },
  timePosted: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  mentorshipSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    alignItems: 'center',
  },
  mentorshipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mentorshipText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  mentorshipButton: {
    backgroundColor: '#E67E4D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  mentorshipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  emailText: {
    fontSize: 16,
    color: '#E67E4D',
    textDecorationLine: 'underline',
  },
});

export default JobBoardScreen;