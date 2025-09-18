import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

export default function MobileLayout() {
  return (
    <View style={styles.container}>
      <Slot /> {/* renders /mobile/home, /mobile/settings, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
