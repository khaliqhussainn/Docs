import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import LeftSidebar from "./components/LeftSideBar";  // Import the LeftSidebar component
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [user, setUser] = useState(null); // State to store user information

  // Dummy course data (with image URLs)
  const courses = [
    {
      id: 1,
      name: "Courses",
      image: "https://link-to-react-native-image.jpg",
      link: "Courses",
    },
    {
      id: 2,
      name: "Roadmaps",
      image: "https://link-to-js-image.jpg",
      link: "Roadmaps",
    },
    {
      id: 3,
      name: "JHU Entrance PYQ",
      image: "https://link-to-firebase-image.jpg",
      link: "Entrance",
    },
  ];

  // Fetch current user information
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
      });
    }
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      console.log("User logged out successfully!");
      navigation.replace("Auth");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // Render each course with image and navigation link
  const renderCourse = ({ item }) => (
    <Pressable
      style={styles.courseContainer}
      onPress={() => navigation.navigate(item.link)}
    >
      {/* <Image source={{ uri: item.image }} style={styles.courseImage} /> */}
      <Text style={styles.courseName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Toggle Sidebar */}
        <Pressable onPress={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Ionicons name="menu-outline" size={30} color="#fff" />
        </Pressable>
        <View style={styles.topButtons}>
          <Pressable
            style={styles.iconButton}
            onPress={() => navigation.navigate("Courses")}
          >
            <Ionicons name="book-outline" size={24} color="white" />
            <Text style={styles.iconButtonText}>Courses</Text>
          </Pressable>

          <Pressable style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text style={styles.iconButtonText}>Logout</Text>
          </Pressable>
        </View>
      </View>

      {/* Sidebar */}
      {isSidebarOpen && (
        <LeftSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={user}
          navigation={navigation}
        />
      )}

      {/* Main content (dimmed when sidebar is open) */}
      <View style={[styles.mainContent, isSidebarOpen && styles.dimmedContent]}>
        <FlatList
          data={courses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.coursesList}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Pressable
          style={styles.bottomButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.bottomButtonText}>Profile</Text>
        </Pressable>

        <Pressable
          style={styles.bottomButton}
          onPress={() => navigation.navigate("Help")}
        >
          <Ionicons name="help-outline" size={24} color="white" />
          <Text style={styles.bottomButtonText}>Help</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#192841",
  },
  topButtons: {
    flexDirection: "row",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#2c3e50",
    borderRadius: 5,
  },
  iconButtonText: {
    color: "white",
    marginLeft: 5,
  },
  mainContent: {
    flex: 1,
    zIndex: 1,
  },
  dimmedContent: {
    opacity: 0.3,
  },
  courseContainer: {
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#192841",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  // courseImage: {
  //   width: 100,
  //   height: 100,
  //   marginBottom: 10,
  //   borderRadius: 50,
  // },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
    height: 110,
    textAlign: "center",
    lineHeight: 100, // Vertically Center
  
  },
  coursesList: {
    padding: 16,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#192841",
    padding: 16,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomButtonText: {
    color: "white",
    marginLeft: 5,
  },
});
