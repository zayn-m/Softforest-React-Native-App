import React from "react";
import { StyleSheet, Text } from "react-native";

const headingText = props => {
  return (
    <Text {...props} style={[styles.headingText, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headingText: {
    color: "black",
    fontSize: 22,
    padding: 10
  }
});

export default headingText;
