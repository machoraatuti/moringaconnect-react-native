import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, StyleSheet,
    Modal, TextInput, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { 
    toggleLike, 
    deletePost, 
    editPost, 
    incrementViews, 
    addComment 
} from '../features/postSlice/postSlice';

// Consistent color scheme for better maintainability
const colors = {
    primary: '#0A1F44',
    secondary: '#F05A28',
    background: '#FFF5F2',
    white: '#FFFFFF',
    divider: 'rgba(240, 90, 40, 0.12)'
};

const PostCard = ({ post, onRefresh }) => {
    // Basic validation to prevent rendering with invalid post data
    if (!post) return null;

    const dispatch = useDispatch();
    
    // Get authenticated user from Redux state
    const auth = useSelector(state => state.auth);
    const currentUser = auth?.user;

    // Local state management
    const [showComments, setShowComments] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content || '');
    const [newComment, setNewComment] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState({
        like: false,
        comment: false,
        edit: false,
        delete: false
    });

    // Increment view count when post is viewed
    useEffect(() => {
        if (post.id && currentUser?.id) {
            dispatch(incrementViews(post.id));
        }
    }, [post.id, currentUser]);

    // Helper function to format dates consistently
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    // Handle like/unlike functionality
    const handleLike = async () => {
        if (!post.id || !currentUser?.id) return;
        try {
            setIsLoading(prev => ({ ...prev, like: true }));
            await dispatch(toggleLike({ 
                postId: post.id, 
                userId: currentUser.id 
            })).unwrap();
        } catch (error) {
            console.error('Like error:', error);
            Alert.alert('Error', 'Unable to update like status');
        } finally {
            setIsLoading(prev => ({ ...prev, like: false }));
        }
    };

    // Handle post editing
    const handleEdit = async () => {
        if (!editedContent.trim() || !post.id || !currentUser?.id) return;
        try {
            setIsLoading(prev => ({ ...prev, edit: true }));
            await dispatch(editPost({
                postId: post.id,
                updatedData: { 
                    content: editedContent,
                    updatedAt: new Date().toISOString()
                }
            })).unwrap();
            setShowEditModal(false);
            if (onRefresh) onRefresh();
            Alert.alert('Success', 'Post updated successfully');
        } catch (error) {
            console.error('Edit error:', error);
            Alert.alert('Error', 'Failed to update post');
        } finally {
            setIsLoading(prev => ({ ...prev, edit: false }));
        }
    };

    // Handle post deletion
    const handleDelete = async () => {
        if (!post.id || !currentUser?.id) return;
        try {
            setIsLoading(prev => ({ ...prev, delete: true }));
            await dispatch(deletePost(post.id)).unwrap();
            setShowDeleteModal(false);
            if (onRefresh) onRefresh();
            Alert.alert('Success', 'Post deleted successfully');
        } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Error', 'Failed to delete post');
        } finally {
            setIsLoading(prev => ({ ...prev, delete: false }));
        }
    };

    // Handle adding new comments
    const handleAddComment = async () => {
        if (!newComment.trim() || !post.id || !currentUser?.id) return;
        try {
            setIsLoading(prev => ({ ...prev, comment: true }));
            await dispatch(addComment({
                postId: post.id,
                content: newComment.trim(),
                userId: currentUser.id
            })).unwrap();
            setNewComment('');
            if (onRefresh) onRefresh();
            Alert.alert('Success', 'Comment added successfully');
        } catch (error) {
            console.error('Comment error:', error);
            Alert.alert('Error', 'Failed to add comment');
        } finally {
            setIsLoading(prev => ({ ...prev, comment: false }));
        }
    };

    // Check if current user is the author of the post
    const isAuthor = currentUser?.id === post.author?.id;

    return (
        <ScrollView>
            <View style={styles.card}>
                {/* Post Header */}
                <View style={styles.header}>
                    <Image 
                        source={{ uri: post.author?.avatar || 'https://placekitten.com/48/48' }}
                        style={styles.avatar}
                        defaultSource={require('../assets/images/moringalogo.png')}
                    />
                    <View>
                        <Text style={styles.authorName}>
                            {post.author?.name || 'Anonymous'}
                        </Text>
                        <Text style={styles.date}>
                            {formatDate(post.createdAt)}
                        </Text>
                    </View>
                </View>

                {/* Post Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>{post.title}</Text>
                    {post.image && (
                        <Image 
                            source={{ uri: post.image }}
                            style={styles.postImage}
                        />
                    )}
                    <Text style={styles.postText}>{post.content}</Text>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>{post.category}</Text>
                    </View>
                </View>

                {/* Post Actions */}
                <View style={styles.actions}>
                    <View style={styles.interactions}>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={handleLike}
                            disabled={isLoading.like || !currentUser}
                        >
                            {isLoading.like ? (
                                <ActivityIndicator size="small" color={colors.secondary} />
                            ) : (
                                <>
                                    <Icon 
                                        name="thumb-up" 
                                        size={20} 
                                        color={post.likedBy?.includes(currentUser?.id) ? colors.secondary : 'gray'} 
                                    />
                                    <Text style={styles.actionText}>{post.likes || 0}</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => setShowComments(!showComments)}
                        >
                            <Icon name="comment" size={20} color="gray" />
                            <Text style={styles.actionText}>
                                {post.comments?.length || 0}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.actionButton}>
                            <Icon name="visibility" size={20} color="gray" />
                            <Text style={styles.actionText}>{post.views || 0}</Text>
                        </View>
                    </View>

                    {/* Edit/Delete Actions - Only visible to post author */}
                    {isAuthor && (
                        <View style={styles.editActions}>
                            <TouchableOpacity onPress={() => setShowEditModal(true)}>
                                <Icon name="edit" size={24} color={colors.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                                <Icon name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Comments Section */}
                {showComments && (
                    <View style={styles.comments}>
                        {post.comments?.map(comment => (
                            <View key={comment.id} style={styles.comment}>
                                <View style={styles.commentHeader}>
                                    <Image 
                                        source={{ uri: comment.author?.avatar }}
                                        style={styles.commentAvatar}
                                        defaultSource={require('../assets/images/moringalogo.png')}
                                    />
                                    <Text style={styles.commentAuthor}>
                                        {comment.author?.name || 'Unknown'}
                                    </Text>
                                    <Text style={styles.commentDate}>
                                        {formatDate(comment.createdAt)}
                                    </Text>
                                </View>
                                <Text style={styles.commentText}>{comment.content}</Text>
                            </View>
                        ))}

                        {/* Add Comment Section */}
                        {currentUser && (
                            <View style={styles.addComment}>
                                <TextInput
                                    style={styles.commentInput}
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChangeText={setNewComment}
                                    multiline
                                />
                                <TouchableOpacity
                                    style={styles.postButton}
                                    onPress={handleAddComment}
                                    disabled={!newComment.trim() || isLoading.comment}
                                >
                                    {isLoading.comment ? (
                                        <ActivityIndicator color={colors.white} />
                                    ) : (
                                        <Text style={styles.postButtonText}>Post</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}

                {/* Edit Modal */}
                <Modal
                    visible={showEditModal}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Post</Text>
                            <TextInput
                                style={styles.editInput}
                                value={editedContent}
                                onChangeText={setEditedContent}
                                multiline
                                numberOfLines={4}
                            />
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setShowEditModal(false)}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.saveButton]}
                                    onPress={handleEdit}
                                    disabled={isLoading.edit}
                                >
                                    {isLoading.edit ? (
                                        <ActivityIndicator color={colors.white} />
                                    ) : (
                                        <Text style={styles.buttonText}>Save</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    visible={showDeleteModal}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Delete Post</Text>
                            <Text style={styles.modalText}>
                                Are you sure you want to delete this post? 
                                This action cannot be undone.
                            </Text>
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setShowDeleteModal(false)}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.deleteButton]}
                                    onPress={handleDelete}
                                    disabled={isLoading.delete}
                                >
                                    {isLoading.delete ? (
                                        <ActivityIndicator color={colors.white} />
                                    ) : (
                                        <Text style={styles.buttonText}>Delete</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postImage: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  category: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 4,
    color: 'gray',
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  comments: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  comment: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 'auto',
  },
  commentText: {
    fontSize: 14,
  },
  addComment: {
    flexDirection: 'row',
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  postButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  postButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    marginBottom: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  saveButton: {
    backgroundColor: colors.secondary,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default PostCard;