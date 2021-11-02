import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, UsersRef, firebase } from "../../firebase";
import { COLORS } from "../styles/colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const handleSignup = () => {
    if (!initializing) setInitializing(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        firebase.firestore().collection("users").doc(auth.currentUser.uid).set({
          name,
          email,
        });
        // setUser(userCredentials.user);
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
      })
      .catch((err) => alert(err.message));
  };

  const handleLogin = () => {
    if (!initializing) setInitializing(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // setUser(userCredentials.user);
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((err) => alert(err.message));
  };

  const signInWithGoogle = async () => {
    // retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // set language to default brower preference
    auth.useDeviceLanguage();
    // start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (initializing) setInitializing(false);
      if (user) {
        navigation.replace("MainNav");
      }
    });

    return unsubscribe;
  }, []);

  if (initializing)
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            //   backgroundColor: "green",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/jingle-icon-android.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <Text style={styles.appTitle}>jingle</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignup}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.socialButtonContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.button, styles.buttonGoogle]}
          >
            <View
              style={{
                width: "18%",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/color/96/000000/google-logo.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ width: "82%" }}>
              <Text style={styles.buttonTextGoogle}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.button, styles.buttonFacebook]}
          >
            <View
              style={{
                width: "18%",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/material-sharp/96/ffffff/facebook-new.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ width: "82%" }}>
              <Text style={styles.buttonText}>Sign in with Facebook</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.button, styles.buttonTwitter]}
          >
            <View
              style={{
                width: "18%",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/ios-glyphs/90/ffffff/twitter--v1.png",
                }}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ width: "82%" }}>
              <Text style={styles.buttonText}>Sign in with Twitter</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </KeyboardAvoidingView>
    );
  }
};

export default LoginScreen;

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
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    // backgroundColor: "green",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
  },
  socialButtonContainer: {
    width: "80%",
    // backgroundColor: "green",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "45%",
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
  buttonGoogle: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    marginBottom: 15,
  },
  buttonFacebook: {
    flexDirection: "row",
    backgroundColor: "#1877F2",
    width: "100%",
    marginBottom: 15,
  },
  buttonTwitter: {
    flexDirection: "row",
    backgroundColor: "#1DA1F2",
    width: "100%",
    // marginBottom: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonTextGoogle: {
    color: "#757575",
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
