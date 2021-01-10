import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Dimensions from "../../constants/layout";

import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { COLORS, FONTS } from "../../constants";
import Firebase from "../../firebase/config";
import { useFirebaseAuthContext } from "../../hooks/authentication";
import { Group } from "../../types";

export const Groups = () => {
  const { currentUser } = useFirebaseAuthContext();
  const [groups, setGroups] = React.useState<null | Group[]>(null);
  const [loading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  React.useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    if (currentUser?.uid) {
      const groupsSnapshot = await Firebase.firestore()
        .collection("groups")
        .where("members", "array-contains", currentUser.uid)
        .get();
      const groups: Group[] = groupsSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Group;
      });
      //Get creator and populate
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Groups</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: Dimensions.window.width * 0.1,
  },
  buttonContainer: {
    flex: 2,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
});
