import { Image, Text, View } from "react-native";
import { Typography } from "../theme";

function Team({ name, logo }: { name: string; logo: string }) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Image
        source={{ uri: logo }}
        style={{ width: 36, height: 36 }}
        resizeMode="contain"
      />
      <Text
        style={{
          marginTop: 4,
          fontSize: Typography.size.sm,
          textAlign: "center",
        }}
      >
        {name}
      </Text>
    </View>
  );
}

export default Team;
