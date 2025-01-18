// https://upload-request.cloudinary.com/dfivdwpoh/a98b17cc9beeac2503dd7f24c0b05844







// 
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   Linking,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
// } from "react-native";
// import axios from "axios";
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';

// const ResourcesScreen = () => {
//   const [resources, setResources] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchResources = async () => {
//     try {
//       const response = await axios.get("http://192.168.1.37:3000/cloudinary-files");
//       const files = response.data.files;

//       // Organize files by folder structure
//       const organizedFiles = files.reduce((acc, file) => {
//         const pathParts = file.public_id.split('/');
//         const mainFolder = pathParts[0] || 'Other';
//         const subfolder = pathParts.length > 2 ? pathParts[1] : '';
        
//         if (!acc[mainFolder]) {
//           acc[mainFolder] = { root: [], subfolders: {} };
//         }

//         const fileObj = {
//           ...file,
//           displayName: pathParts[pathParts.length - 1].replace(/_/g, ' ')
//         };

//         if (subfolder) {
//           if (!acc[mainFolder].subfolders[subfolder]) {
//             acc[mainFolder].subfolders[subfolder] = [];
//           }
//           acc[mainFolder].subfolders[subfolder].push(fileObj);
//         } else {
//           acc[mainFolder].root.push(fileObj);
//         }
        
//         return acc;
//       }, {});

//       setResources(organizedFiles);
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to fetch resources");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchResources();
//   }, []);

//   const downloadFile = async (url, fileName) => {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Required', 'Please grant storage permission');
//       return;
//     }

//     try {
//       const fileUri = FileSystem.documentDirectory + fileName;
//       const downloadResumable = FileSystem.createDownloadResumable(
//         url,
//         fileUri,
//         {},
//         (downloadProgress) => {
//           const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
//           console.log(`Download Progress: ${progress.toFixed(2)}%`);
//         }
//       );

//       const { uri } = await downloadResumable.downloadAsync();
//       const asset = await MediaLibrary.createAssetAsync(uri);
//       await MediaLibrary.createAlbumAsync('CollegeResources', asset, false);
//       Alert.alert('Success', 'File downloaded successfully');
//     } catch (error) {
//       Alert.alert('Error', 'Download failed');
//     }
//   };

//   const FileCard = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.fileName}>{item.displayName}</Text>
//       <View style={styles.buttonRow}>
//         <TouchableOpacity 
//           style={[styles.button, styles.viewButton]}
//           onPress={() => Linking.openURL(item.url)}
//         >
//           <Text style={styles.buttonText}>View</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.button, styles.downloadButton]}
//           onPress={() => downloadFile(item.url, item.displayName)}
//         >
//           <Text style={styles.buttonText}>Download</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const FolderSection = ({ title, files }) => (
//     <View style={styles.folderSection}>
//       <Text style={styles.folderTitle}>{title}</Text>
//       {files.map(file => (
//         <FileCard key={file.public_id} item={file} />
//       ))}
//     </View>
//   );

//   const MainFolder = ({ name, data }) => (
//     <View style={styles.mainFolder}>
//       <Text style={styles.mainFolderTitle}>{name}</Text>
      
//       {data.root.length > 0 && (
//         <FolderSection title="Main Files" files={data.root} />
//       )}
      
//       {Object.entries(data.subfolders).map(([subfolderName, files]) => (
//         <FolderSection 
//           key={subfolderName}
//           title={subfolderName}
//           files={files}
//         />
//       ))}
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0066cc" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView 
//       style={styles.container}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={fetchResources} />
//       }
//     >
//       {Object.entries(resources).map(([folderName, folderData]) => (
//         <MainFolder 
//           key={folderName}
//           name={folderName}
//           data={folderData}
//         />
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mainFolder: {
//     marginVertical: 10,
//     paddingHorizontal: 16,
//   },
//   mainFolderTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginVertical: 12,
//     backgroundColor: '#e8e8e8',
//     padding: 10,
//     borderRadius: 8,
//   },
//   folderSection: {
//     marginVertical: 8,
//   },
//   folderTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#444',
//     marginVertical: 8,
//     paddingLeft: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#0066cc',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   fileName: {
//     fontSize: 16,
//     color: '#2c3e50',
//     marginBottom: 12,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 12,
//   },
//   button: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   viewButton: {
//     backgroundColor: '#0066cc',
//   },
//   downloadButton: {
//     backgroundColor: '#28a745',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//   }
// });

// export default ResourcesScreen;