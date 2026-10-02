import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../../constants/Colors";

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors.title,
        headerStyle: {
          backgroundColor: Colors.navBackground,
        },
      }}
    >
      <Stack.Screen name="home" options={{ title: "Home" }} />
    </Stack>
  );
};

export default AppLayout;
