import { Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import React, { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedSafeView from "../../components/ThemedSafeView";
import useRegisterAttempt from "../../hooks/useRegisterAttempt";
import ThemedView from "../../components/ThemedView";

const ConfirmationCodePage = () => {
  const router = useRouter();
  const { sendConfirmationCode } = useRegisterAttempt();

  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      const response = await sendConfirmationCode(
        confirmationCode.trim()
      );
      console.log(response.data);
      router.navigate("/emailPage");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error"));
      }
      console.error("confirmationCode submit:", error);
    } finally {
      setConfirmationCode("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedSafeView>
        <ThemedTextInput
          placeholder="Enter your 6 digit confirmation code"
          style={{ width: "80%", marginBottom: 20 }}
          value={confirmationCode}
          keyboardType="number-pad"
          onChangeText={setConfirmationCode}
        />

        <ThemedButton onPress={handleSubmit}>Next</ThemedButton>
        {error ? (
          <ThemedView>
            <Text>{error.message}</Text>
          </ThemedView>
        ) : null}
      </ThemedSafeView>
    </TouchableWithoutFeedback>
  );
};

export default ConfirmationCodePage;

// const styles = StyleSheet.create({});

