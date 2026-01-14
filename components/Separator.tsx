import { View } from "react-native";
import { Colors, Spacing } from "../theme";

function Separator() {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        marginHorizontal: Spacing.lg,
        borderColor: Colors.border,
      }}
    />
  );
}

export default Separator;
