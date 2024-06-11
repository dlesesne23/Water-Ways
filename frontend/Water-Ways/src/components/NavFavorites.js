import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

export default function NavFavorites() {
  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "111 Coves Ln, Cypress, TX",
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "1234 Houston Rd, Houston, TX",
    },
  ];

  return (
    <FlatList
      data={data}
      automaticallyAdjustContentInsets={false}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tw`bg-gray-200`,
            {
              height: 0.5,
            },
          ]}
        />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({});