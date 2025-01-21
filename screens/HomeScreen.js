import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Layout from '../shared/Layout';

const { width } = Dimensions.get('window');

const colors = {
 primary: "#0A1F44",
 secondary: "#F05A28",
 background: "#FFF5F2",
 white: "#FFFFFF"
};

const Home = () => {
 const navigation = useNavigation();
 const [openVideoModal, setOpenVideoModal] = useState(false);
 const [videoUrl, setVideoUrl] = useState("");

 const StatCard = ({ icon, number, text }) => (
   <View style={styles.statCard}>
     <Icon name={icon} size={48} color={colors.secondary} />
     <Text style={styles.statNumber}>{number}</Text>
     <Text style={styles.statText}>{text}</Text>
   </View>
 );

 const ServiceCard = ({ icon, title, description }) => (
   <View style={styles.serviceCard}>
     <Icon name={icon} size={64} color={colors.secondary} />
     <Text style={styles.cardTitle}>{title}</Text>
     <Text style={styles.cardDescription}>{description}</Text>
   </View>
 );

 const FeatureCard = ({ icon, title, description, link }) => (
   <TouchableOpacity 
     style={styles.featureCard} 
     onPress={() => navigation.navigate(link)}
   >
     <Icon name={icon} size={64} color={colors.secondary} />
     <Text style={styles.cardTitle}>{title}</Text>
     <Text style={styles.cardDescription}>{description}</Text>
     <View style={styles.learnMore}>
       <Text style={styles.learnMoreText}>Learn More</Text>
       <Icon name="arrow-forward" size={20} color={colors.secondary} />
     </View>
   </TouchableOpacity>
 );

 return (
   <Layout>
     <ScrollView style={styles.container}>
       <View style={styles.hero}>
         <Text style={styles.heroTitle}>Welcome to Moringa Connect</Text>
         <Text style={styles.heroSubtitle}>A platform for Moringa alumni to connect, grow, and thrive.</Text>
         <View style={styles.buttonContainer}>
           <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Events')}>
             <Text style={styles.buttonText}>Explore Events</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Groups')}>
             <Text style={styles.buttonText}>Join Groups</Text>
           </TouchableOpacity>
         </View>
       </View>

       <View style={styles.statsSection}>
         <StatCard icon="event" number="2014" text="Year Founded" />
         <StatCard icon="school" number="8,000+" text="Trained Professionals" />
         <StatCard icon="work" number="1,000+" text="Employer Partners" />
         <StatCard icon="star" number="95%" text="Graduate Satisfaction" />
       </View>

       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Alumni Services</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           <ServiceCard 
             icon="storefront" 
             title="Card Registration"
             description="600 KSH, renewable annually"
           />
           <ServiceCard 
             icon="library-books" 
             title="Library Services"
             description="Access Mon-Sat, 9AM-8PM"
           />
         </ScrollView>
       </View>

       <View style={styles.features}>
         <Text style={styles.sectionTitle}>Features</Text>
         <FeatureCard 
           icon="event"
           title="Events"
           description="Explore alumni events"
           link="Events"
         />
         <FeatureCard 
           icon="group"
           title="Groups"
           description="Connect with others"
           link="Groups"
         />
         <FeatureCard 
           icon="article"
           title="Posts"
           description="Share your stories"
           link="Posts"
         />
       </View>

       <View style={styles.newsletter}>
         <Text style={styles.newsletterTitle}>Subscribe to Newsletter</Text>
         <TextInput 
           style={styles.input}
           placeholder="Full Name"
         />
         <TextInput 
           style={styles.input}
           placeholder="Email Address"
         />
         <TextInput 
           style={styles.input}
           placeholder="Phone Number"
         />
         <TouchableOpacity style={styles.subscribeButton}>
           <Text style={styles.buttonText}>Subscribe</Text>
         </TouchableOpacity>
       </View>
     </ScrollView>
   </Layout>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: colors.background,
 },
 hero: {
   height: 400,
   backgroundColor: colors.primary,
   padding: 20,
   justifyContent: 'center',
   alignItems: 'center',
 },
 heroTitle: {
   fontSize: 28,
   fontWeight: 'bold',
   color: colors.white,
   textAlign: 'center',
   marginBottom: 10,
 },
 heroSubtitle: {
   fontSize: 16,
   color: colors.white,
   textAlign: 'center',
   marginBottom: 20,
 },
 buttonContainer: {
   flexDirection: 'row',
   gap: 10,
 },
 primaryButton: {
   backgroundColor: colors.secondary,
   padding: 15,
   borderRadius: 8,
 },
 secondaryButton: {
   borderColor: colors.white,
   borderWidth: 1,
   padding: 15,
   borderRadius: 8,
 },
 buttonText: {
   color: colors.white,
   fontWeight: '600',
 },
 statsSection: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   padding: 20,
   backgroundColor: colors.primary,
 },
 statCard: {
   width: '50%',
   alignItems: 'center',
   padding: 10,
 },
 statNumber: {
   fontSize: 24,
   fontWeight: 'bold',
   color: colors.secondary,
 },
 statText: {
   color: colors.white,
 },
 section: {
   padding: 20,
 },
 sectionTitle: {
   fontSize: 24,
   fontWeight: 'bold',
   color: colors.primary,
   marginBottom: 20,
 },
 serviceCard: {
   width: width * 0.7,
   backgroundColor: colors.white,
   padding: 20,
   borderRadius: 16,
   marginRight: 15,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
 },
 cardTitle: {
   fontSize: 18,
   fontWeight: '600',
   marginTop: 10,
   marginBottom: 5,
 },
 cardDescription: {
   color: '#666',
 },
 features: {
   padding: 20,
 },
 featureCard: {
   backgroundColor: colors.white,
   padding: 20,
   borderRadius: 16,
   marginBottom: 15,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
 },
 learnMore: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 10,
 },
 learnMoreText: {
   color: colors.secondary,
   marginRight: 5,
 },
 newsletter: {
   padding: 20,
   backgroundColor: colors.white,
   margin: 20,
   borderRadius: 16,
 },
 newsletterTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 15,
 },
 input: {
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 8,
   padding: 15,
   marginBottom: 10,
 },
 subscribeButton: {
   backgroundColor: colors.secondary,
   padding: 15,
   borderRadius: 8,
   alignItems: 'center',
 },
});

export default Home;