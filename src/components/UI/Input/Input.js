import React from "react";
import { StyleSheet, TextInput } from "react-native";

const input = props => {
  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        props.style,
        !props.valid && props.touched ? styles.invalid : null
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    width: "100%"
  },
  invalid: {
    borderBottomColor: "red"
  }
});

export default input;
