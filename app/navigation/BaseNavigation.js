import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "./NavBar";
import LoginScreen from "../screens/LoginScreen";
import { auth } from "../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import Landing from "../components/auth/Landing";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

import { Provider, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createNativeStackNavigator();

export const BaseNavigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     if (!user) {
  //       setLoggedIn(false), setLoaded(true);
  //     } else {
  //       setLoggedIn(true), setLoaded(true);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (initializing) setInitializing(false);
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!loggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainNav" component={NavBar} />
      </Stack.Navigator>
    </Provider>
  );
};
