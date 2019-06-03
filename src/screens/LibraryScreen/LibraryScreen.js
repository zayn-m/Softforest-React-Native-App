import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

import Icon from "react-native-vector-icons/Ionicons";

class LibraryScreen extends React.Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = event => {
    if (event.buttonId === "toggleDrawer") {
      Navigation.mergeOptions("Drawer", {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>LibraryScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  }
});

export default LibraryScreen;
