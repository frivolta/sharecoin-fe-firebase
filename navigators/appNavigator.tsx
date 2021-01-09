import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Dashboard } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const DashboardStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: true,
};

export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "ios-information-circle";
          if (route.name === "Dashboard") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          }
          if (route.name === "Groups") {
            iconName = focused ? "ios-albums" : "ios-albums-outline";
          }
          if (route.name === "Create Group") {
            iconName = focused
              ? "ios-people-circle"
              : "ios-people-circle-outline";
          }
          if (route.name === "Settings") {
            iconName = focused ? "ios-cog" : "ios-cog-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
      <Tab.Screen name="Groups" component={DashboardStackScreen} />
      <Tab.Screen name="Create Group" component={DashboardStackScreen} />
      <Tab.Screen name="Settings" component={DashboardStackScreen} />
    </Tab.Navigator>
  );
};
