import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import Logo from "../../assets/logo.png";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

class Auth extends React.Component {
  state = {
    authMode: "login",
    controls: {
      username: {
        value: "",
        valid: false,
        validationRules: {
          isUsername: true
        },
        touched: false
      },
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  continueHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={Logo} style={styles.imageContainer} />
        <View style={styles.welcomeTextContainer}>
          {this.state.authMode === "login" ? (
            <>
              <Text style={styles.welcomeText}>Welcome back</Text>

              <View>
                <Text>Log in to Softforest to pick up where you left off.</Text>
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          {this.state.authMode === "signup" ? (
            <View>
              <Input placeholder="Username" />
              <Input placeholder="Email" secureTextEntry />
              <Input placeholder="Password" />
              <Input placeholder="Confirm Password" secureTextEntry />
            </View>
          ) : (
            <View>
              <Input placeholder="Email" secureTextEntry />
              <Input placeholder="Password" />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            color="#05C0BA"
            onPress={this.continueHandler}
          />
        </View>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>
            Create new account?{" "}
            <Text style={styles.signup} onPress={this.switchAuthModeHandler}>
              {this.state.authMode === "login" ? "Sign Up" : "Login"}
            </Text>{" "}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  imageContainer: {
    width: "100%",
    height: 180,
    resizeMode: "contain"
  },
  welcomeTextContainer: {
    alignItems: "center"
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 22
  },
  inputContainer: {
    marginTop: 15
  },
  buttonContainer: {
    marginTop: 20
  },
  signupTextContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  signup: {
    fontWeight: "bold",
    color: "#05C0BA"
  }
});

export default Auth;
