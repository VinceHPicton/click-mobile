import {
  StyleProp,
  TextInput,
  TextInputProps,
  ViewStyle,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

interface ThemedTextInputProps extends TextInputProps {}

const ThemedTextInput: React.FC<ThemedTextInputProps> = (props) => {
  // Here we can pull style out of props, which is another option to including it in the args
  const { style, ...restProps } = props;

  return (
    <TextInput
      style={[
        {
          backgroundColor: Colors.uiBackground,
          color: Colors.title,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...restProps}
    />
  );
};

export default ThemedTextInput;
