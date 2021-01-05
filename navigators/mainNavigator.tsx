import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreateAccount } from "../screens/Main/create-account";
const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Account"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
