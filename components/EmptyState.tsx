import { View, Text } from 'react-native';

export default function EmptyState({ variant }: { variant: 'loading' | 'empty' }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{variant === 'loading' ? 'Loading...' : 'No matches found'}</Text>
    </View>
  );
}
