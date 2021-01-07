import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigators/authNavigator";
import * as Font from "expo-font";
import { Loading } from "./screens/Loading";

export default function App() {
  const [isLoadingFonts, setIsLoadingFonts] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadFonts();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
      PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
      PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    });
    setIsLoadingFonts(false);
  }

  if (isLoadingFonts) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
