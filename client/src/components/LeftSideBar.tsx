import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet, Linking } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const LeftSidebar = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Fetch current user information
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
        imageUrl:
          currentUser.photoURL || "../../assets/icons/profile-placeholder.svg",
      });
    }
  }, [auth.currentUser]);

  const handleSocialMediaPress = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.jpg")} // Add your logo image path
            style={styles.logo}
            alt="App Logo"
          />
          <Text style={styles.appName}>My App</Text>
        </View>

        {/* User Profile Section */}
        {user && (
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
              alt="profile"
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        )}

        {/* Navigation Links */}
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navLinkText}>Profile</Text>
        </Pressable>

        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.navLinkText}>Settings</Text>
        </Pressable>

        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("Help")}
        >
          <Ionicons name="help-outline" size={24} color="#fff" />
          <Text style={styles.navLinkText}>Help</Text>
        </Pressable>

        {/* Developer Mention Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Developed by Khalique Hussain
          </Text>
          <Text style={styles.footerSubtext}>for any queries contact me at-</Text>

          {/* Social Media Icons */}
          <View style={styles.socialMediaIcons}>
            <Pressable onPress={() => handleSocialMediaPress("https://facebook.com")}>
              <FontAwesome name="facebook" size={24} color="#3b5998" />
            </Pressable>
            <Pressable onPress={() => handleSocialMediaPress("https://x.com/KhaliqHussainnn?t=hJNaQT2Dih-DZKg3W0-MIQ&s=09")}>
              <FontAwesome name="twitter" size={24} color="#1da1f2" />
            </Pressable>
            <Pressable onPress={() => handleSocialMediaPress("https://www.instagram.com/khaliqhussain_/profilecard/?igsh=emM0eWQ2OWlzZXhj")}>
              <FontAwesome name="instagram" size={24} color="#e1306c" />
            </Pressable>
            <Pressable onPress={() => handleSocialMediaPress("http://linkedin.com/in/khaliquehussain7")}>
              <FontAwesome name="linkedin" size={24} color="#0077b5" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LeftSidebar;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#192841",
    paddingLeft: 20,
    paddingTop: 60,
    paddingBottom: 50,
    // borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F4EBD0",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4EBD0",
  },
  userEmail: {
    fontSize: 14,
    color: "#ddd",
  },
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  navLinkText: {
    fontSize: 16,
    color: "#F4EBD0",
    marginLeft: 10,
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#F4EBD0",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 10,
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 20,
  },
});
