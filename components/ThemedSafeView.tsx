import { StyleProp, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedView from "./ThemedView";

interface ThemedSafeableViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const ThemedSafeView: React.FC<ThemedSafeableViewProps> = ({
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedSafeView;
