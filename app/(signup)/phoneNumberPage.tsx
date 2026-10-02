import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import React, { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedSafeView from "../../components/ThemedSafeView";
import { useSignup } from "../../hooks/useSignup";
import { AuthMode } from "../../services/auth-service";
import { getErrorMessage } from "../../services/api-error";
import { Colors } from "../../constants/Colors";

const MAX_MOBILE_LENGTH = 20;

const PhoneNumberPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; mobile?: string }>();
  const mode: AuthMode = params.mode === "create-user" ? "create-user" : "login";
  const { startAttempt } = useSignup();
  const [phoneNumber, setPhoneNumber] = useState(params.mobile ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const mobile = phoneNumber.trim();
    if (!mobile) {
      setError("Please enter your phone number");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await startAttempt(mode, mobile);
      router.navigate("/confirmationCodePage");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      console.error("startAttempt failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedSafeView>
        <Text style={styles.title}>
          {mode === "login" ? "Log in" : "Create your account"}
        </Text>
        <ThemedTextInput
          placeholder="Enter your phone number"
          accessibilityLabel="Phone number"
          style={styles.input}
          value={phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
          maxLength={MAX_MOBILE_LENGTH}
          editable={!isSubmitting}
          onChangeText={setPhoneNumber}
          onSubmitEditing={handleSubmit}
        />
        <ThemedButton onPress={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Sending code..." : "Next"}
        </ThemedButton>
        {error ? (
          <Text style={styles.error} accessibilityRole="alert">
            {error}
          </Text>
        ) : null}
      </ThemedSafeView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberPage;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.title,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },
  error: {
    color: Colors.warning,
    marginTop: 16,
    textAlign: "center",
    width: "80%",
  },
});
