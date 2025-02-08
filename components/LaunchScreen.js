// components/LoadingView.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';

const LaunchScreen = () => {
  return(
    <View style={styles.container}>
      <View style={styles.heroImageContainer}>
        <Image 
          resizeMode="contain"
          source={require("../assets/images/launch-screen-image-removebg-preview.png")}
          style={styles.heroImage}
        />
        </View>
        <View style={styles.heroContainer}>
          <View style={styles.heroImageDescription}>
            <Text style={styles.heroTitle}>
              Moringa Alumni Connect
            </Text> 
            <Text style={styles.heroText}>
              Where Moringa Tech Graduates Reunite, Grow and Innovate Together.
            </Text>
          </View>
        </View>
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="#F05A28" />
        <Text style={styles.heroText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFE8E0",
  },
  heroContainer: {

  },
  heroImageContainer: {
    alignItems: "center",
  },
  heroImageDescription: {
    marginTop: 20,
    alignItems: "center"
  },
  heroImage: {
    width: 300,
    height: 300
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0A1F44"
  },
  heroText: {
    marginTop: 5,
    color: "#333",
    textAlign: "center",
    fontSize: 16,
  },
  activityContainer: { 
    marginTop: 20 
  },
});

export default LaunchScreen;
