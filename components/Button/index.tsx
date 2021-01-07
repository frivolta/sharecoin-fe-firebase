import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONTS, SHADOWS } from "../../constants";
import Dimensions from "../../constants/layout";

export enum Shadows {
  BIG = "BIG",
  NONE = "NONE",
}

export enum ButtonType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  OUTLINED_PRIMARY = "OUTLINED_PRIMARY",
}

export enum ButtonSize {
  BIG = "BIG",
}

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  shadows: Shadows;
  buttonType: ButtonType;
  buttonSize: ButtonSize;
  outlined: boolean;
}

export const CustomButton = ({
  label,
  onPress,
  shadows,
  buttonType,
  buttonSize,
  outlined,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.appButtonContainer,
        shadows === Shadows.BIG && styles.bigShadow,
        buttonType === ButtonType.PRIMARY ? styles.primary : styles.secondary,
        outlined && styles.outlinedPrimary,
      ]}
    >
      <View>
        <Text style={styles.appButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 32,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  bigShadow: {
    ...SHADOWS.bigShadow,
  },
  outlinedPrimary: { backgroundColor: "transparent", borderWidth: 2 },
  primary: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  secondary: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  appButtonText: {
    ...FONTS.button,
    color: COLORS.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
