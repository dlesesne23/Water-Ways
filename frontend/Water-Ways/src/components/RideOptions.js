import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { selectTravelTimeInformation, selectDestination, selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '@env'

const RideOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  // If we have SURGE pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5;

  const data = [
    {
      id: "Cart-X-123",
      title: "Golf Cart",
      multiplier: 0.75,
      image: require("../../assets/images/uberX.png"),
    },
    {
      id: "Boat-456",
      title: "Boat", // Coming Soon
      multiplier: 1,
      image: require("../../assets/images/uberVan.png"),
    },
    {
      id: "LUX-789",
      title: "LUX", // Coming Soon
      multiplier: 1.25,
      image: require("../../assets/images/uberBlack.png"),
    },
  ];

  const handleRequestRide = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.post(`${APP_NAME}/ride/request`, {
        currentLocation: origin.description,
        destination: destination.description,
        rideOption: selected?.title,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Ride Requested', 'Your ride request has been submitted successfully!');
      navigation.navigate('RidePage');  
    } catch (error) {
      Alert.alert('Request Failed', 'There was an error requesting your ride');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavCard")}
          style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={image}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-lg`}>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          onPress={handleRequestRide}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptions;