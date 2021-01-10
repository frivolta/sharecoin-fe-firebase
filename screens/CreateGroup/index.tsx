import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { CustomInput } from "../../components/Input";
import { COLORS, FONTS } from "../../constants";
import Firebase from "../../firebase/config";
import { useFirebaseAuthContext } from "../../hooks/authentication";
import Dimensions from "../../constants/layout";
import { Group } from "../../types";

interface CreateGroupForm {
  name: string;
}

export const CreateGroup = () => {
  const { currentUser } = useFirebaseAuthContext();
  const navigation = useNavigation();

  const { control, handleSubmit, errors, reset } = useForm<CreateGroupForm>({
    mode: "onChange",
  });
  const [formError, setFormError] = React.useState(false);
  const [formErrorMessage, setFormErrorMessage] = React.useState<null | string>(
    null
  );

  const onSubmit = async (data: CreateGroupForm) => {
    try {
      const { name } = data;
      if (name && currentUser?.uid) {
        const group: Group = {
          name,
          createdBy: currentUser.uid,
          createdDate: Date.now().toLocaleString(),
          members: [currentUser.uid],
          expenses: null,
        };
        reset();
        await Firebase.firestore().collection("groups").add(group);
        navigation.navigate("Dashboard");
      }
      throw "Group name or user is not defined";
    } catch (error) {
      setFormError(true);
      setFormErrorMessage(error.message);
    }
  };

  const errorMessageElement =
    formError && formErrorMessage ? (
      <View style={{ borderBottomColor: COLORS.danger }}>
        <Text
          style={{
            marginTop: 16,
            color: COLORS.accent,
          }}
        >
          {formErrorMessage}
        </Text>
      </View>
    ) : null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Name</Text>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="Restaurant with friends"
              keyboardType="default"
              maxLength={250}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.name)}
              errorText={errors.name?.message}
            />
          )}
          name="name"
          rules={{
            required: { value: true, message: "Please enter a group name" },
            minLength: { value: 5, message: "Name too short" },
            maxLength: { value: 50, message: "Name too long" },
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
  title: {
    ...FONTS.h1,
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
});
