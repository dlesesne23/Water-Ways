import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements/dist/icons/Icon";
import NavCard from "../components/NavCard";
import { createStackNavigator } from "@react-navigation/stack";
import RideOptions from "../components/RideOptions";
import MapComponent from "../components/MapComponent";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Button, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { requestRide } from '../components/Services';
import io from 'socket.io-client';
import { APP_NAME } from '@env'

const SOCKET_SERVER_URL = APP_NAME; // Replace with your server IP

const RidePage = ({ userId }) => {
  const [region, setRegion] = useState(null);
  const [rideStatus, setRideStatus] = useState('Request Ride');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      const socketClient = io(SOCKET_SERVER_URL);
      setSocket(socketClient);

      socketClient.on('rideAccepted', (ride) => {
        Alert.alert('Ride Accepted', `Your ride has been accepted by driver ${ride.driver}`);
        setRideStatus('Ride Accepted');
      });

      socketClient.on('rideCompleted', () => {
        Alert.alert('Ride Completed', 'Your ride has been completed.');
        setRideStatus('Request Ride');
      });

      return () => {
        socketClient.disconnect();
      };
    })();
  }, []);

  const handleRequestRide = async () => {
    try {
      setRideStatus('Requesting...');
      const pickupLocation = [region.latitude, region.longitude];
      const dropoffLocation = [37.78525, -122.4214]; // Example dropoff location
      const ride = await requestRide(userId, pickupLocation, dropoffLocation);
      setRideStatus('Ride Requested');
      socket.emit('rideRequested', ride);
    } catch (error) {
      console.error('Error requesting ride', error);
      setRideStatus('Request Ride');
    }
  };

  if (!region) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title={rideStatus} onPress={handleRequestRide} disabled={rideStatus !== 'Request Ride'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RidePage;