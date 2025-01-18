import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as DocumentPicker from "expo-document-picker";

const ResourcesScreen = () => {
  const [resources, setResources] = useState({ notes: {}, questions: {} });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
    type: "",
    subject: "",
    course: "",
    folder: "",
  });

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.1.37:5000/cloudinary-files");
      const files = response.data.files;

      const organizedFiles = files.reduce((acc, file) => {
        const fileExtension = file.url
          .split("?")[0]
          .split(".")
          .pop()
          .toLowerCase();

        if (!["pdf", "docx"].includes(fileExtension)) return acc;

        const pathParts = file.public_id.split("/");
        const mainFolder = pathParts[0] || "Other";
        let section = mainFolder.toLowerCase().includes("question") ? "questions" : "notes";

        if (!acc[section]) acc[section] = {};
        if (!acc[section][mainFolder]) acc[section][mainFolder] = [];

        acc[section][mainFolder].push({
          ...file,
          extension: fileExtension.toUpperCase(),
          displayName: formatFileName(pathParts[pathParts.length - 1]),
          originalName: pathParts[pathParts.length - 1],
        });

        return acc;
      }, { notes: {}, questions: {} });

      setResources(organizedFiles);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch resources");
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatFileName = (fileName) => {
    let name = fileName.replace(/\.(pdf|docx)$/i, "").replace(/[_-]/g, " ");
    name = name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    return name.length > 30 ? name.substring(0, 27) + "..." : name;
  };

  const downloadFile = async (url, fileName) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please grant storage permission");
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + fileName;
      const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);

      const { uri } = await downloadResumable.downloadAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("CollegeResources", asset, false);
      Alert.alert("Success", "File downloaded successfully");
    } catch (error) {
      Alert.alert("Error", "Download failed. Please try again.");
      console.error("Download error:", error);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setFile(result);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick a document");
      console.error("DocumentPicker error:", error);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      Alert.alert("Error", "Please select a file to upload");
      return;
    }

    const form = new FormData();
    form.append("file", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });
    form.append("year", formData.year);
    form.append("type", formData.type);
    form.append("subject", formData.subject);
    form.append("course", formData.course);
    form.append("folder", formData.folder);

    try {
      await axios.post("http://192.168.1.37:5000/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Success", "File uploaded successfully");
      setFile(null);
      setFormData({ year: "", type: "", subject: "", course: "", folder: "" });
      fetchResources();
    } catch (error) {
      Alert.alert("Error", "Failed to upload file");
      console.error("File upload error:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0067cc" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchResources} />}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        {Object.keys(resources.notes).length === 0 ? (
          <Text>No Notes Available</Text>
        ) : (
          Object.entries(resources.notes).map(([folderName, files]) => (
            <View key={folderName}>
              <Text style={styles.folderTitle}>{folderName}</Text>
              {files.map((file) => (
                <TouchableOpacity key={file.public_id} onPress={() => Linking.openURL(file.url)}>
                  <Text>{file.displayName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Questions</Text>
        {Object.keys(resources.questions).length === 0 ? (
          <Text>No Questions Available</Text>
        ) : (
          Object.entries(resources.questions).map(([folderName, files]) => (
            <View key={folderName}>
              <Text style={styles.folderTitle}>{folderName}</Text>
              {files.map((file) => (
                <TouchableOpacity key={file.public_id} onPress={() => Linking.openURL(file.url)}>
                  <Text>{file.displayName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload</Text>
        <TextInput
          placeholder="Year"
          value={formData.year}
          onChangeText={(text) => setFormData({ ...formData, year: text })}
        />
        <TextInput
          placeholder="Type"
          value={formData.type}
          onChangeText={(text) => setFormData({ ...formData, type: text })}
        />
        <TextInput
          placeholder="Subject"
          value={formData.subject}
          onChangeText={(text) => setFormData({ ...formData, subject: text })}
        />
        <TextInput
          placeholder="Course"
          value={formData.course}
          onChangeText={(text) => setFormData({ ...formData, course: text })}
        />
        <TextInput
          placeholder="Folder"
          value={formData.folder}
          onChangeText={(text) => setFormData({ ...formData, folder: text })}
        />
        <Button title="Pick Document" onPress={pickDocument} />
        <Button title="Upload File" onPress={handleFileUpload} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  section: { padding: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },
  folderTitle: { fontSize: 15, fontWeight: "600", marginVertical: 5 },
});

export default ResourcesScreen;
