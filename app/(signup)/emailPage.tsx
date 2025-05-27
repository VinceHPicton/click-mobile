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
    console.log("phone form submitted: ", email);
    setEmail("");
  };

  const [email, setEmail] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedSafeableView>
        <ThemedTextInput
          placeholder="Enter your email"
          style={{ width: "80%", marginBottom: 20 }}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <ThemedButton onPress={handleSubmit}>Submit</ThemedButton>
      </ThemedSafeableView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberPage;

const styles = StyleSheet.create({});
