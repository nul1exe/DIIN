import { Platform } from 'react-native';
import { Redirect } from 'expo-router';

export default function Index() {
  if (Platform.OS === 'web') {
    // Redirect web users to the web dashboard
    return <Redirect href="/web/dashboard" />;
  }

  // Redirect mobile users to mobile home
  return <Redirect href="/mobile/auth/register" />;
}
