import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";

import ProfileScreen from "../screens/ProfileScreen";
import { COLORS } from "../styles/colors";
import DiscoverScreen from "../screens/DiscoverScreen";
import TrendingScreen from "../screens/TrendingScreen";

import { connect, useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions/index";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // console.log(currentUser);
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size, style }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Add") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Discover") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Trending") {
            iconName = focused ? "trending-up" : "trending-up-outline";
          }

          // You can return any component that you like here!
          if (route.name != "Add") {
            return (
              <View style={{ position: "absolute", top: "30%" }}>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                  containerStyle={{ textAlignVertical: "center" }}
                />
              </View>
            );
          } else {
            return (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -30,
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 70,
                  borderColor: "grey",
                  borderWidth: 1,
                  backgroundColor: "navy",
                  ...styles.shadow,
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Ionicons
                  name={iconName}
                  size={size}
                  color={"beige"}
                  containerStyle={{ textAlignVertical: "center" }}
                />
              </TouchableOpacity>
            );
          }
        },

        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: "gray",
        // tabBarLabel: ({ focused }) => {
        //   if (route.name === "Home" || route.name === "Profile") {
        //     return focused ? (
        //       <Text
        //         style={{
        //           fontSize: 10,
        //           top: 15,
        //           color: COLORS.orange,
        //           fontFamily: "AveriaRegular",
        //         }}
        //       >
        //         {route.name}
        //       </Text>
        //     ) : (
        //       <Text
        //         style={{
        //           fontSize: 10,
        //           top: 15,
        //           color: "gray",
        //           fontFamily: "AveriaRegular",
        //         }}
        //       >
        //         {route.name}
        //       </Text>
        //     );
        //   }
        // },
        tabBarShowLabel: false,
        headerTitleAlign: "center",

        tabBarStyle: {
          position: "absolute",
          flex: 1,
          alignSelf: "center",
          bottom: 0,
          //   left: 20,
          //   right: 20,
          elevation: 0,
          padding: 0,
          backgroundColor: COLORS.white,
          borderWidth: 0,
          height: 70,
          // ...styles.shadow,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Trending" component={TrendingScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default NavBar;
