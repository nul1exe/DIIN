import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const { registered } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Mock GPS Data (placeholder until real data)
  const [busData, setBusData] = useState<{ busNo: string; eta: string } | null>(null);

  useEffect(() => {
    // Simulate reading from GPS (replace later with actual fetch)
    const timer = setTimeout(() => {
      const gpsData = null; // stays null until your real GPS data is available
      // Example when device works:
      // const gpsData = { busNo: "12100", eta: "18 min" };

      if (gpsData) {
        setBusData(gpsData);
      } else {
        setBusData(null); // will show "No data."
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const API_URL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5000/api/feedback"
      : "http://192.168.254.108:5000/api/feedback";

  useEffect(() => {
    if (registered === "true") {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [registered]);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  const handleFeedbackSubmit = async () => {
  const isGuest = await AsyncStorage.getItem("isGuest");

    // 🚫 Prevent guests from submitting feedback
    if (isGuest === "true") {
      Alert.alert("Guests cannot send feedback", "Please log in first.");
      setFeedbackVisible(false);
      return;
    }

    if (!userId) {
      Alert.alert("Error", "No user ID found. Please log in again.");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Please enter your feedback message.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, rating, message }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Thank you!", "Your feedback has been submitted.");
        setMessage("");
        setRating("");
        setFeedbackVisible(false);
      } else {
        Alert.alert("Error", data.error || "Failed to submit feedback.");
      }
    } catch (err) {
      Alert.alert("Connection error", "Could not reach the server.");
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <Image
              source={require("@/assets/images/DIIN_tp.png")}
              style={styles.smallLogo}
              resizeMode="contain"
            />
            <ThemedText type="title" style={styles.appName}>
              DIIN
            </ThemedText>
          </View>
        </SafeAreaView>

        {/* Main content */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionLabel}>Nearest Stop:</Text>
          <Text style={styles.stopName}>
            {busData?.stopName ? busData.stopName : "No data."}
          </Text>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
            Estimated Time of Arrival (ETA):
          </Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Bus No.</Text>
            <Text style={styles.tableHeader}>ETA</Text>
          </View>

          <View style={styles.separator} />
          
          {/* Show data or "No data." */}
          {busData ? (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{busData.busNo}</Text>
              <Text style={styles.tableCell}>{busData.eta}</Text>
            </View>
          ) : (
            <Text style={styles.noDataText}>No data.</Text>
          )}
        </View>

        </View>

        {/* Modal after successful registration */}
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>✅ Registered successfully!</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Floating Feedback Button */}
      <TouchableOpacity
  style={styles.feedbackButton}
  onPress={async () => {
    const isGuest = await AsyncStorage.getItem("isGuest");
    if (isGuest === "true") {
      Alert.alert("Guests cannot send feedback", "Please log in to continue.");
      return;
    }
    setFeedbackVisible(true);
  }}
>
  <Text style={styles.feedbackButtonText}>💬 Feedback</Text>
</TouchableOpacity>


      {/* Feedback Modal */}
      <Modal
        visible={feedbackVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFeedbackVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackForm}>
            <Text style={styles.formTitle}>Send Feedback</Text>

            <TextInput
              placeholder="Your feedback message"
              value={message}
              onChangeText={setMessage}
              multiline
              style={styles.textArea}
              placeholderTextColor="#aaa"
            />

            <TextInput
              placeholder="Rating (1-5, optional)"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#aaa"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc" }]}
                onPress={() => setFeedbackVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#F5B400" }]}
                onPress={handleFeedbackSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 12,
  },
  smallLogo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F5C431",
  },
  contentContainer: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#222",
  },
  stopName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    marginVertical: 6,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  feedbackButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#F5B400",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 5,
  },
  feedbackButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  feedbackForm: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5B400",
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#F5B400",
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#F5B400",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
  height: 1,
  backgroundColor: "#ccc",
  width: "100%",
  marginVertical: 4,
  },

});
