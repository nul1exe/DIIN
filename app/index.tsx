import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function Index() {
  if (Platform.OS === 'web') {
    // Redirect web users to the web dashboard
    return <Redirect href="/web/login" />;
  }

  // Redirect mobile users to mobile home
  return <Redirect href="/mobile/home" />;
}
