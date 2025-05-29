import React from "react";
import { TextInput, StyleSheet } from "react-native";

const FormInput = ({ value, onChangeText, placeholder, ...rest }) => {
  return (
    <TextInput
      style={styles.textField}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  textField: {
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 17,
    marginVertical: 10,
  },
});

export default FormInput;
