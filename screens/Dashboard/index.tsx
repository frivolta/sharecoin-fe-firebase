import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { COLORS } from "../../constants";
import Firebase from "../../firebase/config";
import { useFirebaseAuthContext } from "../../hooks/authentication";
import { ProfileWidget } from "./ProfileWidget";
export const Dashboard = () => {
  const { currentUser } = useFirebaseAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {currentUser ? <ProfileWidget user={currentUser} /> : null}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Logout"
          onPress={() => Firebase.auth().signOut()}
          shadows={Shadows.BIG}
          buttonType={ButtonType.PRIMARY}
          buttonSize={ButtonSize.BIG}
          outlined={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    flex: 2,
  },
});
