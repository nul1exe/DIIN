import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  Text,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const { registered } = useLocalSearchParams(); // Get query param
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (registered === "true") {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [registered]);

  return (
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
        {/* Add your main screen content here */}
      </View>

      {/* Modal shown after successful registration */}
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF", // header background
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60, // height fits logo + text tightly
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
    padding: 12,
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
});
