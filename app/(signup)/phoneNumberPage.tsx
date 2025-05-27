import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import Spacer from "../../components/Spacer";
import ThemedSafeableView from "../../components/ThemedSafeableView";
import ThemedButton from "../../components/ThemedButton";
import { useUser } from "../../hooks/useUser";
import ThemedTextInput from "../../components/ThemedTextInput";

const PhoneNumberPage = () => {
  const handleSubmit = () => {
    console.log("phone form submitted: ", phoneNumber);
  };

  const [phoneNumber, setphoneNumber] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedSafeableView>
        <Text>Hello</Text>

        <ThemedTextInput
          placeholder="Enter your phone number"
          style={{ width: "80%", marginBottom: 20 }}
          value={phoneNumber}
          keyboardType="number-pad"
          onChangeText={setphoneNumber}
        />
        <Spacer height="20%" style={{ flexShrink: 3 }} />

        <ThemedButton onPress={handleSubmit}>Button!</ThemedButton>
      </ThemedSafeableView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
