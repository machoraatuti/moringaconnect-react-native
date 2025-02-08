import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingScreen = () => {

    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Sign In Card */}
            <TouchableOpacity 
            style={styles.cardContainer}
            activeOpacity={0.8}
            >
                <ImageBackground
                    source={require("../assets/images/explore-card-bg.jpeg")}
                    imageStyle={styles.imageStyle}
                    style={styles.imageBackground}
                >
                    <View style={[styles.overlay, styles.signupCard]}>
                        <Text style={styles.cardTitle}>Sign Up / Login</Text>
                        <Text style={styles.cardDescription}>Hey Alumni!</Text>
                        <Text style={styles.cardDescription}>Create your account to join Moringa Connect</Text>
                        <Text style={styles.cardDescription}>Don't forget to Login.</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

            {/* Explore Card */}
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={()=> navigation.navigate("Search")}
                activeOpacity={0.8}
            >
                <ImageBackground
                    source={require("../assets/images/explore-card-bg.jpeg")}
                    imageStyle={styles.imageStyle}
                    style={styles.imageBackground}
                >
                    <View style={[styles.overlay, styles.exploreCard]}>
                        <Text style={styles.cardTitle}>Explore</Text>
                        <Text style={styles.cardDescription}>Moringa Connect offers a variety of features!</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50, // Adjust for spacing
        backgroundColor: "#f5f5f5",
    },
    cardContainer: {
        width: "90%",
        borderRadius: 15,
        marginVertical: 20,
        alignItems: "center", // Ensure card content is centered
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        overflow: "hidden",
    },
    imageStyle: {
        resizeMode: "cover",
    },
    imageBackground: {
        width: "100%",
        justifyContent: "center",
    },
    overlay: {
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent
    },
    signupCard: {
        backgroundColor: "rgba(240, 90, 40, 0.8)", // Orange with transparency
        padding: 30,
    },
    exploreCard: {
        backgroundColor: "rgba(10, 31, 68, 0.8)", // Blue with transparency
        padding: 60,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 8,
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 16,
        color: "#f9f9f9",
        textAlign: "center",
    },
});

export default LandingScreen;
