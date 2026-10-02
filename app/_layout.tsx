import { ActivityIndicator } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { useUser } from "../hooks/useUser";
import ThemedView from "../components/ThemedView";

const RootNavigator = () => {
  const { user, isRestoringSession } = useUser();

  if (isRestoringSession) {
    return (
      <ThemedView>
        <ActivityIndicator color={Colors.primary} />
      </ThemedView>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors.title,
        headerStyle: {
          backgroundColor: Colors.navBackground,
        },
      }}
    >
      <Stack.Protected guard={!user}>
        <Stack.Screen
          name="index"
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen name="(signup)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <UserProvider>
      <StatusBar style="auto"></StatusBar>
      <RootNavigator />
    </UserProvider>
  );
};

export default RootLayout;
