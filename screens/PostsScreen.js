import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import Layout from '../shared/Layout';

const colors = {
 primary: '#0A1F44',
 secondary: '#F05A28', 
 background: '#FFF5F2',
 white: '#FFFFFF'
};

const Posts = () => {
 //const dispatch = useDispatch();
 //const posts = useSelector(selectAllPosts);
 const [searchTerm, setSearchTerm] = useState('');
 const [categoryFilter, setCategoryFilter] = useState('all');
 const [showCreatePost, setShowCreatePost] = useState(false);

 useEffect(() => {
   dispatch(fetchPosts());
 }, [dispatch]);

 const categories = ['all', 'Technology', 'Career', 'Education', 'Events', 'Projects', 'Other'];

 const filteredPosts = posts.filter(post => {
   const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
   const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
   return matchesSearch && matchesCategory;
 });

 const handlePostCreated = () => {
   setShowCreatePost(false);
   dispatch(fetchPosts());
 };

 return (
   <Layout>
     <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.title}>Posts</Text>
         <TouchableOpacity
           style={styles.createButton}
           onPress={() => setShowCreatePost(true)}
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
         keyExtractor={(item) => item.id}
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

       <Modal
         visible={showCreatePost}
         animationType="slide"
         onRequestClose={() => setShowCreatePost(false)}
       >
         <CreatePost onClose={handlePostCreated} />
       </Modal>
     </View>
   </Layout>
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
   fontWeight: '600',
   color: colors.primary,
 },
 createButton: {
   flexDirection: 'row',
   backgroundColor: colors.secondary,
   padding: 12,
   borderRadius: 8,
   alignItems: 'center',
 },
 buttonText: {
   color: colors.white,
   marginLeft: 8,
 },
 searchContainer: {
   padding: 16,
   gap: 12,
 },
 searchBar: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: colors.white,
   padding: 8,
   borderRadius: 8,
 },
 searchInput: {
   flex: 1,
   marginLeft: 8,
 },
 picker: {
   backgroundColor: colors.white,
   borderRadius: 8,
 },
 emptyContainer: {
   padding: 16,
   alignItems: 'center',
 },
 emptyText: {
   fontSize: 16,
   textAlign: 'center',
   color: colors.primary,
 }
});

export default Posts;