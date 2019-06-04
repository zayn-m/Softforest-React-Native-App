import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-star" : "ios-star", 30),
    Icon.getImageSource(Platform.OS === "android" ? "md-list" : "ios-list", 30),
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30),
    Icon.getImageSource(Platform.OS === "android" ? "md-cart" : "ios-cart", 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: "sideMenu",
          left: {
            component: {
              id: "Drawer",
              name: "softforest.SideDrawerScreen"
            }
          },
          center: {
            stack: {
              children: [
                {
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
                                color: "red"
                              },
                              leftButtons: [
                                {
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
                        stack: {
                          children: [
                            {
                              component: {
                                name: "softforest.LibraryScreen",
                                passProps: {
                                  text: "This is tab 2"
                                }
                              }
                            }
                          ],
                          options: {
                            topBar: {
                              title: {
                                text: "Library",
                                color: "red"
                              },
                              leftButtons: [
                                {
                                  icon: sources[2],
                                  id: "toggleDrawer"
                                }
                              ]
                            },
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
                                name: "softforest.LibraryScreen",
                                passProps: {
                                  text: "This is tab 2"
                                }
                              }
                            }
                          ],
                          options: {
                            topBar: {
                              title: {
                                text: "Cart",
                                color: "red"
                              },
                              leftButtons: [
                                {
                                  icon: sources[2],
                                  id: "toggleDrawer"
                                }
                              ]
                            },
                            bottomTab: {
                              text: "Cart",
                              icon: sources[3],
                              testID: "SECOND_TAB_BAR_BUTTON"
                            }
                          }
                        }
                      }
                    ]
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
