import { View, Text, Image, StyleSheet, Button, TextInput, Alert } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '@env'

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${APP_NAME}/user/signin`, {
        username,
        password,
      });
      const { token } = response.data;
      await AsyncStorage.setItem('jwt_token', token);
      Alert.alert('Login Successful', 'You are now logged in!');
      // Navigate to the home screen or another part of the app
      navigation.navigate('HomePage');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
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
    <Button title="Login" onPress={handleLogin} />
    <Text>Don't have an account?</Text>
    <TouchableOpacity onPress={e =>navigation.navigate('SignupPage')} >
        <Text className="text-xl text-white font-bold text-center">Signup</Text>
      </TouchableOpacity>
  </View>
);
};

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

export default LoginPage