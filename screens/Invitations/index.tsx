import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { useFirebaseAuthContext } from "../../hooks/authentication";
import { useFocusEffect } from "@react-navigation/native";
import { Group, Invitation, UserCollection } from "../../types";
import Firebase from "../../firebase/config";
import { GroupType } from "react-select";
import firebase from "firebase";

export const Invitations = () => {
  const { currentUser } = useFirebaseAuthContext();
  const [userProfile, setUserProfile] = React.useState<UserCollection | null>();
  const [loading, setLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  //Get user and set to the user profile
  React.useEffect(() => {
    if (currentUser?.uid) {
      setLoading(true);
      const subscriber = Firebase.firestore()
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((documentSnapshot) => {
          setUserProfile(documentSnapshot.data() as UserCollection);
          setLoading(false);
        });
      return () => subscriber();
    }
  }, [currentUser]);

  const manageInvitation = async (
    invitationGroupId: string,
    accepted: boolean
  ) => {
    try {
      const filteredInvitations = userProfile?.invitations.filter(
        (invitation) => invitation.invitedToId !== invitationGroupId
      );
      if (currentUser?.uid) {
        const userRef = Firebase.firestore()
          .collection("users")
          .doc(currentUser.uid);
        if (accepted) {
          const groupRef = Firebase.firestore()
            .collection("groups")
            .doc(invitationGroupId);
          groupRef.update({
            members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
          });
          userRef.update({
            memberof: firebase.firestore.FieldValue.arrayUnion(
              invitationGroupId
            ),
            invitations: filteredInvitations,
          });
        }
        userRef.update({
          invitations: filteredInvitations,
        });
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const invitationElement = userProfile?.invitations.length ? (
    userProfile.invitations.map((invitation: Invitation) => (
      <View style={styles.container} key={invitation.invitedToId}>
        <Text style={styles.invitationTitle}>{invitation.invitedToName}</Text>
        <Text style={styles.invitationAuthor}>
          By {invitation.invitedBy.displayName}
        </Text>
        <TouchableOpacity
          onPress={() => manageInvitation(invitation.invitedToId, true)}
        >
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: COLORS.accent }}
          >
            <Text
              style={{
                marginTop: 16,
                color: COLORS.accent,
              }}
            >
              Accept
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => manageInvitation(invitation.invitedToId, false)}
        >
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: COLORS.accent }}
          >
            <Text
              style={{
                marginTop: 16,
                color: COLORS.accent,
              }}
            >
              Decline
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.accent }}>
      <Text
        style={{
          marginTop: 16,
          color: COLORS.accent,
        }}
      >
        You currently don't have any invitation
      </Text>
    </View>
  );
  return <View style={styles.container}>{invitationElement}</View>;
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
  invitationTitle: {
    ...FONTS.body4,
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
  invitationAuthor: {
    ...FONTS.formDescriptionLabel,
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: COLORS.secondary,
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  formContainer: {
    alignSelf: "stretch",
  },
});

// Without subscription:

/* useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        getUserProfile(currentUser.uid);
      }
    }, [currentUser])
  );

  const getUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      const userRef = await Firebase.firestore()
        .collection("users")
        .doc(userId)
        .get();
      const user = userRef.data() as UserCollection;
      setUserProfile(user);
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }; */
