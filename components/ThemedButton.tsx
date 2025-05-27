import {
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
  StyleSheet,
  Pressable,
  PressableProps,
  Text,
} from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "../constants/Colors";

interface ThemedButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
    >
      <Text style={{ color: Colors.text }}>{children}</Text>
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
});
