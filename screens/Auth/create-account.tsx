import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StyleSheet } from "react-native";
import {
  ButtonSize,
  ButtonType,
  CustomButton,
  Shadows,
} from "../../components/Button";
import { COLORS, FONTS, SHADOWS } from "../../constants";
import Dimensions from "../../constants/layout";
const backgroundImage = require("../../assets/images/app-bg.png");

export const CreateAccount = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.title}>ShareCoin</Text>
        <Text style={styles.body}>
          Keep bills and expenses splitting under control between you and a
          partner, friend, family member...
        </Text>
        <View style={{ alignSelf: "stretch" }}>
          <CustomButton
            label="Join for FREE"
            onPress={() => console.log("press")}
            shadows={Shadows.BIG}
            buttonType={ButtonType.PRIMARY}
            buttonSize={ButtonSize.BIG}
            outlined={false}
          />
          <CustomButton
            label="I already have an account"
            onPress={() => console.log("press")}
            shadows={Shadows.NONE}
            buttonType={ButtonType.PRIMARY}
            buttonSize={ButtonSize.BIG}
            outlined
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: Dimensions.window.width * 0.1,
  },
  appButtonContainer: {
    alignSelf: "stretch",
    marginTop: 32,
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    ...SHADOWS.bigShadow,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
