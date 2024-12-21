import React from "react";
import { View, Text, Switch, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Settings = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
  };

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <Pressable style={styles.section} onPress={navigateToProfile}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        {/* Add more app settings here */}
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});

export default Settings;
