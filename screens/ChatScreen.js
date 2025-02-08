import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ route, navigation }) => {
  const [message, setMessage] = useState('');

  // Mock chat data
  const chatData = {
    recipient: {
      name: 'John Doe',
      status: 'Online',
      image: require('../assets/images/avatar-dir-1.jpeg'),
    },
    messages: [
  {
    id: 1,
    text: "Hey, how are you?",
    time: "10:30 AM",
    sender: "them",
    read: true,
  },
  {
    id: 2,
    text: "I'm doing great! Just finished working on the new feature.",
    time: "10:31 AM",
    sender: "me",
    read: true,
  },
  {
    id: 3,
    text: "That's awesome! Can you share some details about it?",
    time: "10:32 AM",
    sender: "them",
    read: true,
  },
  {
    id: 4,
    text: "Sure! I implemented the new authentication system using JWT tokens. It's much more secure now.",
    time: "10:33 AM",
    sender: "me",
    read: true,
  },
  {
    id: 5,
    text: "Would you be interested in collaborating on the next sprint?",
    time: "10:34 AM",
    sender: "them",
    read: false,
  },
],
  };

  const renderMessage = (message) => (
    <View 
      key={message.id} 
      style={[
        styles.messageContainer,
        message.sender === 'me' ? styles.sentMessage : styles.receivedMessage
      ]}
    >
      {message.sender === 'them' && (
        <Image source={chatData.recipient.image} style={styles.messageAvatar} />
      )}
      <View style={[
        styles.messageBubble,
        message.sender === 'me' ? styles.sentBubble : styles.receivedBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.sender === 'me' ? styles.sentMessageText : styles.receivedMessageText
        ]}>
          {message.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text style={styles.messageTime}>{message.time}</Text>
          {message.sender === 'me' && (
            <Ionicons 
              name={message.read ? "checkmark-done" : "checkmark"} 
              size={16} 
              color={message.read ? "#4CAF50" : "#999"} 
              style={styles.readStatus}
            />
          )}
        </View>
      </View>
    </View>
  );

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.profileInfo}>
          <Image source={chatData.recipient.image} style={styles.profileImage} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{chatData.recipient.name}</Text>
            <Text style={styles.profileStatus}>{chatData.recipient.status}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {chatData.messages.map(message => renderMessage(message))}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle" size={24} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.sendButton, message.trim() ? styles.sendButtonActive : {}]}
          onPress={handleSend}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={message.trim() ? "#fff" : "#999"} 
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileText: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  sentBubble: {
    backgroundColor: '#E67E4D',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  readStatus: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 120,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  emojiButton: {
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#E67E4D',
  },
});

export default ChatScreen;