import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '@env'

const RideRequestPage = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  const handleRequestRide = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.post(`${APP_NAME}/request`, {
        currentLocation,
        destination,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Ride Requested', 'Your ride request has been submitted successfully!');
      // Navigate to the ride details screen or another part of the app
      navigation.navigate('RideScreen');  // Assuming you have a RideScreen to show ride details
    } catch (error) {
      Alert.alert('Request Failed', 'There was an error requesting your ride');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Ride</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Location"
        value={currentLocation}
        onChangeText={setCurrentLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Request Ride" onPress={handleRequestRide} />
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

export default RideRequestPage;