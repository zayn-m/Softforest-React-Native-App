import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { authClearStorage } from "../../store/actions/index";
import RNRestart from "react-native-restart";

class AccountScreen extends React.Component {
  logout = () => {
    this.props.logout();
    RNRestart.Restart();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textContainer}>Share our app</Text>
          <Text style={styles.textContainer}>Terms of use</Text>
          <Text style={styles.textContainer}>View Privacy Policy</Text>
          <TouchableOpacity onPress={this.logout}>
            <View style={styles.authbuttonContainer}>
              <Text style={styles.authbutton}>sign out</Text>
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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authClearStorage())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AccountScreen);
