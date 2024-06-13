import { View, Text, Image, TextInput, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '@env'


const SignupScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { role } = route.params; // 'user' or 'driver'

  const handleSignup = async () => {
    try {
      const response = await fetch(`${APP_NAME}/user/signup/${role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="username"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
      style={styles.input}
    />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default SignupScreen;