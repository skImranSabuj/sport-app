import { View, Text, Pressable } from 'react-native';

export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Something went wrong</Text>
      <Pressable onPress={onRetry}>
        <Text style={{ marginTop: 8, color: '#3B4CCA' }}>Retry</Text>
      </Pressable>
    </View>
  );
}
