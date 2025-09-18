import { Platform } from 'react-native';
import { Slot } from 'expo-router';

export default function RootLayout() {
  if (Platform.OS === 'web') {
    // Use web layout
    return <Slot />; // renders /web pages
  }

  // Use mobile layout
  return <Slot />; // renders /mobile pages
}
