// App.tsx
import BottomSheet from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React, { useRef } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MatchListScreen from "./screens/MatchScreen";
import { Colors } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    "bold-font": require("./assets/fonts/fonnts.com-Apotek_Comp_Regular.otf"),
    // "bold-font": require("./assets/fonts/Apotek-Regular.otf"),
    "semi-bold-font": require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  const bottomSheetRef = useRef<BottomSheet>(null);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.white }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <MatchListScreen />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
