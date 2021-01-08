import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Dashboard } from "../screens/Dashboard";
const Stack = createStackNavigator();

const screenOptions = {
  headerShown: true,
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Initial Screen"
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};
