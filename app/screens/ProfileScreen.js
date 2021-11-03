import React, { useEffect } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import { COLORS } from "../styles/colors";

import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";
import { Avatar } from "react-native-elements";
import UploadImage from "../components/UploadImage";

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchUser }, dispatch);

const ProfileScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.userState.currentUser);

  const handleSignOut = () => {
    console.log(auth.currentUser?.email, " Logged out");
    auth
      .signOut()
      // .then(() => {
      // navigation.replace("Landing");
      // })
      .catch((err) => alert(err.message));
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.section}>
        <UploadImage />
        {/* <Avatar
          size={150}
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          source={
            currentUser.profilePictureURL
              ? { uri: currentUser.profilePictureURL }
              : null
          }
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: "gray",
            shadowColor: "#131734",
            shadowRadius: 15,
            shadowOpacity: 0.4,
          }}
        /> */}

        {/* <View style={styles.header}>
        <Text style={styles.appTitle}>profile</Text>
      </View> */}

        <Text style={styles.name}>{currentUser?.name}</Text>
        <Text style={styles.p}>{currentUser?.email}</Text>
        {/* <Text style={styles.p}>{currentUser?.photoURL}</Text> */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>987</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
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
  name: {
    marginTop: 24,
    fontSize: 16,
    textAlign: "left",
    color: "black",
    fontFamily: "NunitoBold",
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
  avatarContainer: {
    shadowColor: "#131734",
    shadowRadius: 15,
    shadowOpacity: 0.4,
  },
  section: {
    marginTop: 30,
    flex: 1,
    paddingHorizontal: 15,
    // justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
    // backgroundColor: "green",
    width: "90%",
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4f566d",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#c3c5cd",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
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
