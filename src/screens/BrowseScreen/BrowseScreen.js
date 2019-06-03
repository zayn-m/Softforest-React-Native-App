import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { Navigation } from "react-native-navigation";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import Logo from "../../assets/logo.png";

class BrowseScreen extends React.Component {
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

  selectProjectHandler = () => {
    console.log("pressed");
    Navigation.push(this.props.componentId, {
      component: {
        name: "softforest.ProjectDetailScreen",
        passProps: {
          project: "cafe"
        }
        // options: {
        //     topBar: {
        //         title: {
        //             text: 'Cafe Management System'
        //         }
        //     }
        // }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ProjectListItem image={Logo} onPress={this.selectProjectHandler} />
        <ProjectListItem image={Logo} />
        <ProjectListItem image={Logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  }
});

export default BrowseScreen;
