import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-list" : "ios-list", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-folder" : "ios-folder",
      30
    ),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-funnel" : "ios-funnel",
      30
    ),
    Icon.getImageSource(Platform.OS === "android" ? "md-cart" : "ios-cart", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-contact" : "ios-contact",
      30
    )
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: "sideMenu",
          right: {
            component: {
              id: "Drawer",
              name: "softforest.SideDrawerScreen"
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "softforest.BrowseScreen",
                          passProps: {
                            text: "This is tab 1"
                          }
                        }
                      }
                    ],
                    options: {
                      topBar: {
                        title: {
                          text: "Browse",
                          color: "white"
                        },
                        background: {
                          color: "#05C0BA"
                        },
                        rightButtons: [
                          {
                            color: "white",
                            icon: sources[2],
                            id: "toggleDrawer"
                          }
                        ]
                      },
                      bottomTab: {
                        text: "Browse",
                        icon: sources[0],
                        testID: "FIRST_TAB_BAR_BUTTON"
                      }
                    }
                  }
                },
                {
                  component: {
                    name: "softforest.LibraryScreen",
                    passProps: {
                      text: "This is tab 2"
                    },
                    options: {
                      bottomTab: {
                        text: "Library",
                        icon: sources[1],
                        testID: "SECOND_TAB_BAR_BUTTON"
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "softforest.CartScreen",
                          passProps: {
                            text: "This is tab 3"
                          }
                        }
                      }
                    ],
                    options: {
                      topBar: {
                        title: {
                          text: "Cart",
                          color: "white"
                        },
                        background: {
                          color: "#05C0BA"
                        }
                      },
                      bottomTab: {
                        text: "Cart",
                        icon: sources[3],
                        testID: "THIRD_TAB_BAR_BUTTON"
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "softforest.AccountScreen",
                          passProps: {
                            text: "This is tab 4"
                          }
                        }
                      }
                    ],
                    options: {
                      topBar: {
                        title: {
                          text: "Account",
                          color: "white"
                        },
                        background: {
                          color: "#05C0BA"
                        }
                      },
                      bottomTab: {
                        text: "Account",
                        icon: sources[4],
                        testID: "FOURTH_TAB_BAR_BUTTON"
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    });
  });
};

export default startTabs;
