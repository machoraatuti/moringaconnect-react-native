// components/LoadingView.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);
