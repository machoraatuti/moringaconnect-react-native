import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SignUpScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/graduation-cap.png')} // Replace with your actual icon path
          style={styles.icon}
        />
        <Text style={styles.headerText}>Moringa Alumni Connect</Text>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Email or phone number" keyboardType="email-address" />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          secureTextEntry={!passwordVisible}
        />
        <FontAwesome
          name={passwordVisible ? 'eye' : 'eye-slash'}
          size={20}
          color="gray"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </View>
      <TextInput style={styles.input} placeholder="Enter Branch" />
      <TextInput style={styles.input} placeholder="Enter Batch" />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Google Sign Up */}
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={20} color="white" />
        <Text style={styles.googleText}>Or sign up with Google</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.signInText} onPress={() => { /* Navigate to Sign In */ }}>
          Sign in now
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  passwordInput: {
    flex: 1,
  },
  signUpButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  googleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  signInText: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
