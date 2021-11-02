import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { auth, UsersRef } from "../../../firebase";
import * as firebase from "firebase";
import { Icon } from "react-native-elements";
import { COLORS } from "../../styles/colors";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [bio, setBio] = useState(null);
  const [initializing, setInitializing] = useState(false);

  const handleSignup = async () => {
    if (!initializing) setInitializing(true);
    if (email != "" && password != "" && name != "") {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { uid } = userCredential.user;
      await Promise.all([
        UsersRef.doc(uid).set({
          name,
          email,
          profilePictureURL,
          phoneNumber,
          bio,
        }),
      ]);
    } else {
      alert("Make sure you filled all the fields with correct info!");
      setInitializing(false);
    }
    // .then((userCredentials) => {
    //   firebase.firestore().collection("users").doc(auth.currentUser.uid).set({
    //     name,
    //     email,
    //   });
    //   // setUser(userCredentials.user);
    //   const user = userCredentials.user;
    //   console.log("Registered with: ", user.email);
    // })
    // .catch((err) => alert(err.message));
  };

  if (initializing) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} behavior="padding">
      <View
        style={{
          position: "absolute",
          top: 60,
          left: 35,
          // backgroundColor: "green",
        }}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            size={30}
            color={COLORS.orange}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        {/* <Image
          source={require("../../assets/jingle-icon-android.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        /> */}
        <Text style={{ ...styles.h2, color: COLORS.orange }}>Hello!</Text>
        <Text style={styles.p}>Sign up to get started.</Text>
      </View>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <Text
          style={{
            fontFamily: "NunitoRegular",
            fontSize: 10,
            color: "#adadad",
          }}
        >
          NAME
        </Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <Text
          style={{
            fontFamily: "NunitoRegular",
            fontSize: 10,
            color: "#adadad",
          }}
        >
          EMAIL
        </Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text
          style={{
            fontFamily: "NunitoRegular",
            fontSize: 10,
            color: "#adadad",
          }}
        >
          PASSWORD
        </Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignup} style={[styles.button]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.buttonContainer,
          marginTop: 40,
          width: "70%",
          justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: "black",
            fontSize: 12,
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Landing")}
        >
          <Text style={{ ...styles.buttonOutlineText, fontSize: 12 }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "blue",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 30,
  },
  p: {
    fontFamily: "AveriaRegular",
    fontSize: 18,
  },
  h2: {
    fontFamily: "AveriaBold",
    fontSize: 30,
  },
  input: {
    // backgroundColor: "white",
    borderBottomColor: "#adadad",
    borderBottomWidth: 1,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderRadius: 10,
    marginVertical: 10,
    marginBottom: 40,
    height: 35,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    // backgroundColor: "green",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.orange,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    // marginRight: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
