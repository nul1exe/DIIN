import React, { useState } from "react";
import { Link, useRouter } from "expo-router"; // 👈 added useRouter
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // 👈 initialize router

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.254.108:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");

        // Save user ID for later (to allow feedback)
        await AsyncStorage.setItem("userId", data.user.id.toString());

        // Redirect to home after short delay
        setTimeout(() => {
          router.replace("/mobile/home");
        }, 1500);
      } else {
        setMessage("❌ " + (data.error || "Login failed"));
      }
    } catch (err) {
      setMessage("⚠️ Cannot connect to server. Please check your connection.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require("@/assets/images/DIIN_tp.png")}
            style={styles.logo}
          />

          {/* Login Icon */}
          <Ionicons
            name="log-in-outline"
            size={40}
            color="#F5B400"
            style={styles.loginIcon}
          />

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Enter your email and password to login
          </Text>

          {/* Inputs */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Redirect to Register */}
          <View style={styles.registerRedirect}>
            <Text style={styles.redirectText}>Don’t have an account? </Text>
            <Link href="../auth/register" style={styles.signUpText}>
              Register
            </Link>
          </View>

          {/* Message */}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {/* Spacer */}
          <View style={{ height: 60 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 14,
    color: "#F5B400",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#F5B400",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#F5B400",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginTop: 15,
    color: "green",
    fontSize: 14,
  },
  registerRedirect: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  redirectText: {
    fontSize: 14,
    color: "#555",
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F5B400",
  },
  loginIcon: {
    marginBottom: 10,
  },
});
