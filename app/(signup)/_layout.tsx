import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SignupProvider } from "../../contexts/SignupContext";

const SignupLayout = () => {
  return (
    <SignupProvider>
      <StatusBar style="auto"></StatusBar>
      <Stack
        screenOptions={{
          animation: "none",
          headerShown: false,
        }}
      />
    </SignupProvider>
  );
};

export default SignupLayout;

const styles = StyleSheet.create({});
