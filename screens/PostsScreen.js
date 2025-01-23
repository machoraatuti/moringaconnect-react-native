import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import Layout from '../shared/Layout';
import { fetchPosts, selectAllPosts, selectPostsLoading, selectPostsError } from '../features/postSlice/postSlice';
import CreatePost from '../components/CreatePost'; 
import PostCard from '../components/PostCard';

const colors = {
 primary: '#0A1F44',
 secondary: '#F05A28',
 background: '#FFF5F2', 
 white: '#FFFFFF'
};

const PostScreen = () => {
 const dispatch = useDispatch();
 const posts = useSelector(selectAllPosts);
 const loading = useSelector(selectPostsLoading);
 const error = useSelector(selectPostsError);

 const [searchTerm, setSearchTerm] = useState('');
 const [categoryFilter, setCategoryFilter] = useState('all');
 const [isCreatePostVisible, setCreatePostVisible] = useState(false);

 useEffect(() => {
   dispatch(fetchPosts());
 }, [dispatch]);

 const categories = ['all', 'Technology', 'Career', 'Education', 'Events', 'Projects', 'Other'];

 const filteredPosts = posts.filter(post => {
   const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
   const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
   return matchesSearch && matchesCategory;
 });

 if (loading) {
   return (
     <Layout>
       <View style={styles.centeredContainer}>
         <Text>Loading posts...</Text>
       </View>
     </Layout>
   );
 }

 if (error) {
   return (
     <Layout>
       <View style={styles.centeredContainer}>
         <Text style={styles.errorText}>Error: {error}</Text>
       </View>
     </Layout>
   );
 }

 return (
   <Layout>
     <View style={styles.container}>
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

       <View style={styles.searchContainer}>
         <View style={styles.searchBar}>
           <Icon name="search" size={24} color="#666" />
           <TextInput
             style={styles.searchInput}
             placeholder="Search posts..."
             value={searchTerm}
             onChangeText={setSearchTerm}
           />
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

       <FlatList
         data={filteredPosts}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => <PostCard post={item} />}
         ListEmptyComponent={() => (
           <View style={styles.emptyContainer}>
             <Text style={styles.emptyText}>
               No posts found. {searchTerm || categoryFilter !== 'all' 
                 ? 'Try adjusting your filters.' 
                 : 'Be the first to create one!'}
             </Text>
           </View>
         )}
       />

       <CreatePost 
         visible={isCreatePostVisible}
         onClose={() => {
           setCreatePostVisible(false);
           dispatch(fetchPosts());
         }}
       />
     </View>
   </Layout>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: colors.background
 },
 centeredContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: 16,
   backgroundColor: colors.white
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
   borderBottomColor: 'rgba(0,0,0,0.1)'
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
   marginLeft: 8
 },
 picker: {
   backgroundColor: colors.background,
   borderRadius: 8
 },
 emptyContainer: {
   padding: 16,
   alignItems: 'center'
 },
 emptyText: {
   textAlign: 'center',
   color: '#666'
 },
 errorText: {
   color: 'red',
   fontSize: 16
 }
});

export default PostScreen;