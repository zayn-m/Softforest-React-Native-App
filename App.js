import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";
import BrowseScreen from "./src/screens/BrowseScreen/BrowseScreen";
import LibraryScreen from "./src/screens/LibraryScreen/LibraryScreen";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

// Register screen
Navigation.registerComponent("softforest.AuthScreen", () => AuthScreen);
Navigation.registerComponent("softforest.SideDrawerScreen", () => SideDrawer);
Navigation.registerComponent("softforest.BrowseScreen", () => BrowseScreen);
Navigation.registerComponent("softforest.LibraryScreen", () => LibraryScreen);

// Start app
Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            name: "softforest.AuthScreen",
            passProps: {
              text: "stack with one child"
            }
          }
        }
      ],
      options: {
        topBar: {
          title: {
            text: "Log In"
          }
        }
      }
    }
  }
});
