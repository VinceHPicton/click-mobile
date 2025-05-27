import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import Spacer from "../components/Spacer";
import ThemedSafeableView from "../components/ThemedSafeableView";
import { useUser } from "../hooks/useUser";
import ThemedButton from "../components/ThemedButton";
import { Link, useRouter } from "expo-router";

const Home = () => {
  const { user } = useUser();
  const router = useRouter();

  console.log(user);

  const handleClick = () => {
    router.navigate("/phoneNumberPage");
  };

  return (
    <ThemedSafeableView
      safe={true}
      style={[{ backgroundColor: Colors.welcomeBackground }]}
    >
      <Spacer></Spacer>
      <Text>Welcome to click!</Text>

      <Spacer height="50%" style={{ flexShrink: 3 }} />

      <ThemedButton onPress={handleClick}>
        Log in with phone number
      </ThemedButton>
    </ThemedSafeableView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
