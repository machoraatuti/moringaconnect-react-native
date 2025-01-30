import React, { useState } from 'react';
import {
  View, Text, Modal, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, Image, Alert
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../features/postSlice/postSlice';
import { baseUrl } from '../shared/baseUrl';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const categories = ['Technology', 'Career', 'Education', 'Events', 'Projects', 'Other'];

const CreatePost = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { createPostStatus, error } = useSelector(state => state.posts);

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    image: null
  });

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1200,
      maxWidth: 1200,
    }, (response) => {
      if (!response.didCancel && !response.error) {
        setPostData(prev => ({
          ...prev,
          image: response.assets[0]
        }));
      }
    });
  };

  const handleSubmit = async () => {
    if (!postData.title || !postData.content || !postData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('category', postData.category);
      
      if (postData.image) {
        formData.append('image', {
          uri: postData.image.uri,
          type: postData.image.type,
          name: postData.image.fileName
        });
      }

      await dispatch(createPost(formData)).unwrap();
      Alert.alert('Success', 'Post created successfully!');
      onClose();
    } catch (err) {
      Alert.alert('Error', error || 'Failed to create post');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Post</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            value={postData.title}
            onChangeText={(text) => setPostData(prev => ({ ...prev, title: text }))}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={postData.category}
              onValueChange={(value) => setPostData(prev => ({ ...prev, category: value }))}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map(category => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your post..."
            multiline
            numberOfLines={6}
            value={postData.content}
            onChangeText={(text) => setPostData(prev => ({ ...prev, content: text }))}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={styles.imageButton}
            onPress={handleImagePick}
          >
            <Icon name="add-photo-alternate" size={24} color={colors.secondary} />
            <Text style={styles.imageButtonText}>Add Image</Text>
          </TouchableOpacity>

          {postData.image && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: postData.image.uri }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setPostData(prev => ({ ...prev, image: null }))}
              >
                <Icon name="close" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={createPostStatus === 'loading'}
            >
              <Text style={styles.submitButtonText}>
                {createPostStatus === 'loading' ? 'Publishing...' : 'Publish Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  form: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  textArea: {
    height: 150,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.secondary,
    borderRadius: 8,
    marginBottom: 16,
  },
  imageButtonText: {
    marginLeft: 8,
    color: colors.secondary,
    fontSize: 16,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  submitButton: {
    backgroundColor: colors.secondary,
  },
  cancelButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default CreatePost;