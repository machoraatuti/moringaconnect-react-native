import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";

const notifications = [
  {
    id: 1,
    type: "event",
    title: 'New event posted by "Department of CSE"',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "26 December 2023",
    time: "1hr",
    actions: ["Attending", "Might be Attending", "Not Attending"],
  },
  {
    id: 2,
    type: "connection",
    title: "Jasmin accepted your connect request",
    description: "You and Jasmin have 45 mutual connections",
    image: "https://via.placeholder.com/50",
    time: "1hr",
    actions: ["Say Hi!"],
  },
  {
    id: 3,
    type: "connection",
    title: "Raha accepted your connect request",
    description: "You and Katie were Batchmates!",
    image: "https://via.placeholder.com/50",
    time: "2hr",
    actions: ["Say Hi!"],
  },
  {
    id: 4,
    type: "connection_request",
    title: "Vicky sent you a connect request",
    description: "You and Abhay have 45 mutual connections",
    image: "https://via.placeholder.com/50",
    time: "9hr",
    actions: ["Accept", "Reject"],
  },
  {
    id: 5,
    type: "group_invite",
    title: 'Vicky and Jasmin invited you to join "CSE 2004" Group',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "11hr",
    actions: ["Join", "Reject"],
  },
];

export default function NotificationScreen() {
  const [filter, setFilter] = useState("All");

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((notif) => notif.type === filter.toLowerCase());

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.title}>{item.title}</Text>
      {item.description && <Text style={styles.description}>{item.description}</Text>}
      {item.date && <Text style={styles.date}>Date: {item.date}</Text>}
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.actions}>
        {item.actions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <Text style={styles.actionText}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerIcons}>
          {/* Replace with actual icons */}
          <Text>☰</Text>
          <Text>🔔</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {["All", "Connections", "Events", "General"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filterButton, filter === item && styles.filterButtonActive]}
            onPress={() => setFilter(item)}
          >
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  filterButtonActive: {
    backgroundColor: "#ff7043",
  },
  filterText: {
    fontSize: 14,
    color: "#555",
  },
  filterTextActive: {
    color: "#fff",
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: "#777",
  },
  time: {
    marginTop: 5,
    fontSize: 12,
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#ff7043",
  },
  actionText: {
    fontSize: 14,
    color: "#fff",
  },
});
