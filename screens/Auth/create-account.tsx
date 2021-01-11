import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StyleSheet } from "react-native";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { COLORS, FONTS } from "../../constants";
import Dimensions from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../../components/Input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccountSchema } from "../../constants/validationSchemas";
import Firebase from "../../firebase/config";

//@ToDo: checkbox terms, verification, submit

type CreateAccountFormData = {
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const CreateAccount = () => {
  const navigation = useNavigation();
  const [signUpError, setSignUpError] = React.useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = React.useState<
    null | string
  >(null);
  const { control, handleSubmit, errors } = useForm<CreateAccountFormData>({
    resolver: yupResolver(createAccountSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      const { email, password, nickName } = data;
      const user = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      await user.user?.updateProfile({ displayName: nickName });
      await Firebase.firestore().collection("users").doc(user.user?.uid).set({
        displayName: nickName,
        email,
        photoUrl: null,
        memberof: [],
        invitations: [],
      });
    } catch (error) {
      setSignUpError(true);
      setSignupErrorMessage(error.message);
    }
  };

  const errorMessageElement =
    signUpError && signupErrorMessage ? (
      <View style={{ borderBottomColor: COLORS.danger }}>
        <Text
          style={{
            marginTop: 16,
            color: COLORS.accent,
          }}
        >
          {signupErrorMessage}
        </Text>
      </View>
    ) : null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.body}>Fill out the form below</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="Nickname"
              descriptionLabel="This is what other users will see"
              keyboardType="default"
              maxLength={25}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.nickName)}
              errorText={errors.nickName?.message}
            />
          )}
          name="nickName"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="info@youremail.com"
              keyboardType="email-address"
              maxLength={125}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.email)}
              errorText={errors.email?.message}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="Password"
              keyboardType="default"
              maxLength={250}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.password)}
              errorText={errors.password?.message}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              placeholder="Confirm Password"
              keyboardType="default"
              maxLength={250}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              hasError={!!(errors && errors.confirmPassword)}
              errorText={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
          rules={{ required: true }}
          defaultValue=""
        />
        {errorMessageElement}
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <CustomButton
          label="Sign up"
          onPress={handleSubmit(onSubmit)}
          shadows={Shadows.BIG}
          buttonType={ButtonType.PRIMARY}
          buttonSize={ButtonSize.BIG}
          outlined={false}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: COLORS.accent }}
        >
          <Text
            style={{
              marginTop: 16,
              color: COLORS.accent,
            }}
          >
            I already have an account
          </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  formContainer: {
    alignSelf: "stretch",
  },
  title: {
    ...FONTS.h1,
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
  body: {
    ...FONTS.body3,
    textAlign: "center",
    color: COLORS.darkgray2,
    marginBottom: 16,
  },
});
