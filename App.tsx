import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./navigators/mainNavigator";
import { CombinedDarkTheme, theme } from "./customTheme";
export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
