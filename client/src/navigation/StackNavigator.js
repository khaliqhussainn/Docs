import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../HomeScreen";
import Main from "../MainScreen";
import Bca from "../courses/main/Bca";
import Bsc from "../courses/main/Bsc";
import Btech from "../courses/main/Btech";
import firebase from "../../firebase";
import LeftSidebar from "../components/LeftSideBar";
import Settings from "../components/Settings";
import Help from "../components/Help";
import Profile from "../components/Profile";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Firebase" component={firebase} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeftSidebar"
          component={LeftSidebar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Courses"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="BCA" component={Bca} />
        <Stack.Screen name="BSC" component={Bca} />
        <Stack.Screen name="BTECH" component={Btech} />
        {/* <Stack.Screen name="LeftSidebar" component={LeftSidebar} /> */}
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
