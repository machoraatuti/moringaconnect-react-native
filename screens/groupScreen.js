import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  TextInput, Modal, SafeAreaView, ScrollView, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreateGroup from '../components/CreateGroup';
import { baseUrl } from '../shared/baseUrl';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const GroupCard = ({ group, onView, onEdit, onDelete, onJoin }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.description}>{group.description}</Text>
      </View>
      <View style={styles.categoryChip}>
        <Text style={styles.categoryText}>{group.category}</Text>
      </View>
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Icon name="group" size={16} color={colors.primary} />
        <Text style={styles.statText}>{group.memberCount || 0} members</Text>
      </View>
      <View style={styles.stat}>
        <Icon name="event" size={16} color={colors.secondary} />
        <Text style={styles.statText}>{group.upcomingEvents || 0} events</Text>
      </View>
      <View style={styles.stat}>
        <Icon name="chat" size={16} color={colors.secondary} />
        <Text style={styles.statText}>{group.recentDiscussions || 0} discussions</Text>
      </View>
    </View>

    <View style={styles.actions}>
      <TouchableOpacity onPress={() => onView(group)}>
        <Icon name="visibility" size={24} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onEdit(group)}>
        <Icon name="edit" size={24} color={colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(group.id)}>
        <Icon name="delete" size={24} color="#d32f2f" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onJoin(group.id)}>
        <Icon name="group-add" size={24} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  </View>
);

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    upcomingEvents: '',
    discussions: '',
    jobPostings: ''
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch(baseUrl + 'groups');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch groups');
    }
  };

  const handleAddGroup = async (newGroup) => {
    try {
      const response = await fetch(baseUrl + 'groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup)
      });
      if (!response.ok) throw new Error('Failed to create group');
      const savedGroup = await response.json();
      setGroups(prev => [...prev, savedGroup]);
      setCreateModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to create group');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await fetch(baseUrl + `groups/${groupId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete group');
      setGroups(prev => prev.filter(group => group.id !== groupId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete group');
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const response = await fetch(baseUrl + `groups/${groupId}/join`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to join group');
      const updatedGroup = await response.json();
      setGroups(prev => 
        prev.map(group => group.id === groupId ? updatedGroup : group)
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to join group');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(baseUrl + `groups/${selectedGroup.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData)
      });
      if (!response.ok) throw new Error('Failed to update group');
      const updatedGroup = await response.json();
      setGroups(prev => 
        prev.map(group => group.id === selectedGroup.id ? updatedGroup : group)
      );
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update group');
    }
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alumni Groups</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setCreateModalVisible(true)}
        >
          <Icon name="add" size={24} color={colors.white} />
          <Text style={styles.buttonText}>Create New Group</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Groups"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredGroups}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onView={() => {
              setSelectedGroup(item);
              setModalVisible(true);
            }}
            onEdit={() => {
              setSelectedGroup(item);
              setEditData({
                upcomingEvents: item.upcomingEvents || '',
                discussions: item.recentDiscussions || '',
                jobPostings: item.jobPostings || ''
              });
              setEditModalVisible(true);
            }}
            onDelete={handleDeleteGroup}
            onJoin={handleJoinGroup}
          />
        )}
        keyExtractor={item => item.id}
      />

      <CreateGroup
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onAdd={handleAddGroup}
      />

      {/* View Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedGroup && (
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedGroup.name}</Text>
                <Text style={styles.modalText}>Description: {selectedGroup.description}</Text>
                <Text style={styles.modalText}>Members: {selectedGroup.memberCount || 0}</Text>
                <Text style={styles.modalText}>Events: {selectedGroup.upcomingEvents || 'None'}</Text>
                <Text style={styles.modalText}>Discussions: {selectedGroup.recentDiscussions || 'None'}</Text>
                <Text style={styles.modalText}>Jobs: {selectedGroup.jobPostings || 'None'}</Text>
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Upcoming Events"
              value={editData.upcomingEvents}
              onChangeText={text => setEditData(prev => ({...prev, upcomingEvents: text}))}
            />
            <TextInput
              style={styles.input}
              placeholder="Discussions"
              value={editData.discussions}
              onChangeText={text => setEditData(prev => ({...prev, discussions: text}))}
            />
            <TextInput
              style={styles.input}
              placeholder="Job Postings"
              value={editData.jobPostings}
              onChangeText={text => setEditData(prev => ({...prev, jobPostings: text}))}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 8,
  },
  searchInput: {
    margin: 16,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  card: {
    backgroundColor: colors.white,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    color: 'gray',
    marginTop: 4,
  },
  categoryChip: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  saveButton: {
    backgroundColor: colors.secondary,
  },
  closeButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default Groups;