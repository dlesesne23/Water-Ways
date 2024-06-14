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
import { requestRide } from '../components/Services';
import { APP_NAME } from '@env'

const RidePage = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate('LoginPage');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={[
          tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`,
        ]}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>

      <View style={tw`h-1/2`}>
        <MapComponent />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavCard"
            component={NavCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptions"
            component={RideOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RidePage;