import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { StyleSheet } from "react-native";

interface TextInputProps {
  label?: string;
  descriptionLabel?: string;
  placeholder?: string;
  keyboardType: "default" | "number-pad" | "numeric" | "email-address";
  maxLength: number;
  secureTextEntry?: boolean;
  hasError?: boolean;
  errorText?: string;
  onBlur?: () => void;
  onChangeText?: (...event: any[]) => void;
  value?: any;
  ref?: React.RefObject<HTMLInputElement>;
}

export const CustomInput = ({
  label,
  descriptionLabel,
  placeholder,
  keyboardType,
  maxLength,
  secureTextEntry,
  errorText,
  hasError,
  onBlur,
  onChangeText,
  value,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur;
  };

  return (
    <View style={styles.formInputContainer}>
      {label ? <Text style={styles.formInputLabel}>{label}</Text> : null}
      <TextInput
        style={[
          styles.formTextInput,
          isFocused && !hasError
            ? styles.formInputFocusedColor
            : styles.formInputDefaultColor,
          hasError ? styles.formInputDangerColor : null,
        ]}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        placeholder={`${placeholder || null}`}
        placeholderTextColor={COLORS.darkgray}
        keyboardAppearance="dark"
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry ? true : false}
        onChangeText={onChangeText}
      />
      {descriptionLabel ? (
        <Text style={styles.formInputDescriptionLabel}>{descriptionLabel}</Text>
      ) : null}
      {hasError && errorText ? (
        <Text style={[styles.formInputDescriptionLabel, styles.dangerText]}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formInputContainer: { marginVertical: 6 },
  formInputLabel: {
    ...FONTS.formLabel,
    color: COLORS.darkgray,
    marginBottom: 4,
  },
  formTextInput: {
    color: COLORS.white,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    ...FONTS.body4,
  },

  formInputDefaultColor: {
    borderColor: COLORS.darkgray2,
  },
  formInputFocusedColor: {
    borderColor: COLORS.accent,
  },
  formInputDangerColor: {
    borderColor: COLORS.danger,
  },
  formInputDescriptionLabel: {
    ...FONTS.formDescriptionLabel,
    color: COLORS.darkgray2,
  },
  dangerText: {
    color: COLORS.danger,
  },
});
