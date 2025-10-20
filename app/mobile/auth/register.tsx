import React, { useState } from "react";
import { Link } from "expo-router";
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
import { useRouter } from "expo-router";


export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Change this to your own IP if testing on real device
  const API_URL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5000/api/auth/register" // Android emulator
      : "http://192.168.254.109:5000/api/auth/register"; // replace with your PC IPv4 if using phone

  const handleRegister = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
      setMessage("✅ Registered successfully!");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to home after a short delay
      setTimeout(() => {
        router.replace("/mobile/home?registered=true"); // 👈 update this if your homepage path differs
      }, 1500);
    } else {
      setMessage("❌ " + (data.error || "Registration failed"));
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

          {/* Title */}
          <Text style={styles.title}>Your ride, your way — start here</Text>
          <Text style={styles.subtitle}>
            Fill in your details to create an account
          </Text>

          {/* Inputs */}
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Continue as Guest Button */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => {
              setMessage("Logging in as Guest...");
              setTimeout(() => {
                router.replace("/mobile/home?guest=true");
              }, 1000);
            }}
          >
  <Text style={styles.guestText}>Continue as Guest</Text>
</TouchableOpacity>


          <View style={styles.loginRedirect}>
            <Text style={styles.redirectText}>Already have an account? </Text>
            <Link href="../auth/login" style={styles.signInText}>
              Login
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5B400",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
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
  loginRedirect: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  redirectText: {
    fontSize: 14,
    color: "#555",
  },
  signInText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F5B400",
  },
  guestButton: {
  backgroundColor: "#ddd",
  width: "100%",
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 10,
},
guestText: {
  color: "#333",
  fontSize: 16,
  fontWeight: "bold",
},
});
