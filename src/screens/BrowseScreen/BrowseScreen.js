import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from "react-native";
import { HOST_URL } from "../../settings";
import { Navigation } from "react-native-navigation";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";

class BrowseScreen extends React.Component {
  state = {
    projects: [],
    refreshing: false
  };

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.fetchData();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  };

  navigationButtonPressed = event => {
    if (event.buttonId === "toggleDrawer") {
      Navigation.mergeOptions("Drawer", {
        sideMenu: {
          right: {
            visible: true
          }
        }
      });
    }
  };

  fetchData = () => {
    fetch(HOST_URL + "/projects-cards/")
      .then(response => response.json())
      .then(responseJson =>
        this.setState({ projects: responseJson, refreshing: false })
      )
      .catch(error => console.log(error));
  };

  selectProjectHandler = (slug, user, id, category) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "softforest.ProjectDetailScreen",
        passProps: {
          projectSlug: slug,
          userId: user,
          id: id,
          category: category
        },
        options: {
          topBar: {
            title: {
              text: ""
            }
          }
        }
      }
    });
    Navigation.setDefaultOptions({
      topBar: {
        backButton: {
          color: "white"
        }
      }
    });
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.projects.length === 0 && (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#05C0BA" />
          </View>
        )}

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
              this.selectProjectHandler(
                project.slug,
                project.user,
                project.id,
                project.category
              )
            }
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 14
  },
  indicatorContainer: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default BrowseScreen;
