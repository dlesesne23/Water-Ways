import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
import NavFavorites from "../components/NavFavorites";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import NavOptions from "../components/NavOptions";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate('UserLogin'); // or any other screen you want to navigate to
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateUserProfile")}
        style={[
          tw`bg-gray-100 absolute top-8 right-8 z-50 p-3 rounded-full shadow-lg`,
        ]}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Button title="Logout" onPress={handleLogout} />
      </View>


      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={require("../../assets/images/uberAssist.png")}
        />

        <GooglePlacesAutocomplete
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;