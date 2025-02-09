// SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { title: 'Edit Profile', icon: 'user', type: 'link' },
        { title: 'Change Password', icon: 'lock', type: 'link' },
        { title: 'Privacy Settings', icon: 'shield', type: 'link' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { title: 'Push Notifications', icon: 'bell', type: 'switch', value: notifications, setValue: setNotifications },
        { title: 'Email Updates', icon: 'envelope', type: 'switch', value: emailUpdates, setValue: setEmailUpdates },
        { title: 'Dark Mode', icon: 'moon', type: 'switch', value: darkMode, setValue: setDarkMode },
      ],
    },
    {
      title: 'Support',
      items: [
        { title: 'Help Center', icon: 'question-circle', type: 'link' },
        { title: 'Contact Us', icon: 'envelope', type: 'link' },
        { title: 'Terms of Service', icon: 'file-text', type: 'link' },
      ],
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.title}
      style={styles.settingItem}
      onPress={() => item.type === 'link' && console.log(`Navigate to ${item.title}`)}
    >
      <View style={styles.settingItemLeft}>
        <Icon name={item.icon} type="font-awesome" size={20} color="#666" />
        <Text style={styles.settingItemText}>{item.title}</Text>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.setValue}
          trackColor={{ false: '#767577', true: '#f4511e' }}
          thumbColor={item.value ? '#f4511e' : '#f4f3f4'}
        />
      ) : (
        <Icon name="chevron-right" type="font-awesome" size={16} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(renderSettingItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: "(rgba(10, 31, 68, 0.8))"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});

export default SettingsScreen;
