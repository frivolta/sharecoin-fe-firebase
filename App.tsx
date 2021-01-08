import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigators/authNavigator";
import * as Font from "expo-font";
import { Loading } from "./screens/Loading";
import {
  FirebaseAuthProvider,
  useFirebaseAuthContext,
} from "./hooks/authentication";
import { AppNavigator } from "./navigators/appNavigator";

export default function App() {
  return (
    <FirebaseAuthProvider>
      <NavigationContainer>
        <AppLoader />
      </NavigationContainer>
    </FirebaseAuthProvider>
  );
}

const AppLoader = () => {
  const [loaded] = Font.useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  });
  const { isLoading, isUserSignedIn } = useFirebaseAuthContext();

  if (!loaded || isLoading) {
    return <Loading />;
  }

  if (isUserSignedIn) {
    return <AppNavigator />;
  }
  return <AuthNavigator />;
};
