import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";

// Register screen
Navigation.registerComponent("softforest.AuthScreen", () => AuthScreen);

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
