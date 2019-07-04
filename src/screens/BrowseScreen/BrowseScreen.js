import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions,
  Keyboard
} from "react-native";
import { SearchBar } from "react-native-elements";
import { HOST_URL } from "../../settings";
import { Navigation } from "react-native-navigation";
import Carousel from "react-native-snap-carousel";
import StarRating from "react-native-star-rating";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";

class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  state = {
    search: "",
    searchLoading: false,
    projects: [],
    popularProjects: [],
    refreshing: false,
    deviceWidth: Dimensions.get("window").width
  };

  componentDidMount() {
    console.disableYellowBox = true;
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    this.fetchData();
  }

  componentWillUnmount() {
    this.navigationEventListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
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
    Promise.all([
      fetch(HOST_URL + "/projects-cards/")
        .then(response => response.json())
        .then(responseJson => this.setState({ projects: responseJson }))
        .catch(error => console.log(error)),
      fetch(HOST_URL + "/projects-cards/?q=top-projects")
        .then(response => response.json())
        .then(responseJson =>
          this.setState({ popularProjects: responseJson, refreshing: false })
        )
        .catch(error => console.log(error))
    ]);
  };

  updateSearch = search => {
    this.setState({ search });
  };

  searchHandler = () => {
    this.setState({ searchLoading: true });
    Keyboard.dismiss;

    setTimeout(() => {
      fetch(`${HOST_URL}/projects/?q=${this.state.search}`)
        .then(response => response.json())
        .then(responseJson =>
          this.setState({ projects: responseJson, searchLoading: false })
        )
        .catch(error => console.log(error));
    }, 1000);
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
          <View>
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

  selectProjectHandler = (slug, user, id, category) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "softforest.ProjectDetailScreen",
        passProps: {
          projectSlug: slug,
          user: user,
          id: id,
          category: category
        },
        options: {
          topBar: {
            title: {
              text: ""
            },
            rightButtons: []
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
    const { search } = this.state;
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
        <View style={styles.searchContainer}>
          <SearchBar
            style={styles.search}
            placeholder="Search Here..."
            onChangeText={this.updateSearch}
            value={search}
            lightTheme={true}
            showLoading={this.state.searchLoading}
            platform="android"
            onSubmitEditing={this.searchHandler}
          />
        </View>
        {this.state.projects.length === 0 && (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#05C0BA" />
          </View>
        )}

        {this.state.popularProjects.length > 0 && (
          <>
            <Text style={styles.heading}>Top Rated Projects</Text>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.popularProjects}
              renderItem={this._renderItem}
              sliderWidth={this.state.deviceWidth}
              itemWidth={150}
              useScrollView={true}
              activeSlideAlignment="start"
            />
          </>
        )}

        {this.state.popularProjects.length > 0 &&
          this.state.projects.map(project => (
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
    marginTop: 14,
    marginLeft: 14,
    marginRight: 14
  },
  searchContainer: {
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 20
  },
  search: {},
  heading: {
    fontSize: 18,
    fontWeight: "bold"
  },
  indicatorContainer: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center"
  },

  slide: {
    marginTop: 22,
    marginBottom: 20,
    height: 170,
    backgroundColor: "white",
    elevation: 2
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
  }
});

export default BrowseScreen;
