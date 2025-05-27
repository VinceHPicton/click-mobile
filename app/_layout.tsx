import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";

const RootLayout = () => {
  return (
    <UserProvider>
      {/* StatusBar styles the time and battery icons etc at the top, auto is the default anyway */}
      <StatusBar style="auto"></StatusBar>
      <Stack
        screenOptions={{
          headerTintColor: Colors.title,
          headerStyle: {
            backgroundColor: Colors.navBackground,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen name="(signup)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
