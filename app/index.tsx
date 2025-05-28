import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import Spacer from "../components/Spacer";
import { useUser } from "../hooks/useUser";
import ThemedButton from "../components/ThemedButton";
import { useRouter } from "expo-router";
import ThemedSafeView from "../components/ThemedSafeView";

const Home = () => {
  const { user } = useUser();
  const router = useRouter();

  console.log(user);

  const handleClick = () => {
    router.navigate("/phoneNumberPage");
  };

  return (
    <ThemedSafeView style={[{ backgroundColor: Colors.welcomeBackground }]}>
      <Spacer></Spacer>
      <Text>Welcome to click!</Text>

      <Spacer height="50%" style={{ flexShrink: 3 }} />

      <ThemedButton onPress={handleClick}>
        Log in with phone number
      </ThemedButton>
    </ThemedSafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
