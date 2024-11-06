import { View } from 'react-native';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Slot is required for nested routing to work correctly */}
      <Slot />
    </View>
  );
}
