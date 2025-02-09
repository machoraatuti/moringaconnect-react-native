import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupDetailsScreen = ({ route, navigation }) => {
  const group = {
    id: 1,
    name: 'Software Developer',
    description: 'A community for software developers to share knowledge, discuss trends, and collaborate on projects.',
    members: [
      {
        id: 1,
        name: 'Jeremy',
        role: 'Admin',
        image: require('../assets/images/avatar-dir-1.jpeg'),
        online: true
      },
      {
        id: 2,
        name: 'Marion',
        role: 'Moderator',
        image: require('../assets/images/avatar-dir-2.jpeg'),
        online: true
      },
      {
        id: 3,
        name: 'Mishael',
        role: 'Member',
        image: require('../assets/images/avatar-dir-3.jpeg'),
        online: false
      },
      {
        id: 4,
        name: 'Horace',
        role: 'Member',
        image: require('../assets/images/avatar-dir-4.jpeg'),
        online: true
      }
    ],
    recentActivities: [
      {
        type: 'event',
        title: 'Tech Meetup',
        date: 'Tomorrow, 3:00 PM',
        attendees: 15
      },
      {
        type: 'discussion',
        title: 'Latest React Native Updates',
        participants: 8,
        comments: 23
      },
      {
        type: 'resource',
        title: 'Learn Node.js Guide',
        downloads: 12
      }
    ]
  };

  const renderMember = (member) => (
    <TouchableOpacity key={member.id} style={styles.memberCard}>
      <View style={styles.memberImageContainer}>
        <Image source={member.image} style={styles.memberImage} />
        {member.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberRole}>{member.role}</Text>
      </View>
      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble-outline" size={20} color="#E67E4D" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderActivity = (activity, index) => (
    <TouchableOpacity key={index} style={styles.activityCard}>
      <View style={styles.activityIcon}>
        <Ionicons 
          name={
            activity.type === 'event' ? 'calendar' : 
            activity.type === 'discussion' ? 'chatbubbles' : 'document'
          } 
          size={24} 
          color="#E67E4D" 
        />
      </View>
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        {activity.date && (
          <Text style={styles.activityDetail}>{activity.date}</Text>
        )}
        {activity.participants && (
          <Text style={styles.activityDetail}>
            {activity.participants} participants • {activity.comments} comments
          </Text>
        )}
        {activity.downloads && (
          <Text style={styles.activityDetail}>{activity.downloads} downloads</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Details</Text>
         <View style={{width: 24}} /> 
       
      </View>

      <ScrollView style={styles.content}>
        {/* Group Info */}
        <View style={styles.groupInfo}>
          <Image 
            source={require('../assets/images/avatar-dir-1.jpeg')} 
            style={styles.groupImage} 
          />
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.memberCount}>{group.members.length} Members</Text>
          <Text style={styles.description}>{group.description}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="chatbubbles" size={20} color="#FFF" />
              <Text style={styles.primaryButtonText}>Group Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="share-social-outline" size={20} color="#E67E4D" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Members Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Members</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.membersList}>
            {group.members.map(member => renderMember(member))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesList}>
            {group.recentActivities.map((activity, index) => 
              renderActivity(activity, index)
            )}
          </View>
        </View>
      </ScrollView>

      {/* Leave Group Button */}
      <TouchableOpacity style={styles.leaveButton}>
        <Ionicons name="exit-outline" size={20} color="#F44336" />
        <Text style={styles.leaveButtonText}>Leave Group</Text>
      </TouchableOpacity>
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
      width: '100%'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
   
  },
  content: {
    flex: 1,
  },
  groupInfo: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E67E4D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E67E4D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#E67E4D',
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#E67E4D',
    fontWeight: '500',
  },
  membersList: {
    gap: 12,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 12,
  },
  memberImageContainer: {
    position: 'relative',
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
  },
  messageButton: {
    padding: 8,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDetail: {
    fontSize: 14,
    color: '#666',
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 8,
  },
  leaveButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GroupDetailsScreen;