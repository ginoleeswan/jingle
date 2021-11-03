import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useSelector } from "react-redux";

import firebase from "firebase";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";
import { auth } from "../../firebase";

export default function UploadImage() {
  const currentUser = useSelector((state) => state.userState.currentUser);

  const [image, setImage] = useState(currentUser?.photoURL);
  const [imageName, setImageName] = useState(null);
  const [selectedPictureURI, setSelectedpictureURI] = useState(null);
  const [uploading, setUploading] = useState(false);

  const addImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      //   base64: true,
      quality: 1,
    });

    // console.log(JSON.stringify(pickerResult));

    if (!pickerResult.cancelled) {
      // const filename = pickerResult.substring(pickerResult.lastIndexOf('/') + 1);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", pickerResult.uri, true);
        xhr.send(null);
      });

      //   let uri = pickerResult.uri;
      setImageName(
        "userImages/" +
          `${auth.currentUser.uid}/` +
          "profilePictures/" +
          uuid.v4()
      );
      //   let uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      uploadPictureToFirebase(imageName, blob);
      setUploading(true);
      //   saveProfilePicture(uploadUri);
      //   retrievePictureFromFirebase(imageName);

      // setSelectedpictureURI(pickerResult.uri)
    }

    // _handleImagePicked(pickerResult);
  };

  //   .ref().child("userImages/" + firebase.auth().currentUser.uid)

  const uploadPictureToFirebase = async (imageName, uploadUri) => {
    await Promise.all([
      firebase
        .storage()
        .ref()
        .child(imageName)
        .put(uploadUri, { contentType: "image/jpeg" })
        .then((snapshot) => {
          //You can check the image is now uploaded in the storage bucket
          console.log("====================================");
          console.log(`${imageName} has been successfully uploaded.`);
          console.log(`${uploadUri} is the metadata.`);
          console.log("====================================");
          let imageRef = firebase.storage().ref("/" + imageName);
          imageRef
            .getDownloadURL()
            .then((url) => {
              //from url you can fetched the uploaded image easily
              saveProfilePicture(url);
              console.log(url);
            })
            .catch((e) => {
              console.log("getting downloadURL of image error => ", e);
              setUploading(false);
            });
        })
        .catch((e) => {
          console.log("uploading image error => ", e);
          alert("Uploading image error => ", e);
          setUploading(false);
        }),
    ]);
  };

  const retrievePictureFromFirebase = () => {
    let imageRef = firebase.storage().ref("/" + imageName);
    imageRef
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        saveProfilePicture(url);
        console.log(url);
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
  };

  const saveProfilePicture = (profilePictureURL) => {
    const userProfile = firebase.auth().currentUser;
    var db = firebase.firestore();

    //Here we save the picture to the user auth
    userProfile
      .updateProfile({
        photoURL: profilePictureURL,
      })
      .then(() => {
        console.log("status: " + "update success");
        // Here we save to the firestore database
        db.collection("users") // Change this path to something else if you want
          .doc(firebase.auth().currentUser.uid)
          .set(
            {
              photoURL: profilePictureURL,
            },
            { merge: true }
          );
        //   .then(() => {
        //     dispatch(
        //       login({
        //         photoURL: profilePictureURL,
        //       })
        //     );
        //   });
        setImage(profilePictureURL);
        setUploading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setUploading(false);
      });
  };

  //   const _handleImagePicked = async (pickerResult) => {
  //     try {
  //       setUploading(true);

  //       if (!pickerResult.cancelled) {
  //         const uploadUrl = await uploadImageAsync(pickerResult.uri);
  //         setImage(uploadUrl);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       alert("Upload failed, sorry :(");
  //     } finally {
  //       setUploading(false);
  //     }
  //   };

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  useEffect(() => {
    checkForCameraRollPermission();
    // console.log(currentUser?.name);
    // console.log(currentUser?.photoURL);
  }, []);

  useEffect(() => {
    setImage(currentUser?.photoURL);
    //   console.log(currentUser?.photoURL);
  }, [currentUser?.photoURL]);

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 160, height: 160 }} />
      )}

      {_maybeRenderUploadingOverlay()}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text style={{ fontSize: 12 }}>
            {image ? "Edit" : "Upload"} Image
          </Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 160,
    width: 160,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    shadowColor: "#131734",
    shadowRadius: 15,
    shadowOpacity: 0.4,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuid.v4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
