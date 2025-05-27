import { ReactNode } from "react";
import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";

interface SpacerProps {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
}

const Spacer: React.FC<SpacerProps> = ({
  width = "100%",
  height = 40,
  style,
}) => {
  return <View style={[{ width, height }, style]} />;
};

export default Spacer;
