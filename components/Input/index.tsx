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
}

export const CustomInput = ({
  label,
  descriptionLabel,
  placeholder,
  keyboardType,
  maxLength,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.formInputContainer}>
      {label ? <Text style={styles.formInputLabel}>{label}</Text> : null}
      <TextInput
        style={[
          styles.formTextInput,
          isFocused
            ? styles.formInputFocusedColor
            : styles.formInputDefaultColor,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={`${placeholder || null}`}
        placeholderTextColor={COLORS.darkgray}
        keyboardAppearance="dark"
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {descriptionLabel ? (
        <Text style={styles.formInputDescriptionLabel}>{descriptionLabel}</Text>
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
  formInputDescriptionLabel: {
    ...FONTS.formDescriptionLabel,
    color: COLORS.darkgray2,
  },
});
