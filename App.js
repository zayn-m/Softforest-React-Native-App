import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";
import BrowseScreen from "./src/screens/BrowseScreen/BrowseScreen";
import LibraryScreen from "./src/screens/LibraryScreen/LibraryScreen";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import ProjectDetailScreen from "./src/screens/ProjectDetailScreen/ProjectDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import AccountScreen from "./src/screens/AccountScreen/AccountScreen";
import CartScreen from "./src/screens/CartScreen/CartScreen";
import OrderScreen from "./src/screens/OrderScreen/OrderScreen";
import configStore from "./src/store/configStore";
import CheckoutScreen from "./src/screens/CheckoutScreen/CheckoutScreen";
const store = configStore();
// Register screen
Navigation.registerComponentWithRedux(
  "softforest.AuthScreen",
  () => AuthScreen,
  Provider,
  store
);
Navigation.registerComponent("softforest.SideDrawerScreen", () => SideDrawer);
Navigation.registerComponent("softforest.BrowseScreen", () => BrowseScreen);
Navigation.registerComponentWithRedux(
  "softforest.LibraryScreen",
  () => LibraryScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "softforest.ProjectDetailScreen",
  () => ProjectDetailScreen,
  Provider,
  store
);
Navigation.registerComponent("softforest.ProfileScreen", () => ProfileScreen);
Navigation.registerComponentWithRedux(
  "softforest.AccountScreen",
  () => AccountScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "softforest.CartScreen",
  () => CartScreen,
  Provider,
  store
);
Navigation.registerComponent("softforest.CheckoutScreen", () => CheckoutScreen);
Navigation.registerComponent("softforest.OrderScreen", () => OrderScreen);

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
