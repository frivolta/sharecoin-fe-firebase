import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigators/authNavigator";
import * as Font from "expo-font";
import { Loading } from "./screens/Loading";

export default function App() {
  const [loaded, error] = Font.useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
