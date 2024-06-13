import React { useContext }from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import HomePage from "../src/pages/HomePage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import RidePage from "../src/pages/RidePage";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import { View, Text } from "react-native";
import UpdateUserProfile from "../src/pages/UpdateUserProfile";
import { NavigationContainer } from '@react-navigation/native';

// The Google API's we use in this project are:
// https://console.cloud.google.com/google/maps-apis/api-list

// - Directions API
// - Places API
// - Distance Matrix API

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useContext(AuthContext);

  return (
      
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          > 
            <Stack.Navigator>
            <Stack.Screen name="UserLogin">
            {(props) => <LoginPage {...props} role="user" />}
          </Stack.Screen>
          <Stack.Screen name="DriverLogin">
            {(props) => <LoginPage {...props} role="driver" />}
          </Stack.Screen>
          <Stack.Screen name="UserSignup">
            {(props) => <SignupPage {...props} role="user" />}
          </Stack.Screen>
          <Stack.Screen name="DriverSignup">
            {(props) => <SignupPage {...props} role="driver" />}
          </Stack.Screen>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                  headerShown: false,
                }}
              /> */}
              <Stack.Screen
                name="RidePage"
                component={RidePage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="UpdateUserProfile" 
                  component={UpdateUserProfile} 
                  />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
