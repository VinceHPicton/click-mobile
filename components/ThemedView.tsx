import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "../constants/Colors";

interface ThemedSafeableViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const ThemedView: React.FC<ThemedSafeableViewProps> = ({ style, ...props }) => {
  return <View style={[styles.container, style]} {...props} />;
};

export default ThemedView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
