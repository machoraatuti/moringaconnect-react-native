import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Pre-imported images to avoid runtime issues
const avatar1 = require('../assets/images/avatar-dir-1.jpeg');
const avatar2 = require('../assets/images/avatar-dir-2.jpeg');
const avatar3 = require('../assets/images/avatar-dir-3.jpeg');
const defaultAvatar = require('../assets/images/avatar-dir-3.jpeg'); // Ensure this file exists

const messages = [
  {
    id: '1',
    sender: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '10:30 AM',
    unread: 2,
    avatar: avatar1,
  },
  {
    id: '2',
    sender: 'Jane Smith',
    lastMessage: 'The meeting is scheduled for tomorrow',
    time: '9:15 AM',
    unread: 0,
    avatar: avatar2,
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    lastMessage: 'Can we discuss the project details?',
    time: '8:45 AM',
    unread: 1,
    avatar: avatar3,
  },
];

const MessagesScreen = ({ navigation }) => {
  const handleMessagePress = (item) => {
    navigation.navigate('Chat', { contact: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Messages List using ScrollView */}
      <ScrollView>
        {messages.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.messageItem}
            onPress={() => handleMessagePress(item)}
          >
            <Image 
              source={item.avatar || defaultAvatar} 
              style={styles.avatar} 
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.senderName}>{item.sender}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
              <View style={styles.messageFooter}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* New Message Button */}
      <TouchableOpacity 
        style={styles.newMessageButton}
        onPress={() => navigation.navigate('NewMessage')}
      >
        <Ionicons name="create" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#f4511e',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
  },
  newMessageButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E67E4D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MessagesScreen;
