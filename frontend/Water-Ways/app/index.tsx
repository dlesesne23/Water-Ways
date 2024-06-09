import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import HomePage from "../src/pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import RidePage from "../src/pages/RidePage";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";

// The Google API's we use in this project are:
// https://console.cloud.google.com/google/maps-apis/api-list

// - Directions API
// - Places API
// - Distance Matrix API

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator initialRouteName="LoginPage">
              <Stack.Screen
                name="LoginPage"
                component={LoginPage}
              />
              <Stack.Screen
                name="SignupPage"
                component={SignupPage}
              />
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RidePage"
                component={RidePage}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
