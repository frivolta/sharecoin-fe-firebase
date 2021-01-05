import * as React from "react";
import { Title } from "react-native-paper";
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Divider,
  Headline,
  Subheading,
  Text,
  TextInput,
} from "react-native-paper";

export const CreateAccount = () => {
  return (
    <View style={styles.mainConainer}>
      <Title>Create account</Title>
    </View>
  );
};
const styles = StyleSheet.create({
  mainConainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
