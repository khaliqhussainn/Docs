import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Help = () => {
  const handleContactPress = () => {
    Linking.openURL("mailto:khaliquehussain7@gmail.com").catch((err) =>
      console.error("Failed to open email:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Use the App</Text>
        <Text style={styles.sectionText}>
          Welcome to our app! Here are some tips to get you started:
        </Text>
        <Text style={styles.sectionText}>
          1. Navigate through the Courses section to access free notes and previous year question papers.
        </Text>
        <Text style={styles.sectionText}>
          2. Use the settings to customize your experience.
        </Text>
        <Text style={styles.sectionText}>
          3. If you need help, visit this help section.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        <Text style={styles.sectionText}>
          Q: How do I change my profile picture?
        </Text>
        <Text style={styles.sectionText}>
          A: Go to Profile Settings in the Settings menu.
        </Text>
        {/* Add more FAQs here */}
      </View>

      <Pressable style={styles.section} onPress={handleContactPress}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={{ flexDirection: "row", alignItems: "center" , gap: 8}}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <Text>khaliquehussain7@gmail.com</Text>
        </View>
      </Pressable>
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
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default Help;
