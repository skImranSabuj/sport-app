import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MatchListScreen from "./screens/MatchScreen";
import { Colors } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    boldFont: require("./assets/fonts/Apotek-Regular.ttf"),
    mediumFont: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.container}>
          <MatchListScreen />
        </View>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
