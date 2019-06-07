import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../../assets/logo.png";
import Hr from "../../components/UI/Hr/Hr";

class SideDrawer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <Hr />
          <View style={styles.drawerItem}>
            <Icon
              name={
                Platform.OS === "android" ? "md-help-circle" : "ios-help-circle"
              }
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Support</Text>
          </View>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-share" : "ios-share"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Share our Softforest app</Text>
          </View>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  drawerItemIcon: {
    marginRight: 10
  },
  logoContainer: {
    width: 150,
    height: 100,
    padding: 10
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default SideDrawer;
