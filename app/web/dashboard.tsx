import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Dashboard() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to the Web Dashboard!</ThemedText>
      <ThemedText style={styles.subtitle}>
        Here you can manage trackers, view stats, and perform other web-specific actions.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
});
