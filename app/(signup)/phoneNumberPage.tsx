import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useRouter } from "expo-router";
import ThemedSafeView from "../../components/ThemedSafeView";

const PhoneNumberPage = () => {
  const router = useRouter();
  const handleSubmit = () => {
    console.log("phone form submitted: ", phoneNumber);
    setphoneNumber("");
    router.navigate("/emailPage");
  };

  const [phoneNumber, setphoneNumber] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedSafeView>
        <ThemedTextInput
          placeholder="Enter your phone number"
          style={{ width: "80%", marginBottom: 20 }}
          value={phoneNumber}
          keyboardType="number-pad"
          onChangeText={setphoneNumber}
        />
        {/* <Spacer height="20%" style={{ flexShrink: 3 }} /> */}

        <ThemedButton onPress={handleSubmit}>Next</ThemedButton>
      </ThemedSafeView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberPage;

const styles = StyleSheet.create({});
