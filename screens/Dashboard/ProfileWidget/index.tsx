import { User } from "firebase";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { COLORS, FONTS } from "../../../constants";
import { Icon } from "react-native-elements";

interface ProfileWidgetProps {
  user: User;
}

export const ProfileWidget = ({ user }: ProfileWidgetProps) => {
  const avatarElement = () => {
    if (user && user.email) {
      const { email, displayName, photoURL } = user;
      return (
        <Avatar
          size="large"
          title={
            displayName
              ? displayName.toUpperCase().slice(0, 2)
              : email.slice(0, 2).toUpperCase()
          }
          rounded
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={styles.avatar}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {avatarElement()}
      <Text style={styles.avatarInfoName}>{user.displayName}</Text>
      <Text style={styles.avatarInfoEmail}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: COLORS.secondary,
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  avatarInfoName: {
    alignSelf: "center",
    color: COLORS.darkgray2,
    marginBottom: 8,
    ...FONTS.h2,
  },
  avatarInfoEmail: {
    alignSelf: "center",
    color: COLORS.darkgray,
    ...FONTS.body3,
  },
});
