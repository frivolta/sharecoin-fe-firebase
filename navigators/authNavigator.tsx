import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreateAccount, Login } from "../screens/Auth";
import { InitialScreen } from "../screens/Auth/initial-screen";
const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Initial Screen"
    >
      <Stack.Screen name="Initial Screen" component={InitialScreen} />
      <Stack.Screen name="Create Account" component={CreateAccount} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
