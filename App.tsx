// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MatchListScreen from './screens/MatchScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <MatchListScreen />
    </QueryClientProvider>
  );
}