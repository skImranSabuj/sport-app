import { View } from "react-native";
import { Colors, Spacing } from "../theme";

function Separator() {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        marginHorizontal: Spacing[4],
        borderColor: Colors.border,
      }}
    />
  );
}

export default Separator;
