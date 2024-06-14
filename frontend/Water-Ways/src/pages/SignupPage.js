import { View, Text, Image, TextInput, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '@env'


const SignupPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  
    const handleSignup = async () => {
  
      try {
        const response = await axios.post(`${APP_NAME}/user/signup`, {
          email,
          username,
          password,
        });
        const { token } = response.data;
        await AsyncStorage.setItem('jwt_token', token);
        Alert.alert('Signup Successful', 'You are now registered!');
        // Navigate to the home screen or another part of the app
        navigation.navigate('HomePage');
      } catch (error) {
        Alert.alert('Signup Failed', 'There was an error registering your account');
        console.error(error);
      }
    };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Signup</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
      keyboardType="username"
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      autoCapitalize="none"
    />
    <Button title="Sign Up" onPress={handleSignup} />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
  });

export default SignupPage