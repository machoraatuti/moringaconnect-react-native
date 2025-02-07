import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
 primary: '#0A1F44',
 secondary: '#F05A28',
 white: '#FFFFFF',
 divider: 'rgba(240, 90, 40, 0.12)',
 success: '#4caf50',
 online: '#4caf50',
 offline: '#757575'
};

const UserCard = ({ user = {}, isOnline = false }) => {
 const safeUser = {
   name: user.name || 'Unknown User',
   avatar: user.avatar || require('../assets/images/moringalogo.png'),
   role: user.role || 'No Role',
   company: user.company || '',
   location: user.location || 'No Location',
   status: user.status || 'Unspecified'
 };

 return (
   <View style={styles.card}>
     <View style={styles.header}>
       <View style={styles.userInfo}>
         <View style={styles.avatarContainer}>
           <Image 
             source={
               typeof safeUser.avatar === 'string' 
                 ? { uri: safeUser.avatar } 
                 : safeUser.avatar
             }
             style={styles.avatar}
             resizeMode="cover"
           />
           <View style={[
             styles.onlineIndicator,
             { backgroundColor: isOnline ? colors.online : colors.offline }
           ]} />
         </View>
         
         <View style={styles.userDetails}>
           <View style={styles.nameContainer}>
             <Text style={styles.name}>{safeUser.name}</Text>
             {isOnline && (
               <View style={styles.onlineTag}>
                 <Text style={styles.onlineText}>Online</Text>
               </View>
             )}
           </View>
           <Text style={styles.role}>
             {safeUser.role} {safeUser.company ? `at ${safeUser.company}` : ''}
           </Text>
           <View style={styles.locationContainer}>
             <Icon name="work" size={16} color={colors.secondary} />
             <Text style={styles.location}>{safeUser.location}</Text>
           </View>
         </View>
       </View>
       
       <TouchableOpacity>
         <Icon name="more-vert" size={24} color={colors.primary} />
       </TouchableOpacity>
     </View>

     <View style={styles.footer}>
       <View style={styles.statusContainer}>
         <View style={[
           styles.statusChip,
           { 
             backgroundColor: 
               safeUser.status === 'Employed' ? colors.success : 
               safeUser.status === 'Active' ? colors.secondary : 
               colors.offline 
           }
         ]}>
           <Text style={styles.statusText}>{safeUser.status}</Text>
         </View>
       </View>

       <View style={styles.actions}>
         {[
           { name: 'visibility', color: colors.primary },
           { name: 'email', color: colors.secondary },
           { name: 'link', color: colors.primary },
           { name: 'code', color: colors.primary }
         ].map((action, index) => (
           <TouchableOpacity key={index} style={styles.actionButton}>
             <Icon name={action.name} size={20} color={action.color} />
           </TouchableOpacity>
         ))}
       </View>
     </View>
   </View>
 );
};

const styles = StyleSheet.create({
 card: {
   backgroundColor: colors.white,
   borderRadius: 8,
   padding: 16,
   marginVertical: 8,
   elevation: 2,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
 },
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 16,
 },
 userInfo: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 12,
 },
 avatarContainer: {
   position: 'relative',
 },
 avatar: {
   width: 80,
   height: 80,
   borderRadius: 40,
   borderWidth: 3,
   borderColor: colors.secondary,
 },
 onlineIndicator: {
   position: 'absolute',
   bottom: 0,
   right: 0,
   width: 12,
   height: 12,
   borderRadius: 6,
   borderWidth: 2,
   borderColor: colors.white,
 },
 nameContainer: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 userDetails: {
   flex: 1,
 },
 name: {
   fontSize: 18,
   fontWeight: 'bold',
   color: colors.primary,
   marginRight: 8,
 },
 onlineTag: {
   backgroundColor: `${colors.online}15`,
   paddingHorizontal: 8,
   paddingVertical: 2,
   borderRadius: 4,
 },
 onlineText: {
   color: colors.online,
   fontSize: 12,
 },
 role: {
   color: 'gray',
   marginBottom: 4,
 },
 locationContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 4,
 },
 location: {
   color: 'gray',
   fontSize: 14,
 },
 footer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 statusContainer: {
   flex: 1,
 },
 statusChip: {
   alignSelf: 'flex-start',
   paddingHorizontal: 8,
   paddingVertical: 4,
   borderRadius: 12,
 },
 statusText: {
   color: colors.white,
   fontSize: 12,
   fontWeight: '500',
 },
 actions: {
   flexDirection: 'row',
   gap: 8,
 },
 actionButton: {
   padding: 8,
 },
});

export default UserCard;