import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import App from "./App";
import configStore from "./src/store/configStore";

const store = configStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

//AppRegistry.registerComponent(appName, () => RNRedux);
Navigation.registerComponentWithRedux(
  `navigation.playground.WelcomeScreen`,
  () => RNRedux
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});
