import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import Firebase from "../../firebase/config";
import { useFirebaseAuthContext } from "../../hooks/authentication";
export const Dashboard = () => {
  const { currentUser } = useFirebaseAuthContext();

  if (currentUser && currentUser.email && currentUser.displayName) {
    const { email, displayName, photoURL } = currentUser;
    return (
      <Avatar
        size="large"
        title={displayName.toUpperCase().slice(0, 2)}
        rounded
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={{ backgroundColor: "red" }}
      />
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
