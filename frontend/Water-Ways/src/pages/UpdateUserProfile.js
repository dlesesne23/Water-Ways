import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'

const UpdateUserProfile = ({ navigation }) => {
    const [user, setUser] = useState({ email: '', username: '', password: '' });
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Fetch user profile on mount
      const fetchUserProfile = async () => {
        try {
          const token = await AsyncStorage.getItem('jwt_token');
          const response = await axios.get('https://your-api-endpoint.com/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    const handleUpdate = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const response = await axios.put('https://your-api-endpoint.com/profile', user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Alert.alert('Update Successful', 'Your profile has been updated.');
      } catch (error) {
        Alert.alert('Update Failed', 'An error occurred while updating your profile.');
        console.error(error);
      }
    };
  
    const handleDelete = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        await axios.delete('https://your-api-endpoint.com/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        await AsyncStorage.removeItem('jwt_token');
        Alert.alert('Delete Successful', 'Your profile has been deleted.');
        navigation.navigate('Signup');
      } catch (error) {
        Alert.alert('Delete Failed', 'An error occurred while deleting your profile.');
        console.error(error);
      }
    };
  
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
  
    return (
        <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={user.username}
          onChangeText={(username) => setUser({ ...user, username })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={user.email}
          onChangeText={(email) => setUser({ ...user, email })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={user.password}
          onChangeText={(password) => setUser({ ...user, password })}
        />
        <Button title="Update Profile" onPress={handleUpdate} />
        <Button title="Delete Profile" onPress={handleDelete} color="red" />
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

  
  export default UpdateUserProfile;