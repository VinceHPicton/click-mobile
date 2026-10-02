import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedSafeView from "../../components/ThemedSafeView";
import Spacer from "../../components/Spacer";
import { useSignup } from "../../hooks/useSignup";
import { AuthMode } from "../../services/auth-service";
import { getErrorMessage, getErrorStatus } from "../../services/api-error";
import { Colors } from "../../constants/Colors";

const CODE_LENGTH = 6;

const otherMode = (mode: AuthMode): AuthMode =>
  mode === "login" ? "create-user" : "login";

const isWrongModeError = (mode: AuthMode, status?: number) =>
  (mode === "login" && status === 404) ||
  (mode === "create-user" && status === 400);

const ConfirmationCodePage = () => {
  const { attempt, startAttempt, confirmAttempt } = useSignup();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [suggestedMode, setSuggestedMode] = useState<AuthMode | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  if (!attempt) return <Redirect href="/" />;

  const runBusy = async (action: () => Promise<void>) => {
    setError(null);
    setSuggestedMode(null);
    setIsBusy(true);
    try {
      await action();
    } finally {
      setIsBusy(false);
    }
  };

  const handleSubmit = () =>
    runBusy(async () => {
      const code = confirmationCode.trim();
      if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(code)) {
        setError(`Enter the ${CODE_LENGTH} digit code`);
        return;
      }
      try {
        await confirmAttempt(code);
      } catch (error: unknown) {
        setError(getErrorMessage(error));
        if (isWrongModeError(attempt.mode, getErrorStatus(error))) {
          setSuggestedMode(otherMode(attempt.mode));
        }
        setConfirmationCode("");
        console.error("confirmAttempt failed:", error);
      }
    });

  const restartAttempt = (mode: AuthMode) =>
    runBusy(async () => {
      try {
        await startAttempt(mode, attempt.mobile);
        setConfirmationCode("");
      } catch (error: unknown) {
        setError(getErrorMessage(error));
        console.error("startAttempt failed:", error);
      }
    });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedSafeView>
        <Text style={styles.title}>
          {attempt.mode === "login" ? "Log in" : "Create your account"}
        </Text>
        <Text style={styles.subtitle}>
          Enter the code sent to {attempt.mobile}
        </Text>
        {__DEV__ ? (
          <Text style={styles.devHint}>Dev code: {attempt.devOneTimeCode}</Text>
        ) : null}
        <ThemedTextInput
          placeholder={`Enter your ${CODE_LENGTH} digit confirmation code`}
          accessibilityLabel="Confirmation code"
          style={styles.input}
          value={confirmationCode}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          maxLength={CODE_LENGTH}
          editable={!isBusy}
          onChangeText={setConfirmationCode}
          onSubmitEditing={handleSubmit}
        />
        <ThemedButton onPress={handleSubmit} disabled={isBusy}>
          {isBusy ? "Please wait..." : "Confirm"}
        </ThemedButton>
        {error ? (
          <Text style={styles.error} accessibilityRole="alert">
            {error}
          </Text>
        ) : null}
        <Spacer height={16} />
        {suggestedMode ? (
          <ThemedButton
            onPress={() => restartAttempt(suggestedMode)}
            disabled={isBusy}
          >
            {suggestedMode === "create-user"
              ? "Create an account with this number"
              : "Log in with this number"}
          </ThemedButton>
        ) : (
          <ThemedButton
            onPress={() => restartAttempt(attempt.mode)}
            disabled={isBusy}
          >
            Send a new code
          </ThemedButton>
        )}
      </ThemedSafeView>
    </TouchableWithoutFeedback>
  );
};

export default ConfirmationCodePage;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.title,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.title,
    marginBottom: 20,
  },
  devHint: {
    color: Colors.iconColor,
    marginBottom: 12,
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
