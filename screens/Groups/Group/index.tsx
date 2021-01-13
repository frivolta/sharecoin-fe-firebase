import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFirebaseAuthContext } from "../../../hooks/authentication";
import { PopulatedGroup } from "../../../types";
import { COLORS, FONTS } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Firebase from "../../../firebase/config";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../../components/Button";

export const Group = ({ route, navigation }: any) => {
  const { currentUser } = useFirebaseAuthContext();
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  React.useEffect(() => {
    const subscriber = Firebase.firestore()
      .collection("groups")
      .doc(route.params.groupId)
      .onSnapshot((documentSnapshot) => {
        //console.log("User data: ", documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  const errorMessageElement =
    hasError && errorMessage ? (
      <View style={{ borderBottomColor: COLORS.danger }}>
        <Text
          style={{
            marginTop: 16,
            color: COLORS.accent,
          }}
        >
          {errorMessage}
        </Text>
      </View>
    ) : null;

  const loadingElement = <Text style={styles.title}>Loading...</Text>;
  const addMemberElement =
    route.params.owner.id === currentUser?.uid ? (
      <CustomButton
        label="Add Member"
        onPress={() =>
          navigation.navigate("AddMember", {
            owner: route.params.owner,
            groupId: route.params.groupId,
            groupName: route.params.groupName,
          })
        }
        shadows={Shadows.BIG}
        buttonType={ButtonType.PRIMARY}
        buttonSize={ButtonSize.BIG}
        outlined={false}
      />
    ) : (
      <Text
        style={{
          marginTop: 16,
          color: COLORS.accent,
        }}
      >
        You cannot add members
      </Text>
    );
  const addExpenseElement = (
    <CustomButton
      label="Add Expense"
      onPress={() =>
        navigation.navigate("AddExpense", {
          groupId: route.params.groupId,
        })
      }
      shadows={Shadows.BIG}
      buttonType={ButtonType.PRIMARY}
      buttonSize={ButtonSize.BIG}
      outlined={false}
    />
  );

  if (loading) {
    return loadingElement;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group</Text>
      <View style={{ alignSelf: "stretch" }}>
        {addMemberElement}
        {addExpenseElement}
      </View>
      {errorMessageElement}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 2,
  },
  listItem: {
    alignSelf: "stretch",
  },
  title: {
    ...FONTS.h1,
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: COLORS.secondary,
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 18,
  },
});
