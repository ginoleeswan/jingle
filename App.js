import React from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigation } from "./app/navigation/HomeNavigation";

import {
  useFonts,
  AveriaSerifLibre_300Light as AveriaLight,
  AveriaSerifLibre_400Regular as AveriaRegular,
  AveriaSerifLibre_700Bold as AveriaBold,
} from "@expo-google-fonts/averia-serif-libre";

import {
  Nunito_300Light as NunitoLight,
  Nunito_400Regular as NunitoRegular,
  Nunito_700Bold as NunitoBold,
  Nunito_900Black as NunitoBlack,
} from "@expo-google-fonts/nunito";

export default function App() {
  let [fontsLoaded] = useFonts({
    AveriaLight,
    AveriaRegular,
    AveriaBold,
    NunitoLight,
    NunitoRegular,
    NunitoBold,
    NunitoBlack,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
    );
  }
}
