import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CommunityGroupsScreen = () => {
  const navigation = useNavigation();
  
  const groups = [
    {
      id: 1,
      name: 'Software Developer',
      lastMessage: {
        author: 'Jeremy',
        content: 'Sure'
      },
      date: 'Nov 22,2023',
      members: 10,
      description: 'A community of software developers sharing knowledge and experiences',
      image: require('../assets/images/avatar-dir-1.jpeg'),
      unreadCount: 0
    },
    {
      id: 2,
      name: 'Homecoming 22',
      lastMessage: {
        author: 'Marion',
        content: 'Done'
      },
      date: 'Nov 21,2023',
      members: 16,
      description: 'Planning and coordination for homecoming events',
      image: require('../assets/images/avatar-dir-2.jpeg'),
      unreadCount: 1
    },
    {
      id: 3,
      name: 'Techno Geeks',
      lastMessage: {
        author: 'Mishael',
        content: 'Great Work !'
      },
      date: 'Nov 21,2023',
      members: 22,
      description: 'Discussions about latest technology trends and innovations',
      image: require('../assets/images/avatar-dir-3.jpeg'),
      unreadCount: 0
    },
    {
      id: 4,
      name: 'Computers',
      lastMessage: {
        author: 'Horace',
        content: 'Where?'
      },
      date: 'Nov 21,2023',
      members: 12,
      description: 'Computer science and hardware discussions',
      image: require('../assets/images/avatar-dir-4.jpeg'),
      unreadCount: 1
    }
  ];

  const renderGroup = (group) => (
    <TouchableOpacity 
      key={group.id} 
      style={styles.groupItem}
      onPress={() => navigation.navigate('GroupDetails', { group })}
    >
      <Image source={group.image} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.dateText}>{group.date}</Text>
        </View>
        <View style={styles.messagePreview}>
          <Text style={styles.authorText}>
            {group.lastMessage.author}: {group.lastMessage.content}
          </Text>
          {group.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{group.unreadCount}</Text>
            </View>
          )}
        </View>
        <Text style={styles.membersText}>{group.members} Members</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Ionicons name="menu" size={28} color="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Groups</Text>
        <View style={styles.notificationContainer}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#E67E4D" />
          </TouchableOpacity>
          <View style={styles.notificationBadge} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search in Messages"
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView style={styles.groupsList}>
        {groups.map(group => renderGroup(group))}
      </ScrollView>

      <TouchableOpacity style={styles.newGroupButton}>
        <Text style={styles.newGroupText}>New Group</Text>
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
    backgroundColor: "(rgba(10, 31, 68, 0.8))"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff"
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E67E4D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  groupsList: {
    flex: 1,
  },
  groupItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorText: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#E67E4D',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  membersText: {
    fontSize: 14,
    color: '#27174D',
    fontWeight: '500',
  },
  newGroupButton: {
    backgroundColor: '#E67E4D',
    margin: 16,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  newGroupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommunityGroupsScreen;