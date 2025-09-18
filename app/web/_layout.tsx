import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

export default function WebLayout() {
  return (
    <View style={styles.container}>
      <Slot /> {/* renders /web/dashboard, /web/settings, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
