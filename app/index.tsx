import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import Spacer from "../components/Spacer";
import ThemedButton from "../components/ThemedButton";
import { useRouter } from "expo-router";
import ThemedSafeView from "../components/ThemedSafeView";
import { AuthMode } from "../services/auth-service";

const Welcome = () => {
  const router = useRouter();

  const goToPhoneNumberPage = (mode: AuthMode) => {
    router.navigate({ pathname: "/phoneNumberPage", params: { mode } });
  };

  return (
    <ThemedSafeView style={{ backgroundColor: Colors.welcomeBackground }}>
      <Spacer />
      <Text style={[styles.title, styles.container]}>Welcome to click!</Text>
      <Spacer height="50%" style={{ flexShrink: 3 }} />
      <ThemedButton onPress={() => goToPhoneNumberPage("login")}>
        Log in with phone number
      </ThemedButton>
      <Spacer height={16} />
      <ThemedButton onPress={() => goToPhoneNumberPage("create-user")}>
        Create an account
      </ThemedButton>
      <Spacer />
    </ThemedSafeView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
