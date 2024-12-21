import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet, Pressable, Alert } from "react-native";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
const Profile = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);

  // Fetch current user information
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
        imageUrl: currentUser.photoURL || "../../assets/icons/profile-placeholder.svg",
      });
      setName(currentUser.displayName || "");
      setCourse("");
    }
  }, [auth.currentUser]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      console.log("User logged out successfully!");
      navigation.navigate("Auth");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleUpdateProfile = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      updateProfile(currentUser, {
        displayName: name,
        photoURL: image ? image : user.imageUrl,
      }).then(() => {
        console.log("Profile updated successfully!");
        console.log("Name:", name);
        console.log("Course:", course);
        console.log("Image URL:", image ? image : user.imageUrl);
        setUser({
          name: name,
          email: currentUser.email,
          imageUrl: image ? image : user.imageUrl,
        });
      }).catch((error) => {
        Alert.alert("Error", error.message);
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* User Profile Section */}
      <View style={styles.userInfo}>
        <Pressable onPress={pickImage}>
          <Image
            source={{ uri: image ? image : user?.imageUrl }}
            style={styles.profileImage}
            alt="profile"
          />
        </Pressable>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>

      {/* Edit Name and Course */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />
        <Button title="Save Changes" onPress={handleUpdateProfile} />
      </View>

      {/* Additional Options */}
      <View style={styles.optionsContainer}>
        {/* <Pressable style={styles.option} onPress={() => navigation.navigate("Feedback")}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
          <Text style={styles.optionText}>Feedback</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={() => navigation.navigate("Location")}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={styles.optionText}>Location</Text>
        </Pressable> */}
        <Pressable style={styles.option} onPress={() => navigation.navigate("Help")}>
          <Ionicons name="help-outline" size={24} color="black" />
          <Text style={styles.optionText}>Help</Text>
        </Pressable>
      </View>

      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});

export default Profile;
