import React from 'react';
import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import CustomHeader from './CustomHeader';

const Layout = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <CustomHeader />
    <View style={styles.content}>
      {children}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    minHeight: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF5F2',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  }
});

export default Layout;