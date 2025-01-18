import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as MediaLibrary from "expo-media-library";
import { SectionList } from "react-native";

const ShowDifferentElements = () => {
  const [visibleElement, setVisibleElement] = useState(null);

  const pdfsByYear = {
    first: {
      notes: [
        { subject: "C", url: require("../../../assets/pdfs/CNotes.pdf") },
        { subject: "Physics", url: "https://drive.google.com/drive/folders/1PLroZr4hiZeJ8gMXwGlz6qy-1Ra514p4?usp=drive_link" },
        { subject: "Data Structures", url: "https://drive.google.com/drive/folders/1-3lY2FdBCM7k2wDs_TR5MFiJ_mRz1I0D?usp=drive_link" },
        { subject: "Linux", url: "https://drive.google.com/drive/folders/1-Ej8-79FqJkk_D7OM4HaXK73IdGGNtcm?usp=drive_link"},
        { subject: "Operating System", url: "https://drive.google.com/file/d/1JtfWcRzHlhBWdl0wPipo_Xuu18rmjehh/view?usp=drive_link" },
        { subject: "Environmental Studies", url: "https://drive.google.com/file/d/1sH7aREMEue9w932dOuNfdlUdp7XQlie9/view?usp=drive_link" },
      ],
      questionPapers: [
        { subject: "Math", url: "https://example.com/firstyear_math_qp.pdf" },
        { subject: "Physics", url: "https://example.com/firstyear_physics_qp.pdf" },
      ],
    },
    second: {
      notes: [
        { subject: "Probability and Statistics", url: "https://drive.google.com/drive/folders/1-fekj03D9dBNtjsIgust4-i6jSjT7eFX?usp=drive_link" },
        { subject: "AI", url: "https://drive.google.com/drive/folders/1-crT2KMYRQXPp3RmvwOR_qvgUJgreqZm?usp=drive_link" },
        { subject: "Cyber Crime", url: "https://drive.google.com/drive/folders/1-iynXoDU8eZ2D4frILmQnBM8ddmBHGvS?usp=drive_link" },
        { subject: "DBMS", url: "https://drive.google.com/drive/folders/1-VpLgxHwRKDBsao8iooCNx8Z8gh03w9g?usp=drive_link" },
        { subject: "Discrete Structures", url: "https://drive.google.com/drive/folders/1-ZcukAzHUsYUtOo91GJqOpNd3k9ENCIW?usp=drive_link" },
        { subject: "Internet and web technology", url: "https://drive.google.com/file/d/1I2sanGknzvQyD7vXOIvkPqpPhj1Yc6Yt/view?usp=drive_link" },
        { subject: "C++", url: "https://drive.google.com/drive/folders/1-Y1NJTTe_0H8GpDs0p7prRVW10dCD-0r?usp=drive_link" },
        { subject: "Wireless", url: "https://drive.google.com/file/d/1jjv2_qC44pF2seq3y0PmNQeppuFX8g64/view?usp=drive_link" },
      ],
      questionPapers: [
        { subject: "Wireless", url: "https://drive.google.com/file/d/1U72nesaNQiDIDBsmddBgCGzy7JnZbt9k/view?usp=drive_link" },
        { subject: "Cyber Crime", url: "https://drive.google.com/file/d/10qeRHF3tKzZxB-jzCm-EDCUbmBrBcOx8/view?usp=drive_link" },
        { subject: "Internet and web technology", url: "https://drive.google.com/file/d/14UZHiy85RxEDUvCem9C2xzT2J9r4-JHv/view?usp=drive_link" },
        { subject: "Discrete Structures", url: "https://drive.google.com/file/d/1ATj0q3jkfNPexHHoLDqv0Y8W2hoqNvGP/view?usp=drive_link" },
        { subject: "C++", url: "https://drive.google.com/file/d/1bGcc-SPtBi4W1ptLvHMLpxaOvGnPoNwW/view?usp=drive_link" },
      ],
    },
    third: {
      notes: [
        { subject: "Data Science", url: "https://drive.google.com/drive/folders/1-o2-ryhriuA3T-ga04bUu3t9VEg3uRj5?usp=drive_link" },
        { subject: "Java", url: "https://drive.google.com/drive/folders/1-mh7sZMBv48nW_XPpNxNT7olgqxAeHrV?usp=drive_link" },
        { subject: "Software Engineering", url: "https://drive.google.com/file/d/1wAa5orQJtXst-Xd6rj9t6w-H1lgbdEry/view?usp=drive_link" },
        { subject: "Digital Marketing", url: "https://drive.google.com/file/d/1HNT2wkp8UuLDIl22XWy6gTr9D_HdAmdp/view?usp=drive_link" },
      ],
      questionPapers: [
        { subject: "All Subjects", url: "https://drive.google.com/file/d/1Q36-8du6VozPxYqNbXU4w6aY6WJ7uSIi/view?usp=drive_link" },
      ],
    },
  };

  const showElement = (element) => {
    setVisibleElement(element);
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    };
    checkPermissions();
    showElement("first"); // Automatically show first year
  }, []);

  const openGoogleDriveLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const renderItem = ({ item, section }) => {
    const isNotesSection = section.title === "Notes";
    return (
      <View style={styles.pdfItem}>
        <Text style={styles.pdfTitle}>
          {item.subject} {isNotesSection ? "Notes" : "Question Paper"}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="View Notes"
            onPress={() => openGoogleDriveLink(item.url)}
            color="#249098"
          />
          <Entypo
            style={styles.viewIcon}
            name="eye"
            size={24}
            color="#249098"
          />
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={title === "Notes" ? styles.sectionTitle : styles.sectionTwoTitle}>
      {title}
    </Text>
  );

  const sections = visibleElement
    ? [
        {
          title: "Notes",
          data: pdfsByYear[visibleElement].notes,
        },
        {
          title: "Question Papers",
          data: pdfsByYear[visibleElement].questionPapers,
        },
      ]
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          color={visibleElement === "first" ? "#000" : "#fff"}
          title="1st Year"
          onPress={() => showElement("first")}
        />
        <Button
          color={visibleElement === "second" ? "#000" : "#fff"}
          title="2nd Year"
          onPress={() => showElement("second")}
        />
        <Button
          color={visibleElement === "third" ? "#000" : "#fff"}
          title="3rd Year"
          onPress={() => showElement("third")}
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.subject}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true} // Add this prop to make section headers sticky
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#249098",
    paddingVertical: 10,
  },
  pdfItem: {
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 0.2,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  pdfTitle: {
    color: "#333",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#249098",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  sectionTwoTitle: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#249098",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
});

export default ShowDifferentElements;
