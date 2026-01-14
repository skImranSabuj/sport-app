import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";
import { Colors } from "../theme";

export default function EmptyState({
  variant,
}: {
  variant: "loading" | "empty";
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (variant === "loading") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [variant]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
      }}
    >
      {variant === "loading" ? (
        <>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Animated.View
            style={{
              marginTop: 16,
              transform: [{ scale: pulseAnim }],
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: Colors.muted }}
            >
              Loading matches...
            </Text>
          </Animated.View>
        </>
      ) : (
        <>
          <Text
            style={{ fontSize: 18, fontWeight: "600", color: Colors.black }}
          >
            No matches found
          </Text>
          <Text style={{ fontSize: 14, color: Colors.muted, marginTop: 8 }}>
            Try adjusting filters or check back later
          </Text>
        </>
      )}
    </View>
  );
}
