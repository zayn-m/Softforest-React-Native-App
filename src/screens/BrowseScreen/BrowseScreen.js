import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { HOST_URL } from "../../settings";
import { Navigation } from "react-native-navigation";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import Logo from "../../assets/logo.png";

class BrowseScreen extends React.Component {
  state = {
    projects: []
  };

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.fetchData();
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

  fetchData = () => {
    fetch(HOST_URL + "/projects-cards/")
      .then(response => response.json())
      .then(responseJson => this.setState({ projects: responseJson }))
      .catch(error => console.log(error));
  };

  selectProjectHandler = (slug, user) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "softforest.ProjectDetailScreen",
        passProps: {
          projectSlug: slug,
          userId: user
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
        {this.state.projects.map(project => (
          <ProjectListItem
            key={project.id}
            title={project.title}
            image={project.image}
            price={project.price}
            ratings={project.ratings}
            onSale={project.on_sale}
            discountRate={project.discount_rate}
            onPress={() =>
              this.selectProjectHandler(project.slug, project.user)
            }
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 14
  }
});

export default BrowseScreen;
