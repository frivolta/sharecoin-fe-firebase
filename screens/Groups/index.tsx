import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Dimensions from "../../constants/layout";
import { useFocusEffect } from "@react-navigation/native";

import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { COLORS, FONTS } from "../../constants";
import Firebase from "../../firebase/config";
import { useFirebaseAuthContext } from "../../hooks/authentication";
import { Group, PopulatedGroup } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Avatar } from "react-native-elements";

export const Groups = () => {
  const { currentUser } = useFirebaseAuthContext();
  const [groups, setGroups] = React.useState<null | PopulatedGroup[]>(null);
  const [loading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getGroups();
    }, [])
  );

  const getGroups = async () => {
    try {
      setLoading(true);
      setHasError(false);
      if (currentUser?.uid) {
        const groupsSnapshot = await Firebase.firestore()
          .collection("groups")
          .where("members", "array-contains", currentUser.uid)
          .get();
        const groups: Group[] = groupsSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as Group;
        });
        const groupsWithCreatorPromise: any = groups.map(async (group) => {
          const groupWithCreator = await Firebase.firestore()
            .collection("users")
            .doc(group.createdBy)
            .get();
          return {
            ...group,
            createdBy: { ...groupWithCreator.data(), id: group.createdBy },
          };
        });
        const populatedGroups = (await Promise.all(
          groupsWithCreatorPromise
        )) as PopulatedGroup[];
        setGroups(populatedGroups);
      }
      throw "Please logout and try again";
    } catch (err) {
      setHasError(true);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return loadingElement;
  }

  const listItemElement =
    groups && groups.length > 0 ? (
      groups.map((group, i) => (
        <ListItem
          key={i}
          bottomDivider
          style={styles.listItem}
          onPress={() =>
            navigation.navigate("Group", {
              owner: group.createdBy,
              groupId: group.id,
            })
          }
        >
          <Avatar
            title={
              group.createdBy.displayName
                ? group.createdBy.displayName.toUpperCase().slice(0, 2)
                : group.createdBy.email.slice(0, 2).toUpperCase()
            }
            source={{ uri: group.createdBy.photoUrl }}
            containerStyle={styles.avatar}
          />
          <ListItem.Content>
            <ListItem.Title>{group.name}</ListItem.Title>
            <ListItem.Subtitle>{group.createdBy.displayName}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))
    ) : (
      <Text style={styles.title}>You don't have any group yet</Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Groups</Text>
      {listItemElement}
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
    padding: Dimensions.window.width * 0.1,
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
