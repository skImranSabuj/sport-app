import { Text, View } from "react-native";

export default function EmptyState({
  variant,
}: {
  variant: "loading" | "empty";
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
      }}
    >
      <Text>{variant === "loading" ? "Loading..." : "No matches found"}</Text>
    </View>
  );
}
