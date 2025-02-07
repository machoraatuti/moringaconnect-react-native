import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    FlatList,
    ActivityIndicator,
    Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import Layout from '../shared/Layout';
import { 
    fetchPosts, 
    selectAllPosts, 
    selectPostsLoading, 
    selectPostsError,
    clearErrors 
} from '../features/postSlice/postSlice';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

// Define consistent colors for better maintainability
const colors = {
    primary: '#0A1F44',
    secondary: '#F05A28',
    background: '#FFF5F2',
    white: '#FFFFFF',
    error: '#FF3B30',
    textPrimary: '#333333',
    textSecondary: '#666666',
    border: 'rgba(0,0,0,0.1)'
};

const PostScreen = () => {
    const dispatch = useDispatch();
    
    // Set up Redux state selectors
    const posts = useSelector(selectAllPosts);
    const loading = useSelector(selectPostsLoading);
    const error = useSelector(selectPostsError);

    // Local state for UI controls
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [isCreatePostVisible, setCreatePostVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Available categories for filtering
    const categories = [
        'all', 
        'Technology', 
        'Career', 
        'Education', 
        'Events', 
        'Projects', 
        'Other'
    ];

    // Function to load posts with error handling
    const loadPosts = useCallback(async () => {
        try {
            console.log('Attempting to load posts...');
            const result = await dispatch(fetchPosts()).unwrap();
            console.log('Posts loaded successfully:', result?.length || 0);
        } catch (error) {
            console.error('Error loading posts:', error);
            Alert.alert(
                'Error',
                'Unable to load posts. Please try again.',
                [{ text: 'OK' }]
            );
        }
    }, [dispatch]);

    // Initial data load and cleanup
    useEffect(() => {
        let mounted = true;

        const loadInitialPosts = async () => {
            console.log('Loading initial posts...');
            if (mounted) {
                await loadPosts();
            }
        };

        loadInitialPosts();

        // Cleanup function to prevent memory leaks
        return () => {
            mounted = false;
            console.log('Cleaning up PostScreen...');
            dispatch(clearErrors());
        };
    }, [loadPosts, dispatch]);

    // Handle pull-to-refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadPosts();
        setIsRefreshing(false);
    };

    // Filter posts based on search and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = 
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Handle modal close and refresh
    const handleCreatePostClose = useCallback(() => {
        setCreatePostVisible(false);
        loadPosts();
    }, [loadPosts]);

    // Render loading state
    if (loading && !isRefreshing) {
        return (
            <Layout>
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size="large" color={colors.secondary} />
                    <Text style={styles.loadingText}>Loading posts...</Text>
                </View>
            </Layout>
        );
    }

    // Render error state
    if (error) {
        return (
            <Layout>
                <View style={styles.centeredContainer}>
                    <Icon name="error-outline" size={48} color={colors.error} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={loadPosts}
                    >
                        <Text style={styles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </Layout>
        );
    }

    // Main component render
    return (
        <Layout>
            <View style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Posts</Text>
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={() => setCreatePostVisible(true)}
                    >
                        <Icon name="add" size={24} color={colors.white} />
                        <Text style={styles.buttonText}>Create Post</Text>
                    </TouchableOpacity>
                </View>

                {/* Search and Filter Section */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Icon name="search" size={24} color={colors.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            placeholderTextColor={colors.textSecondary}
                        />
                        {searchTerm ? (
                            <TouchableOpacity 
                                onPress={() => setSearchTerm('')}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Icon name="clear" size={20} color={colors.textSecondary} />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    
                    <Picker
                        selectedValue={categoryFilter}
                        style={styles.picker}
                        onValueChange={setCategoryFilter}
                    >
                        {categories.map(category => (
                            <Picker.Item 
                                key={category} 
                                label={category.charAt(0).toUpperCase() + category.slice(1)} 
                                value={category} 
                            />
                        ))}
                    </Picker>
                </View>

                {/* Posts List */}
                <FlatList
                    data={filteredPosts}
                    keyExtractor={item => item.id?.toString()}
                    renderItem={({ item }) => (
                        <PostCard 
                            post={item} 
                            onRefresh={loadPosts}
                        />
                    )}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Icon 
                                name={searchTerm || categoryFilter !== 'all' ? 'search-off' : 'post-add'} 
                                size={48} 
                                color={colors.textSecondary} 
                            />
                            <Text style={styles.emptyText}>
                                {searchTerm || categoryFilter !== 'all' 
                                    ? 'No posts match your filters. Try adjusting your search.'
                                    : 'No posts yet. Be the first to create one!'}
                            </Text>
                        </View>
                    )}
                />

                {/* Create Post Modal */}
                <CreatePost 
                    visible={isCreatePostVisible}
                    onClose={handleCreatePostClose}
                />
            </View>
        </Layout>
    );
};

// Styles definition with proper organization and comments
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.white,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.primary
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 8
    },
    buttonText: {
        color: colors.white,
        fontWeight: '500'
    },
    searchContainer: {
        padding: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        marginLeft: 8,
        color: colors.textPrimary
    },
    picker: {
        backgroundColor: colors.background,
        borderRadius: 8,
        marginTop: 8
    },
    listContainer: {
        flexGrow: 1,
        padding: 8
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        textAlign: 'center',
        color: colors.textSecondary,
        fontSize: 16,
        marginTop: 16
    },
    loadingText: {
        marginTop: 12,
        color: colors.textSecondary,
        fontSize: 16
    },
    errorText: {
        color: colors.error,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 16
    },
    retryButton: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 16
    },
    retryButtonText: {
        color: colors.white,
        fontWeight: '500'
    }
});

export default PostScreen;