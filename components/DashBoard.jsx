import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProgressBar } from 'react-native-paper';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const stats = [
  { title: 'Total Alumni', count: 1200, increase: '+12%', icon: 'school' },
  { title: 'Active Groups', count: 150, increase: '+5%', icon: 'group' },
  { title: 'Monthly Posts', count: 450, increase: '+8%', icon: 'article' },
  { title: 'Employment Rate', count: '85%', increase: '+3%', icon: 'work' }
];

const alumniProgress = [
  { course: 'Software Engineering', count: 450, target: 500, progress: 0.9 },
  { course: 'Data Science', count: 280, target: 300, progress: 0.93 },
  { course: 'UI/UX Design', count: 180, target: 200, progress: 0.9 }
];

const recentActivities = [
  {
    name: 'Horace Njoroge',
    action: 'Started new position at Microsoft',
    time: '2 hours ago'
  },
  {
    name: 'Jeremy Kibaara',
    action: 'Completed AWS certification',
    time: '5 hours ago'
  }
];

const upcomingEvents = [
  {
    name: 'Alumni Networking Night',
    date: 'March 15, 2024',
    participants: 45
  },
  {
    name: 'Tech Talk: AI in 2024',
    date: 'March 20, 2024',
    participants: 120
  }
];

const jobStats = [
  { company: 'Microsoft', hires: 25 },
  { company: 'Safaricom', hires: 20 },
  { company: 'Google', hires: 15 },
  { company: 'Local Startups', hires: 45 }
];

const StatCard = ({ title, count, increase, icon }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={[styles.iconContainer, { backgroundColor: colors.secondary }]}>
        <Icon name={icon} size={24} color={colors.white} />
      </View>
      <Text style={styles.increase}>{increase}</Text>
    </View>
    <Text style={styles.count}>{count}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Admin = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Enrollment Progress</Text>
        {alumniProgress.map((course, index) => (
          <View key={index} style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>{course.course}</Text>
              <Text style={styles.progressCount}>
                {course.count}/{course.target}
              </Text>
            </View>
            <ProgressBar 
              progress={course.progress} 
              color={colors.secondary}
              style={styles.progressBar}
            />
          </View>
        ))}
      </View>

      <View style={styles.row}>
        <View style={[styles.section, styles.flex1]}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityAction}>{activity.action}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, styles.flex1]}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDetails}>
                {event.date} • {event.participants} registered
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Hiring Companies</Text>
        {jobStats.map((company, index) => (
          <View key={index} style={styles.companyItem}>
            <Text style={styles.companyName}>{company.company}</Text>
            <Text style={styles.companyHires}>{company.hires} alumni</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.viewReportButton}>
          <Text style={styles.viewReportText}>View Full Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    width: 150,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  increase: {
    color: 'green',
    backgroundColor: 'rgba(0,200,0,0.1)',
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    color: colors.primary,
  },
  progressCount: {
    color: 'gray',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  activityItem: {
    marginBottom: 12,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  activityAction: {
    color: 'gray',
  },
  activityTime: {
    fontSize: 12,
    color: 'gray',
  },
  eventItem: {
    marginBottom: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  eventDetails: {
    color: 'gray',
  },
  companyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.divider,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  companyName: {
    color: colors.primary,
  },
  companyHires: {
    color: colors.secondary,
  },
  viewReportButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewReportText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default Admin;