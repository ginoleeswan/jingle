import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../../../firebase";
import { COLORS } from "../../styles/colors";

export default function Landing({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initializing, setInitializing] = useState(false);

  const handleLogin = () => {
    if (!initializing) setInitializing(true);
    if (email != "" && password != "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          // setUser(userCredentials.user);
          const user = userCredentials.user;
          console.log("Logged in with: ", user.email);
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Make sure you filled all the fields with correct info!");
      setInitializing(false);
    }
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
          // backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Image
          source={require("../../assets/jingle-icon-android.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <Text style={styles.appTitle}>jingle</Text>
      </View>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <Text
          style={{
            fontFamily: "NunitoRegular",
            fontSize: 10,
            color: "#adadad",
          }}
        >
          EMAIL ADDRESS
        </Text>
        <TextInput
          // placeholder="Email"
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
          // placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.buttonContainer,
          width: "70%",
          justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: "black",
            width: "50%",
            fontSize: 12,
          }}
        >
          New To Jingle?
        </Text>
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "green",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ ...styles.buttonOutlineText, fontSize: 12 }}>
            Sign Up
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
  appTitle: {
    fontSize: 40,
    textAlign: "right",
    color: COLORS.orange,
    fontFamily: "AveriaRegular",
    width: "100%",
  },
  inputContainer: {
    width: "80%",
    marginTop: 30,
  },
  input: {
    // backgroundColor: "white",
    borderBottomColor: "#adadad",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
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
    marginVertical: 30,
    marginBottom: 10,
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
