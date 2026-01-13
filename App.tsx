// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';

import MatchListScreen from './screens/MatchScreen';

const queryClient = new QueryClient();

export default function App() {
    const [fontsLoaded] = useFonts({
    'bold-font': require('./assets/fonts/Apotek_Regular.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <MatchListScreen />
    </QueryClientProvider>
  );
}