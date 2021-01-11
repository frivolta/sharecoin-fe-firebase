import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFirebaseAuthContext } from "../../../hooks/authentication";
import { GroupsStackScreenParamsList, PopulatedGroup } from "../../../types";
import { COLORS, FONTS } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Firebase from "../../../firebase/config";
import { StackNavigationProp } from "@react-navigation/stack";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "../../../components/Input";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../../components/Button";
import firebase from "firebase";

// Take group id
// Search a user
// if the user is not yet member add request invitation and go back to group
// if the user is not found: error
// if the user is already in the group: error
type GroupsScreenNavigationProps = StackNavigationProp<
  GroupsStackScreenParamsList,
  "AddMember"
>;
type GroupsScreenRouteProps = RouteProp<
  GroupsStackScreenParamsList,
  "AddMember"
>;

type Props = {
  route: GroupsScreenRouteProps;
  navigation: GroupsScreenNavigationProps;
};

interface AddMemberForm {
  email: string;
}

export const AddMember = ({ route }: Props) => {
  const { currentUser } = useFirebaseAuthContext();
  const [groups, setGroups] = React.useState<null | PopulatedGroup[]>(null);
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const navigation = useNavigation();
  const { control, handleSubmit, errors, reset } = useForm<AddMemberForm>({
    mode: "onChange",
  });

  const onSubmit = async (data: AddMemberForm) => {
    try {
      if (currentUser?.uid) {
        setLoading(true);
        const user = await Firebase.firestore()
          .collection("users")
          .where("email", "==", data.email)
          .get();

        if (user.docs[0] === undefined) {
          throw "No user has that email";
        }
        console.log(user.docs[0].data(), route.params.groupId);
        if (user.docs[0].data().memberof.includes(route.params.groupId)) {
          throw "User is already member of the group";
        }
        if (user.docs[0].data().invitations.includes(route.params.groupId)) {
          throw "Invitation to this user has already been sent";
        }
        const userRef = Firebase.firestore()
          .collection("users")
          .doc(user.docs[0].id);
        userRef.update({
          invitations: firebase.firestore.FieldValue.arrayUnion(
            route.params.groupId
          ),
        });
        navigation.goBack();
      }
    } catch (err) {
      setHasError(true);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  const errorMessageElement =
    hasError && errorMessage ? (
      <View style={{ alignSelf: "center" }}>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add member email</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="yourfriend@email.com"
              keyboardType="email-address"
              maxLength={250}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.email)}
              errorText={errors.email?.message}
            />
          )}
          name="email"
          rules={{
            required: { value: true, message: "Please enter a valid email" },
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "invalid email address",
            },
          }}
          defaultValue=""
        />
        {errorMessageElement}
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <CustomButton
          label="Create Group"
          onPress={handleSubmit(onSubmit)}
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
  formContainer: {
    alignSelf: "stretch",
  },
});
