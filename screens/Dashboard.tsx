import React from "react";
import { Text } from "react-native";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../components/Button";
import Firebase from "../firebase/config";
export const Dashboard = () => {
  return (
    <CustomButton
      label="Logout"
      onPress={() => Firebase.auth().signOut()}
      shadows={Shadows.BIG}
      buttonType={ButtonType.PRIMARY}
      buttonSize={ButtonSize.BIG}
      outlined={false}
    />
  );
};
