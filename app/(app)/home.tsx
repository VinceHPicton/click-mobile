import { Alert, Platform, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import ThemedSafeView from "../../components/ThemedSafeView";
import Spacer from "../../components/Spacer";
import { useUser } from "../../hooks/useUser";
import { getErrorMessage } from "../../services/api-error";
import { Colors } from "../../constants/Colors";

const DELETE_CONFIRM_TITLE = "Delete account?";
const DELETE_CONFIRM_MESSAGE = "This will permanently delete your account.";

// Alert.alert buttons are ignored on web, so fall back to window.confirm there.
const confirmDeletion = (): Promise<boolean> => {
  if (Platform.OS === "web") {
    return Promise.resolve(
      window.confirm(`${DELETE_CONFIRM_TITLE}\n${DELETE_CONFIRM_MESSAGE}`)
    );
  }
  return new Promise((resolve) =>
    Alert.alert(DELETE_CONFIRM_TITLE, DELETE_CONFIRM_MESSAGE, [
      { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
      { text: "Delete", style: "destructive", onPress: () => resolve(true) },
    ])
  );
};

const Home = () => {
  const { user, logout, deleteAccount } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const handleLogout = async () => {
    setIsBusy(true);
    await logout();
  };

  const handleDeleteAccount = async () => {
    if (!(await confirmDeletion())) return;
    setError(null);
    setIsBusy(true);
    try {
      await deleteAccount();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      setIsBusy(false);
      console.error("deleteAccount failed:", error);
    }
  };

  return (
    <ThemedSafeView>
      <Text style={styles.title}>You're logged in</Text>
      <Text style={styles.subtitle}>User ID: {user?.id}</Text>
      <Spacer />
      <ThemedButton onPress={handleLogout} disabled={isBusy}>
        Log out
      </ThemedButton>
      <Spacer height={16} />
      <ThemedButton
        onPress={handleDeleteAccount}
        disabled={isBusy}
        style={{ backgroundColor: Colors.warning }}
      >
        Delete account
      </ThemedButton>
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </ThemedSafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.title,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.iconColor,
  },
  error: {
    color: Colors.warning,
    marginTop: 16,
    textAlign: "center",
    width: "80%",
  },
});
