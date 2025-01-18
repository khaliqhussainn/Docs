import { Button, Image, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MainScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
      {/* <Image style={{ width : "100%", height : 150 , opacity : 0.8}} source={require("../assets/2.jpg")} /> */}
        <Text style={styles.title}>All Courses</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Pressable onPress={() => navigation.navigate("BCA")} style={styles.pressable}>
          <Image style={{ width: "100%", height: 100 , borderRadius : 20 , opacity : 0.6}} source={require("../assets/c1.jpg")} />
          <Text style={styles.buttonText}>BCA</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("BTECH")} style={styles.pressable2}>
          <Image style={{ width: "100%", height: 100 , borderRadius : 20 , opacity : 0.6}} source={require("../assets/c2.jpg")} />
          <Text style={styles.buttonText2}>B-TECH</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("BSC")} style={styles.pressable3}>
          <Image style={{ width: "100%", height: 100 , borderRadius : 20 , opacity : 0.6}} source={require("../assets/c3.jpg")} />
          <Text style={styles.buttonText3}>BSC</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("BSC")} style={styles.pressable3}>
          <Image style={{ width: "100%", height: 100 , borderRadius : 20 , opacity : 0.6}} source={require("../assets/c4.jpg")} />
          <Text style={styles.buttonText3}>MCA</Text>
        </Pressable>
      </ScrollView>

    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f1f1f1',
    marginTop: 50,
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecorationStyle: 'solid',
    textDecorationColor: '#y1y1y1',
    textDecorationLine: 'underline',
  },
  pressable: {
    width: "100%",
    // backgroundColor: "red",
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 40,
  },

  pressable2: {
    width: "100%",
    // backgroundColor: "red",
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 40,
  },
  pressable3: {
    width: "100%",
    // backgroundColor: "red",
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText3: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 40,
  },
});

