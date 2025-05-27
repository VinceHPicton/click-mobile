import {
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
  StyleSheet,
} from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ThemedSafeableViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  safe?: boolean;
}

const ThemedSafeableView: React.FC<ThemedSafeableViewProps> = ({
  style,
  safe = true, // If this is set to false insets wont be applied, so content might be over the battery/notch etc
  ...props
}) => {
  const insets = useSafeAreaInsets();

  if (safe)
    return (
      <View
        style={[
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          styles.container,
          style,
        ]}
        {...props}
      />
    );
  else return <View style={[styles.container, style]} {...props} />;
};

export default ThemedSafeableView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
});
