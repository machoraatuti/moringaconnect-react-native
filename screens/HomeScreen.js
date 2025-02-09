import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TextInput,
 Image,
 TouchableOpacity,
 SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Animated, {
 useSharedValue,
 withSpring,
 withTiming
} from 'react-native-reanimated';

const HomeScreen = () => {
 const navigation = useNavigation();
 const modalScale = useSharedValue(0);

 const batchmates = [
   { 
     id: 1, 
     name: 'Jasmin', 
     year: '2020-2021', 
     hasUpdate: true,
     image: require('../assets/images/hiking.jpg'),
   },
   { 
     id: 2, 
     name: 'Bella', 
     year: '2021', 
     hasUpdate: true,
     image: require('../assets/images/frontend.jpg'),
   },
   { 
     id: 3, 
     name: 'Vicky', 
     year: '2020-2021', 
     hasUpdate: true,
     image: require('../assets/images/bootcamp.jpg'),
   },
   { 
     id: 4, 
     name: 'LeRob', 
     year: '2023', 
     hasUpdate: true,
     image: require('../assets/images/graduation.jpg'),
   },
 ];

 const news = [
   {
     id: 1,
     title: "Latest News",
     description: "Important update about campus activities",
     image: require('../assets/images/bootcamp.jpg'),
   },
   {
     id: 2,
     title: "Tech News",
     description: "New developments in technology",
     image: require('../assets/images/frontend.jpg'),
   },
 ];

 const events = [
   {
     id: 1,
     title: 'Importance of Research Principles',
     subtitle: 'Virtual Auditorium 2',
     date: 'Mon, Dec 24',
       description: 'Join Dr. Sarah Johnson, Lead Data Scientist at Google, for an in-depth discussion on essential research principles in data science. This session will cover experimental design, bias mitigation, statistical significance, and ethical considerations in AI research. The talk will include real-world case studies and practical examples from industry projects.',
     image: require('../assets/images/bootcamp.jpg'),
   },
   {
     id: 2,
     title: 'Forum Discussion',
     subtitle: 'Virtual Auditorium 2',
     date: 'Mon, Dec 24',
      description: 'A platform for Moringa School students to present their innovative tech solutions addressing local challenges. Five selected teams will showcase their projects, including a mobile app for small-scale farmers, an AI-powered healthcare diagnostic tool, and a renewable energy monitoring system. Join us for demonstrations, technical discussions, and networking opportunities.',
     image: require('../assets/images/hiking.jpg'),
   },
 ];

 const showModal = () => {
   modalScale.value = withSpring(1);
   setTimeout(() => {
     modalScale.value = withTiming(0);
   }, 2000);
 };

 const onEventPress = (event) => {
   navigation.navigate('Events', { event });
 };

 const onNewsPress = (newsItem) => {
   navigation.navigate('NewsUpdates', { news: newsItem });
 };

 const SectionTitle = ({ title }) => (
   <View style={styles.sectionTitleContainer}>
     <Text style={styles.sectionTitle}>{title}</Text>
     <View style={styles.titleLine} />
   </View>
 );

 return (
   <SafeAreaView style={styles.container}>
     <Animated.View style={[styles.modal, {
       transform: [{ scale: modalScale }]
     }]}>
       <Text style={styles.modalText}>Successfully connected!</Text>
     </Animated.View>

     <ScrollView style={styles.scrollView}>
       <View style={styles.searchContainer}>
         <View style={styles.searchBar}>
           <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
           <TextInput
             style={styles.searchInput}
             placeholder="Search in By Grad Year or courses"
             placeholderTextColor="#666"
           />
         </View>
       </View>

       <View style={styles.section}>
         <SectionTitle title="Connect with your Batchmates" />
         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.batchmateScroll}>
           {batchmates.map((mate) => (
             <TouchableOpacity 
               key={mate.id} 
               onPress={showModal}
               style={[styles.batchmateCard, styles.shadowEffect]}
             >
               <View style={styles.imageContainer}>
                 <Image source={mate.image} style={styles.batchmateImage} />
                 {mate.hasUpdate && (
                   <View style={styles.updateBadge}>
                     <Icon name="plus" size={12} color="#fff" />
                   </View>
                 )}
               </View>
               <Text style={styles.batchmateName}>{mate.name}</Text>
               <Text style={styles.batchmateYear}>{mate.year}</Text>
             </TouchableOpacity>
           ))}
         </ScrollView>
       </View>

       <View style={styles.section}>
         <SectionTitle title="News and Updates" />
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {news.map((item) => (
             <TouchableOpacity
               key={item.id}
               onPress={() => onNewsPress(item)} 
               style={[styles.newsContainer, styles.shadowEffect]}
             >
               <Image source={item.image} style={styles.newsImage} />
               <View style={styles.newsContent}>
                 <Text style={styles.newsTitle}>{item.title}</Text>
                 <Text style={styles.newsDescription}>{item.description}</Text>
               </View>
             </TouchableOpacity>
           ))}
         </ScrollView>
       </View>

       <View style={styles.section}>
         <SectionTitle title="Upcoming Events" />
         {events.map((event) => (
           <TouchableOpacity 
             key={event.id}
             onPress={() => onEventPress(event)}
             style={[styles.eventCard, styles.shadowEffect]}
           >
             <Image source={event.image} style={styles.eventImage} />
             <View style={styles.eventContent}>
               <Text style={styles.eventTitle}>{event.title}</Text>
               <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
               <Text style={styles.eventDate}>{event.date}</Text>
               <Text style={styles.eventDescription} numberOfLines={2}>
                 {event.description}
               </Text>
             </View>
           </TouchableOpacity>
         ))}
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
 },
 modal: {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: [{translateX: -75}, {translateY: -25}],
   backgroundColor: '#4CAF50',
   padding: 15,
   borderRadius: 8,
   width: 150,
   alignItems: 'center',
   zIndex: 999,
 },
 modalText: {
   color: '#fff',
   fontSize: 14,
 },
 scrollView: {
   flex: 1,
 },
 searchContainer: {
   padding: 16,
 },
 searchBar: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 25,
   paddingHorizontal: 16,
   borderWidth: 1,
   borderColor: '#e0e0e0',
 },
 searchIcon: {
   marginRight: 8,
 },
 searchInput: {
   flex: 1,
   paddingVertical: 8,
   fontSize: 16,
 },
 section: {
   padding: 16,
 },
 sectionTitleContainer: {
   marginBottom: 16,
 },
 sectionTitle: {
   fontSize: 16,
   fontWeight: '500',
   color: '#f4511e',
 },
 titleLine: {
   height: 1,
   backgroundColor: '#e0e0e0',
   marginTop: 8,
 },
 batchmateScroll: {
   flexDirection: 'row',
 },
 batchmateCard: {
   marginRight: 16,
   alignItems: 'center',
   padding: 8,
   borderRadius: 12,
 },
 imageContainer: {
   position: 'relative',
   marginBottom: 8,
 },
 batchmateImage: {
   width: 80,
   height: 80,
   borderRadius: 12,
 },
 updateBadge: {
   position: 'absolute',
   top: -5,
   right: -5,
   width: 20,
   height: 20,
   backgroundColor: '#f44336',
   borderRadius: 10,
   justifyContent: 'center',
   alignItems: 'center',
 },
 batchmateName: {
   marginTop: 8,
   fontSize: 14,
 },
 batchmateYear: {
   fontSize: 12,
   color: '#666',
 },
 newsContainer: {
   marginRight: 16,
   borderRadius: 12,
   overflow: 'hidden',
   width: 200,
 },
 newsImage: {
   width: '100%',
   height: 150,
   borderRadius: 12,
 },
 newsContent: {
   padding: 8,
 },
 newsTitle: {
   fontSize: 16,
   fontWeight: '500',
 },
 newsDescription: {
   fontSize: 14,
   color: '#666',
   marginTop: 4,
 },
 eventCard: {
   flexDirection: 'row',
   backgroundColor: '#fff',
   borderRadius: 12,
   padding: 12,
   marginBottom: 12,
 },
 eventImage: {
   width: 60,
   height: 60,
   borderRadius: 8,
   marginRight: 12,
 },
 eventContent: {
   flex: 1,
 },
 eventTitle: {
   fontSize: 16,
   fontWeight: '500',
 },
 eventSubtitle: {
   fontSize: 14,
   color: '#666',
   marginTop: 4,
 },
 eventDate: {
   fontSize: 14,
   color: '#666',
   marginTop: 4,
 },
 eventDescription: {
   fontSize: 14,
   color: '#666',
   marginTop: 4,
 },
 shadowEffect: {
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
   backgroundColor: '#fff',
 },
});

export default HomeScreen;