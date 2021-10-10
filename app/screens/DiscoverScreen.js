import React from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";

const DiscoverScreen = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={styles.appTitle}>discover</Text>
      </View>
      <View style={styles.section}>
        <Text style={{ ...styles.h3, width: "100%" }}>discover new music</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  p: {
    fontSize: 15,
    textAlign: "left",
    color: "black",
    fontFamily: "NunitoRegular",
  },
  h3: {
    fontSize: 20,
    textAlign: "left",
    color: "black",
    fontFamily: "AveriaRegular",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignContent: "flex-start",
    // backgroundColor: "blue",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  section: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignContent: "flex-start",
    // backgroundColor: "blue",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  appTitle: {
    fontSize: 40,
    textAlign: "right",
    color: COLORS.orange,
    fontFamily: "AveriaRegular",
    width: "100%",
  },
  footer: {
    top: Platform.OS === "ios" ? -60 : -100,
    // top: Dimensions.get("window").height - 900,
    paddingHorizontal: 15,
  },
});

export default DiscoverScreen;
