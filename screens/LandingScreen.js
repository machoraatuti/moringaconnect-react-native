import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Text} from 'react-native';

const LandingScreen = () => {

    return(
        <ScrollView contentContainerstyle={styles.container}>
            {/*Sign In crad */}
            <TouchableOpacity style={styles.cardContainer}>
                <ImageBackground
                    source={require("../assets/images/explore-card-bg.jpeg")}
                    imageStyle={styles.imageStyle}
                    style={styles.imageBackground}
                >
                    <View style={[styles.overlay,styles.signupCard]}>
                        <Text style={styles.cardTitle}>
                            Sign Up / Login
                        </Text>
                        <Text style={styles.cardDescription}>
                            Hey Alumni!
                        </Text>
                        <Text style={styles.cardDescription}>
                            Create your account to join Moringa Connect
                        </Text>
                        <Text style={styles.cardDescription}>
                            Don't forget to Login.
                        </Text>
                    </View>
                </ImageBackground> 
            </TouchableOpacity>

            {/*Explore crad */}
            <TouchableOpacity style={styles.cardContainer}>
                <ImageBackground
                    source={require("../assets/images/explore-card-bg.jpeg")}
                    imageStyle={styles.imageStyle}
                    style={styles.imageBackground}
                >
                    <View style={[styles.overlay,styles.exploreCard]}>
                        <Text style={styles.cardTitle}>
                            Explore
                        </Text>
                        <Text style={styles.cardDescription}>
                             Moringa Connect offers a variety of features!
                        </Text>
                    </View>
                </ImageBackground> 
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE8E0"
    },
    cardContainer: {
        width: "90%",
        borderRadius: 15,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        overflow: "hidden"
    },
    imageStyle: {
        resizeMode: "cover"
    },
    imageBackground: {
        width: "100%",
        justifyContent: "center"
    },
    overlay: {
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)"// semi-transparen
    },
    signupCard: {
        backgroundColor: "rgba(240, 90, 40, 0.8)",//Orange with transparency
        padding: 30,
    },
    exploreCard: {
        backgroundColor: "rgba(10, 31, 68, 0.8)",//Blue with transparency
        padding: 60
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
        textAlign: "center"
    }, 
});

export default LandingScreen;