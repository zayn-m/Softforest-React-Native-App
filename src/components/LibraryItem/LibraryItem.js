import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const libraryItem = props => {
  return (
    <View {...props}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={props.viewHandler}>
              <Text style={styles.viewButton}>view</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.reviewHandler}>
              <Text style={styles.reviewButton}>review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    width: "100%",
    height: 50,
    elevation: 2,
    marginBottom: 10,
    padding: 5
  },
  textContainer: {
    flex: 1,
    flexDirection: "row"
  },
  title: {
    fontSize: 18,
    margin: 5
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  viewButton: {
    padding: 5,
    color: "#05C0BA",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  reviewButton: {
    padding: 5,
    color: "#05C0BA",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default libraryItem;
