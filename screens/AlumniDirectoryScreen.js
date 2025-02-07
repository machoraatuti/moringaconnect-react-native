import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-elements";

const AlumniDirectory = () => {
    const alumniData = [
        {
            id: 1, 
            name: "Brian Mwangi", 
            class: "Class of 2015", 
            course: "Software Engineering", 
            occupation: "Senior Software Engineer, Andela", 
            image: require("../assets/images/avatar-dir-1.jpeg")
        },
        {
            id: 2, 
            name: "Naomi Wanjiru", 
            class: "Class of 2016", 
            course: "Full-Stack Development", 
            occupation: "Tech Lead, Twiga Foods", 
            image: require("../assets/images/avatar-dir-2.jpeg")
        },
        {
            id: 3, 
            name: "Sylvia Mukasa", 
            class: "Class of 2016", 
            course: "Full-Stack Development", 
            occupation: "CEO & Founder, GlobalX Investments Ltd", 
            image: require("../assets/images/avatar-dir-3.jpeg")
        },
        {
            id: 4, 
            name: "Joseph Ngugi", 
            class: "Class of 2018", 
            course: "Data Science", 
            occupation: "Senior Data Scientist, Safaricom PLC", 
            image: require("../assets/images/avatar-dir-4.jpeg")
        },
        {
            id: 5, 
            name: "Lydia Wanjiku", 
            class: "Class of 2019", 
            course: "Cybersecurity", 
            occupation: "Security Engineer, Microsoft", 
            image: require("../assets/images/avatar-dir-5.jpeg")
        },
        {
            id: 6, 
            name: "John Mureithi", 
            class: "Class of 2017", 
            course: "Mobile App Development", 
            occupation: "Senior Android Engineer, Google", 
            image: require("../assets/images/avatar-dir-6.jpeg")
        }
    ];
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {alumniData.map((alumni, index) => (
                <View key={alumni.id} style={styles.alumniCard}>
                    <View style={styles.alumniRow}>
                        {/* Avatar on the left */}
                        <Avatar source={alumni.image} size={60} rounded />

                        {/* Text Content */}
                        <View style={styles.textContainer}>
                            <View style={styles.descContainer}>
                                <Icon name="user" type="font-awesome" size={18} color="#555" />
                                <Text style={styles.alumniName}>{alumni.name}</Text>
                            </View>
                            <View style={styles.descContainer}>
                                <Icon name="graduation-cap" type="font-awesome" size={18} color="#555" />
                                <Text style={styles.alumniDescText}>{alumni.class}</Text>
                            </View>
                            <View style={styles.descContainer}>
                                <Icon name="certificate" type="font-awesome" size={18} color="#555" />
                                <Text style={styles.alumniDescText}>{alumni.course}</Text>
                            </View>
                            <View style={styles.descContainer}>
                                <Icon name="briefcase" type="font-awesome" size={18} color="#555" />
                                <Text style={styles.alumniDescText}>{alumni.occupation}</Text>
                            </View>
                        </View>

                        {/* Message Button */}
                        <View style={styles.messageContainer}>
                            <TouchableOpacity
                                style={styles.messageButton}
                                onPress={() => console.log(`Message ${alumni.name}`)}
                            >
                                <Icon 
                                    name="comment"
                                    type="font-awesome"
                                    size={18}
                                    color={"#007bff"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Separator */}
                    {index !== alumniData.length - 1 && <View style={styles.viewSeparator} />}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#FFE8E0",
    },
    alumniCard: {
        paddingBottom: 15,  
    },
    alumniRow: {
        flexDirection: "row",
        alignItems: "center", 
        marginBottom: 10,  
        position: "relative"
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        padding: 15
    },
    descContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    alumniName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#F05A28",
        marginLeft: 10,
    },
    alumniDescText: {
        fontSize: 14,
        color: "#555",
        marginLeft: 10,
    },
    viewSeparator: {
        height: 2,
        width: "100%",
        backgroundColor: "#F7941D",
        marginTop: 10,
        opacity: 0.7,
    },
    messageContainer: {
        position: "absolute",
        right: 0,
        bottom: 10,
    },
    messageButton: {
        padding: 5,
    }
});

export default AlumniDirectory;



