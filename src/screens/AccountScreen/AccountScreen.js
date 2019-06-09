import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class AccountScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textContainer}>Share our app</Text>
          <Text style={styles.textContainer}>Terms of use</Text>
          <Text style={styles.textContainer}>View Privacy Policy</Text>
          <TouchableOpacity>
            <View style={styles.authbuttonContainer}>
              <Text style={styles.authbutton}>sign in</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    elevation: 2,
    backgroundColor: "white"
  },
  textContainer: {
    padding: 8
  },
  authbuttonContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  authbutton: {
    color: "#05C0BA",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default AccountScreen;
