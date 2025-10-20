import { View, StyleSheet } from 'react-native';
import React from "react";
import { Tabs, Slot } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MobileLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F5B400",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5, height: 60 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />

      {/* 👇 This lets other routes like /auth/login or /auth/register render normally */}
      <Tabs.Screen
        name="(auth)"
        options={{
          href: null, // hides from tab bar
        }}
      />
    </Tabs>
  );
}

