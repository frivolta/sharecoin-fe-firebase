import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreateGroup, Dashboard } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Groups } from "../screens/Groups";
import { Group } from "../screens/Groups/Group";
import { AddMember } from "../screens/Groups/AddMember";
import { GroupsStackScreenParamsList } from "../types";
import { Invitations } from "../screens/Invitations";

const DashboardStack = createStackNavigator();
const CreateGroupStack = createStackNavigator();
const InvitationsStack = createStackNavigator();
const GroupsStack = createStackNavigator<GroupsStackScreenParamsList>();
const Tab = createBottomTabNavigator();

export const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  );
};

export const CreateGroupStackScreen = () => {
  return (
    <CreateGroupStack.Navigator>
      <CreateGroupStack.Screen name="Create Group" component={CreateGroup} />
    </CreateGroupStack.Navigator>
  );
};

export const GroupsStackScreen = () => {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="Groups" component={Groups} />
      <GroupsStack.Screen name="Group" component={Group} />
      <GroupsStack.Screen name="AddMember" component={AddMember} />
    </GroupsStack.Navigator>
  );
};

export const InvitationsStackScreen = () => {
  return (
    <InvitationsStack.Navigator>
      <InvitationsStack.Screen name="Invitations" component={Invitations} />
    </InvitationsStack.Navigator>
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
          if (route.name === "Invitations") {
            iconName = focused ? "ios-person-add" : "ios-person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
      <Tab.Screen name="Groups" component={GroupsStackScreen} />
      <Tab.Screen name="Create Group" component={CreateGroupStackScreen} />
      <Tab.Screen name="Invitations" component={InvitationsStackScreen} />
    </Tab.Navigator>
  );
};
