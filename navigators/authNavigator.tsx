import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "../screens/Auth";
import { CreateAccount } from "../screens/Auth/create-account";
const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Create Account"
    >
      <Stack.Screen name="Create Account" component={CreateAccount} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
