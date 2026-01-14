import { View, ActivityIndicator } from 'react-native';

export default function LoadingFooter({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <View style={{ padding: 16 }}>
      <ActivityIndicator />
    </View>
  );
}
