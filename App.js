import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/HomeScreen';
import StackNavigator from "./src/navigation/StackNavigator";
import Firebase from './firebase';
import "./globals.css";

export default function App() {
  return (
    <>
      {/* <StackNavigator/> */}
      <Firebase />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
