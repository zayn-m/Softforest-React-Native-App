import React from "react";
import { StyleSheet, Button, TouchableHighlight } from "react-native";

const button = props => {
  const content = (
    <Button
      {...props}
      style={[styles.btn, props.style, props.disabled ? styles.disabled : null]}
    />
  );

  if (props.disabled) {
    return content;
  }

  return <TouchableHighlight>{content}</TouchableHighlight>;
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#05C0BA"
  },
  disabled: {
    backgroundColor: "#eee"
  }
});

export default button;
