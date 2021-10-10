import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "./NavBar";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainNav" component={NavBar} />
    </Stack.Navigator>
  );
};
