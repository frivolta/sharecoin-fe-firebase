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
import { loginSchema } from "../../constants/validationSchemas";
import Firebase from "../../firebase/config";
import { useFirebaseAuthContext } from "../../hooks/authentication";

type LoginFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigation = useNavigation();
  const {
    isLoading,
    isUserSignedIn,
    authStatusReported,
    currentUser,
  } = useFirebaseAuthContext();

  React.useEffect(() => {
    console.log(
      `${isLoading}, ${isUserSignedIn}, ${authStatusReported}, ${currentUser}`
    );
  }, [currentUser]);

  const { control, handleSubmit, errors } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState<
    null | string
  >(null);
  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data;
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoginError(true);
      setLoginErrorMessage(error.message);
    }
  };

  const errorMessageElement =
    loginError && loginErrorMessage ? (
      <View style={{ borderBottomColor: COLORS.danger }}>
        <Text
          style={{
            marginTop: 16,
            color: COLORS.accent,
          }}
        >
          {loginErrorMessage}
        </Text>
      </View>
    ) : null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
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
        {errorMessageElement}
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <CustomButton
          label="Log in"
          onPress={handleSubmit(onSubmit)}
          shadows={Shadows.BIG}
          buttonType={ButtonType.PRIMARY}
          buttonSize={ButtonSize.BIG}
          outlined={false}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Create Account")}>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: COLORS.accent }}
        >
          <Text
            style={{
              marginTop: 16,
              color: COLORS.accent,
            }}
          >
            I don't have an account
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
