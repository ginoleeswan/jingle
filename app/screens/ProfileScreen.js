import React from "react";
import { TouchableOpacity } from "react-native";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { COLORS } from "../styles/colors";

const ProfileScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={styles.appTitle}>profile</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.p}>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  appTitle: {
    fontSize: 40,
    textAlign: "right",
    color: COLORS.orange,
    fontFamily: "AveriaRegular",
    width: "100%",
  },
  section: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    top: Platform.OS === "ios" ? -60 : -100,
    // top: Dimensions.get("window").height - 900,
    paddingHorizontal: 15,
  },
});

export default ProfileScreen;
