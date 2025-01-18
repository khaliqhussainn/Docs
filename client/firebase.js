import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./src/HomeScreen";
import Main from "./src/MainScreen";
import Bca from "./src/courses/main/Bca";
import Bsc from "./src/courses/main/Bsc";
import Btech from "./src/courses/main/Btech";
import Settings from "./src/components/Settings";
import Profile from "./src/components/Profile";
import Help from "./src/components/Help";

const firebaseConfig = {
  apiKey: "AIzaSyDaKUlMrVl5jcvdSXM2VtOiyuQcYeuqIkM",
  authDomain: "notesapp-1cf66.firebaseapp.com",
  projectId: "notesapp-1cf66",
  storageBucket: "notesapp-1cf66.appspot.com",
  messagingSenderId: "829586813569",
  appId: "1:829586813569:web:5558667e891b498214d380",
  measurementId: "G-ZCBMBC4X3E",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const Stack = createNativeStackNavigator();

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  return (
    <View style={styles.authContainer}>
      <Image
        source={require("./assets/logo.jpg")} // Replace with the path to your logo
        style={styles.logo}
      />
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleAuthentication}
          color="#F4EBD0"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Welcome to the Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      setError("");
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Courses"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="BCA" component={Bca} />
            <Stack.Screen name="BSC" component={Bsc} />
            <Stack.Screen name="BTECH" component={Btech} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <Stack.Screen name="Auth" options={{ headerShown: false }}>
            {() => (
              <ScrollView contentContainerStyle={styles.container}>
                <AuthScreen
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  handleAuthentication={handleAuthentication}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </ScrollView>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#192841",
  },
  authContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#152238",
    padding: 24,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#F4EBD0",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    color: "#F4EBD0",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#192841",
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#F4EBD0",
    textAlign: "center",
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 20,
  },
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  homeTitle: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#F4EBD0",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default App;
