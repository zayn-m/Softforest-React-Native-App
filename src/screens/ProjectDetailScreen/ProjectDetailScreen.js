import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  BackHandler,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

import Icon from "react-native-vector-icons/Ionicons";

class ProjectDetailScreen extends React.Component {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      Navigation.pop(this.props.componentId); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
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
      <ScrollView style={styles.container}>
        <Text>{this.props.project}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  }
});

export default ProjectDetailScreen;
