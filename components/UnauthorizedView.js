// components/UnauthorizedView.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Administrator access required</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};