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
import Video from "react-native-af-video-player";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { HOST_URL } from "../../settings";
import Icon from "react-native-vector-icons/Ionicons";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import Button from "../../components/UI/Button/Button";
import RecommendationItem from "../../components/RecommendationItem/RecommendationItem";

class ProjectDetailScreen extends React.Component {
  state = {
    project: null,
    profile: null,
    recommendations: null
  };

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      Navigation.pop(this.props.componentId); // works best when the goBack is async
      return true;
    });

    this.fetchData();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  fetchData = () => {
    fetch(`${HOST_URL}/projects-detail/${this.props.projectSlug}/`)
      .then(response => response.json())
      .then(responseJson => this.setState({ project: responseJson }))
      .catch(error => console.log(error));

    fetch(`${HOST_URL}/profiles/${this.props.userId}/`)
      .then(response => response.json())
      .then(responseJson => this.setState({ profile: responseJson }))
      .catch(error => console.log(error));

    fetch(
      `${HOST_URL}/projects-random-list/?q=${this.props.category}&id=${
        this.props.id
      }`
    )
      .then(response => response.json())
      .then(responseJson => this.setState({ recommendations: responseJson }))
      .catch(error => console.log(error));
  };

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

  selectProjectHandler = (slug, user, id, category) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "softforest.ProjectDetailScreen",
        passProps: {
          projectSlug: slug,
          userId: user,
          id: id,
          category: category
        }
      }
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.project &&
        this.state.profile &&
        this.state.recommendations ? (
          <>
            <View style={styles.thumbnailContainer}>
              <Image
                style={styles.thumbnail}
                source={{ uri: this.state.project.image }}
              />
            </View>
            <HeadingText>{this.state.project.title}</HeadingText>
            <View style={styles.subContainer}>
              <Text style={styles.description}>
                {this.state.project.description}
              </Text>
              <View style={styles.videoContainer}>
                <Video
                  url={this.state.project.video}
                  placeholder={this.state.project.image}
                  logo="logo"
                />
                {this.state.project.on_sale ? (
                  <View style={styles.priceContainer}>
                    <Text style={styles.discountText}>
                      ${this.state.project.discount_rate}{" "}
                      <Text style={styles.strike}>
                        {" "}
                        ${this.state.project.price}
                      </Text>
                    </Text>
                    <Text style={{ color: "#05C0BA" }}>
                      <Icon name="md-time" /> 30% off{" "}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>
                      ${this.state.project.price}
                    </Text>
                  </View>
                )}
                <View style={styles.buyButton}>
                  <Button title="Buy Now" color="#05C0BA" />
                </View>
                <View style={styles.addToCartButtonContainer}>
                  <Text style={styles.addToCartButton}>ADD TO CART</Text>
                </View>
              </View>
              <View style={styles.card}>
                <HeadingText>Modules</HeadingText>
                {this.state.project.modules.map(ml => (
                  <Text key={ml.id} style={styles.moduleText}>
                    <Icon name="md-checkmark" style={{ fontSize: 20 }} />{" "}
                    {ml.name}
                  </Text>
                ))}
              </View>
              <View style={styles.card}>
                <HeadingText>Technologies</HeadingText>
                {this.state.project.technologies.map(ml => (
                  <Text key={ml.id} style={styles.moduleText}>
                    <Icon name="md-checkmark" style={{ fontSize: 20 }} />{" "}
                    {ml.name}
                  </Text>
                ))}
              </View>
              <View style={styles.card}>
                <HeadingText>Requirements</HeadingText>
                {this.state.project.requirements.map(ml => (
                  <Text key={ml.id} style={styles.moduleText}>
                    <Icon name="md-checkmark" style={{ fontSize: 20 }} />{" "}
                    {ml.name}
                  </Text>
                ))}
              </View>
              <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={{ uri: this.state.profile.image }}
                    style={styles.profileImage}
                  />
                </View>
                <View style={styles.profileDescription}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {this.state.profile.profile_name}
                  </Text>
                  <Text>{this.state.profile.profile_title}</Text>
                  <View style={styles.requestButtonContainer}>
                    <Text style={styles.requestButton}>
                      Request for modifications
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <HeadingText>These might interest you</HeadingText>
                {this.state.recommendations.map(project => (
                  <RecommendationItem
                    key={project.id}
                    title={project.title}
                    image={project.image}
                    price={project.price}
                    ratings={project.ratings}
                    onSale={project.on_sale}
                    discountRate={project.discount_rate}
                    username={project.username}
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
                <View style={{ marginTop: 20 }} />
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0
  },
  thumbnailContainer: {
    width: "100%",
    height: 240,
    marginTop: 5
  },
  thumbnail: {
    flex: 1
  },
  subContainer: {
    margin: 10
  },
  description: {
    marginTop: 5,
    marginBottom: 20,
    justifyContent: "center",
    fontSize: 16
  },
  videoContainer: {
    backgroundColor: "white",
    elevation: 2
  },
  priceContainer: {
    marginLeft: 10
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10
  },
  discountText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10
  },
  strike: {
    fontSize: 18,
    marginTop: 10,
    color: "#aaa",
    textDecorationLine: "line-through"
  },
  buyButton: {
    marginTop: 10,
    marginBottom: 10
  },
  addToCartButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  addToCartButton: {
    color: "#05C0BA",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  card: {
    elevation: 2,
    marginTop: 10,
    backgroundColor: "white"
  },
  moduleText: {
    fontSize: 18,
    padding: 5,
    marginLeft: 10
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 2,
    width: "100%",
    height: 100,
    marginTop: 10
  },
  profileImageContainer: {
    flex: 0.5,
    resizeMode: "center"
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  profileDescription: {
    flex: 1
  },
  requestButtonContainer: {
    alignItems: "center",
    marginTop: 20
  },
  requestButton: {
    color: "#05C0BA",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default ProjectDetailScreen;
