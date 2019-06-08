import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Navigation } from "react-native-navigation";
import Carousel from "react-native-snap-carousel";
import { HOST_URL } from "../../settings";
import StarRating from "react-native-star-rating";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  state = {
    profile: null,
    projects: [],
    deviceWidth: Dimensions.get("window").width
  };

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      Navigation.pop(this.props.componentId); // works best when the goBack is async
      return true;
    });

    fetch(`${HOST_URL}/profiles/${this.props.userId}/`)
      .then(response => response.json())
      .then(responseJson => this.setState({ profile: responseJson }))
      .catch(error => console.log(error));

    setTimeout(() => {
      fetch(`${HOST_URL}/projects-cards/?user=${this.props.userId}`)
        .then(response => response.json())
        .then(responseJson => this.setState({ projects: responseJson }))
        .catch(error => console.log(error));
    }, 200);
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.navigationEventListener.remove();
  }

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

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() =>
            this.selectProjectHandler(
              item.slug,
              item.user,
              item.id,
              item.category
            )
          }
        >
          <View style={styles.thumnailContainer}>
            <Image style={styles.thumnail} source={{ uri: item.image }} />
          </View>
          <View style={styles.projectInfoContainer}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <View style={styles.ratingsContainer}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={+item.ratings}
                emptyStar={"md-star-outline"}
                iconSet={"Ionicons"}
                fullStar={"md-star"}
                halfStar={"md-star-half"}
                fullStarColor={"#f4bf00"}
                starSize={18}
              />
            </View>
            {item.on_sale ? (
              <View>
                <Text style={styles.discountText}>
                  ${item.discount_rate}{" "}
                  <Text style={styles.strike}> ${item.price}</Text>
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.priceText}>${item.price}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.profile && (
          <>
            <View style={styles.profileContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: this.state.profile.image }}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>
                  {this.state.profile.profile_name}
                </Text>
                <Text style={styles.title}>
                  {this.state.profile.profile_title}
                </Text>
                <Text style={styles.projectsCount}>
                  {this.state.projects.length} Projects
                </Text>
              </View>
            </View>
            {this.state.projects.length === 0 ? (
              <View style={styles.indicatorContainer}>
                <ActivityIndicator size="large" color="#05C0BA" />
              </View>
            ) : (
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.projects}
                renderItem={this._renderItem}
                sliderWidth={this.state.deviceWidth}
                itemWidth={150}
                useScrollView={true}
                activeSlideAlignment="start"
              />
            )}

            <View style={styles.overviewContainer}>
              <Text style={styles.overview}>{this.state.profile.overview}</Text>
            </View>
          </>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  profileContainer: {
    backgroundColor: "white",
    elevation: 1
  },
  imageContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  infoContainer: {
    alignItems: "center"
  },
  name: {
    padding: 3,
    fontSize: 18
  },
  title: {
    padding: 3,
    fontSize: 18,
    color: "#aaa"
  },
  projectsCount: {
    padding: 3,
    fontSize: 18,
    marginBottom: 15
  },
  slide: {
    marginTop: 22,
    height: 170,
    backgroundColor: "white",
    elevation: 5
  },
  thumnail: {
    width: "100%",
    height: 80
  },
  projectInfoContainer: {
    margin: 5
  },
  projectTitle: {
    fontSize: 16
  },
  ratingsContainer: {
    marginTop: 5,
    flexDirection: "row"
  },

  priceText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  discountText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  strike: {
    fontSize: 14,
    color: "#aaa",
    textDecorationLine: "line-through"
  },
  overviewContainer: {
    marginTop: 20,
    backgroundColor: "white",
    elevation: 2
  },
  overview: {
    margin: 10,
    fontSize: 18
  },
  indicatorContainer: {
    marginTop: 34
  }
});

export default ProfileScreen;
