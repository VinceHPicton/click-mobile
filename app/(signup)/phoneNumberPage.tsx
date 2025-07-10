import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import React, { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useRouter } from "expo-router";
import ThemedSafeView from "../../components/ThemedSafeView";
import registerAttemptService, {
  RegisterAttempt,
} from "../../services/register-attempt-service";
import useRegisterAttempt from "../../hooks/useRegisterAttempt";
import ThemedView from "../../components/ThemedView";

const PhoneNumberPage = () => {
  const router = useRouter();
  const { createRegisterAttempt } = useRegisterAttempt();

  const [errorShown, setErrorShown] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await createRegisterAttempt(phoneNumber);
      console.log(response.data.one_time_code);
      router.navigate("/emailPage");
    } catch (err) {
      console.log("error shown now");
      setErrorShown(true);
    }
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
        {errorShown ? (
          <ThemedView>
            <Text>ERROR</Text>
          </ThemedView>
        ) : null}
      </ThemedSafeView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberPage;

const styles = StyleSheet.create({});
