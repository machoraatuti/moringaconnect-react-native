import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Alumni Directory</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.profileTitle}>Profile</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/images/avatar-dir-1.jpeg')}
            style={styles.profileImage}
          />
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Abdul Abdi</Text>
          <Text style={styles.role}>Devops</Text>
          <Text style={styles.batch}>-Batch 2024</Text>

          {/* Social Links */}
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="linkedin" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="instagram" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Connections */}
          <TouchableOpacity style={styles.connectionsButton}>
            <Text style={styles.connectionsText}>247 Connections</Text>
          </TouchableOpacity>
        </View>

        {/* Location Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Currently Residing In</Text>
          <Text style={styles.sectionContent}>Mombasa.</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Currently Working In</Text>
          <Text style={styles.sectionContent}>Somali</Text>
        </View>

        {/* Recent Feed */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Recent Feed</Text>
          <Text style={styles.feedContent}>
            Anyone looking to work on Mobile Application developement please connect
          </Text>
          
          {/* Message Status */}
          <View style={styles.messageStatus}>
            <Text style={styles.messageStatusText}>
              Abdul has turned off direct messaging{'\n'}
              Connect with <Text style={styles.boldText}>Abdul</Text> first
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="#666" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#666" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#666" />
          <Text style={styles.navText}>Event Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E67E4D',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  batch: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  socialButton: {
    backgroundColor: '#E67E4D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  connectionsButton: {
    backgroundColor: '#E67E4D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  connectionsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27174D',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#000',
  },
  feedContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  messageStatus: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  messageStatusText: {
    textAlign: 'center',
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default ProfileScreen;