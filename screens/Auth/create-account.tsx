import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";

export const CreateAccount = () => {
  return (
    <View>
      <Text style={styles.title}>Create account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: FONTS.h2,
});
