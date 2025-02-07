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

const SignInScreen = () => {
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
      <Text style={styles.welcomeText}>Nice to see you again</Text>

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

      {/* Remember Me and Forgot Password */}
      <View style={styles.rememberForgotContainer}>
        <TouchableOpacity style={styles.rememberMe}>
          <FontAwesome name="square-o" size={20} color="gray" />
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      {/* Google Sign In */}
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={20} color="white" />
        <Text style={styles.googleText}>Or sign in with Google</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.signUpText} onPress={() => { /* Navigate to Sign Up */ }}>
          Sign up now
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    color: '#666',
  },
  forgotPasswordText: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  signInText: {
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
  signUpText: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
});

export default SignInScreen;