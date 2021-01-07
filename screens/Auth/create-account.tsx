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

//@ToDo: Password mask, I already have an account, checkbox terms, when focus user should see the input

export const CreateAccount = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.body}>Fill out the form below</Text>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder="Nickname"
          descriptionLabel="This is what other users will see"
          keyboardType="default"
          maxLength={25}
        />
        <CustomInput
          placeholder="info@youremail.com"
          keyboardType="email-address"
          maxLength={125}
        />
        <CustomInput
          placeholder="Password"
          keyboardType="default"
          maxLength={250}
          secureTextEntry
        />
        <CustomInput
          placeholder="Confirm Password"
          keyboardType="default"
          maxLength={250}
          secureTextEntry
          hasError={true}
          errorText="Email already in use"
        />
      </View>
      <View style={{ alignSelf: "stretch" }}>
        <CustomButton
          label="Sign up"
          onPress={() => console.log("Signing up")}
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
