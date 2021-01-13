import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../../components/Button";
import { CustomInput } from "../../../components/Input";
import { COLORS, FONTS } from "../../../constants";
import Firebase from "../../../firebase/config";
import { useFirebaseAuthContext } from "../../../hooks/authentication";
import Dimensions from "../../../constants/layout";
import {
  Group,
  GroupMember,
  GroupsStackScreenParamsList,
} from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListItem, Avatar } from "react-native-elements";
import { group } from "console";

type GroupsScreenNavigationProps = StackNavigationProp<
  GroupsStackScreenParamsList,
  "AddExpense"
>;
type GroupsScreenRouteProps = RouteProp<
  GroupsStackScreenParamsList,
  "AddExpense"
>;

type Props = {
  route: GroupsScreenRouteProps;
  navigation: GroupsScreenNavigationProps;
};

interface AddExpenseForm {
  amount: string;
}

export const AddExpense = ({ route }: Props) => {
  const { currentUser } = useFirebaseAuthContext();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [groupMemberProfiles, setGroupMemberProfiles] = React.useState<
    GroupMember[] | null
  >(null);
  const [expenseBy, setExpenseBy] = React.useState<GroupMember | null>(null);
  const [splittedByIds, setSplittedByIds] = React.useState<string[]>([]);
  const { control, handleSubmit, errors, reset } = useForm<AddExpenseForm>({
    mode: "onChange",
  });
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  useFocusEffect(
    React.useCallback(() => {
      getUserMemberProfiles();
    }, [])
  );

  const getUserMemberProfiles = async () => {
    try {
      setLoading(true);
      setHasError(false);
      setErrorMessage(null);
      // Get all members id
      const { groupId } = route.params;
      const group = (await (
        await Firebase.firestore().collection("groups").doc(groupId).get()
      ).data()) as Group;
      const groupMembersIds = group.members;
      // Get all member profiles from id
      if (groupMembersIds.length > 1) {
        const groupMembersProfilesPromise: any = groupMembersIds.map(
          async (groupMemberId: string) => {
            const groupMemberProfile = await Firebase.firestore()
              .collection("users")
              .doc(groupMemberId)
              .get();
            return { id: groupMemberId, ...groupMemberProfile.data() };
          }
        );
        const groupMembersProfiles = (await Promise.all(
          groupMembersProfilesPromise
        )) as GroupMember[];
        // Set member profiles to state
        setGroupMemberProfiles(groupMembersProfiles);
        setExpenseBy(groupMembersProfiles[0]);
        console.log("Group member profiles: ", groupMembersProfiles);
      } else {
        throw "Please add member to the group before adding an expense";
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AddExpenseForm) => {
    try {
      setLoading(true);
      if (currentUser?.uid) {
        navigation.goBack();
      }
    } catch (err) {
      setHasError(true);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPayedBy = (groupMember: GroupMember) => {
    setExpenseBy(groupMember);
  };

  const handleSplittedBy = (groupMember: GroupMember) => {
    splittedByIds?.includes(groupMember.id)
      ? setSplittedByIds(
          splittedByIds.filter(
            (splittedById) => splittedById !== groupMember.id
          )
        )
      : setSplittedByIds([...splittedByIds, groupMember.id]);
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
  const payedByListItemElement = groupMemberProfiles
    ? groupMemberProfiles.map((groupMember) => (
        <ListItem
          key={groupMember.id}
          bottomDivider
          style={[
            styles.listItem,
            expenseBy?.id === groupMember.id ? styles.listItemSelected : null,
          ]}
          onPress={() => handleSelectPayedBy(groupMember)}
        >
          <Avatar
            title={
              groupMember.displayName
                ? groupMember.displayName.toUpperCase().slice(0, 2)
                : groupMember.email.slice(0, 2).toUpperCase()
            }
            source={{ uri: groupMember.photoUrl }}
            containerStyle={styles.avatar}
          />
          <ListItem.Content>
            <ListItem.Title>{groupMember.displayName}</ListItem.Title>
            <ListItem.Subtitle>{groupMember.email}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))
    : null;

  const splittedByListElement = groupMemberProfiles
    ? groupMemberProfiles.map((groupMember) => (
        <ListItem
          key={groupMember.id}
          bottomDivider
          style={[
            styles.listItem,
            splittedByIds.includes(groupMember.id)
              ? styles.listItemSelected
              : null,
          ]}
          onPress={() => handleSplittedBy(groupMember)}
        >
          <Avatar
            title={
              groupMember.displayName
                ? groupMember.displayName.toUpperCase().slice(0, 2)
                : groupMember.email.slice(0, 2).toUpperCase()
            }
            source={{ uri: groupMember.photoUrl }}
            containerStyle={styles.avatar}
          />
          <ListItem.Content>
            <ListItem.Title>{groupMember.displayName}</ListItem.Title>
            <ListItem.Subtitle>{groupMember.email}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))
    : null;

  if (loading) {
    return loadingElement;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense payed by:</Text>
      {payedByListItemElement}
      <Text style={styles.title}>Expense splitted by:</Text>
      {splittedByListElement}
      <Text style={styles.title}>Add Expense</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="amount"
              keyboardType="number-pad"
              maxLength={50}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.amount)}
              errorText={errors.amount?.message}
            />
          )}
          name="email"
          rules={{
            required: { value: true, message: "Please enter a valid email" },
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
    padding: Dimensions.window.width * 0.1,
  },
  buttonContainer: {},
  formContainer: {
    alignSelf: "stretch",
  },
  listItem: {
    alignSelf: "stretch",
  },
  listItemSelected: {
    opacity: 0.7,
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
