import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";

const SignupLayout = () => {
  return (
    <>
      {/* StatusBar styles the time and battery icons etc at the top, auto is the default anyway */}
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
