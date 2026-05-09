import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SignupLayout = () => {
  return (
    <>
      <StatusBar style="auto"></StatusBar>
      <Stack
        screenOptions={{
          animation: "none",
          headerShown: false,
        }}
      />
    </>
  );
};

export default SignupLayout;

const styles = StyleSheet.create({});
