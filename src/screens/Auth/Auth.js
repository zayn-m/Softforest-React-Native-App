import React from "react";
import { View, Text, Image, StyleSheet, ScrollView,ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import Logo from "../../assets/logo.png";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {authSignin,authSignUp,authAutoSignIn} from '../../store/actions/index';
import validate from '../../utility/validation';

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

  componentDidMount(){
    if(!this.props.token && !this.props.userId){
      this.props.onAutoSignIn();
    }
    if(this.props.userId) {
      this.props.checkCart(this.props.userId,0);
      }
  }

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
    if(this.state.authMode==="login"){
      const data={
        username:this.state.controls.email.value,
        password:this.state.controls.password.value
      };
      this.props.onLogin(data);
    }else{
        const data={
          username:this.state.controls.username.value,
          email:this.state.controls.email.value,
          password:this.state.controls.password.value,
          occupation:"buyer",
          recommendations: {}
        }
        this.props.onSignUp(data);
    }
  };

  render() {
    let buttonDisable = true;
    
    if(this.state.authMode==="login"){
      if(this.state.controls.email.valid && this.state.controls.password.valid){
        buttonDisable = false;
      }
    }
    else if (this.state.authMode==="signup"){
      if(this.state.controls.username.valid &&
        this.state.controls.email.valid &&
        this.state.controls.password.valid && 
        this.state.controls.confirmPassword.valid){
          buttonDisable = false;
      }
    }
    let submitButton = (
      <Button
            title="Continue"
            color="#05C0BA"
            onPress={this.continueHandler}
            disabled={buttonDisable}
          />
    );
    if(this.props.loading){
      submitButton = <ActivityIndicator/>
    }
    else if(this.props.error ){
     
    }
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
              <Input placeholder="Username" 
                value={this.state.controls.username.value}
                valid={this.state.controls.username.valid}
                onChangeText={val=>this.updateInputState("username",val)}
                touched={this.state.controls.username.touched}
              />
              <Input placeholder="Email" 
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputState("email", val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
               autoCorrect={false}
               keyboardType="email-address"
               
              />
              <Input placeholder="Password" secureTextEntry 
                value={this.state.controls.password.value}
                onChangeText={val => this.updateInputState("password", val)}
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
              />
              <Input placeholder="Confirm Password" secureTextEntry 
              value={this.state.controls.confirmPassword.value}
              onChangeText={val =>
                this.updateInputState("confirmPassword", val)}
              valid={this.state.controls.confirmPassword.valid}
              touched={this.state.controls.confirmPassword.touched}/>
            </View>
          ) : (
            <View>
              <Input placeholder="Email"
               value={this.state.controls.email.value}
               onChangeText={val => this.updateInputState("email", val)}
               valid={this.state.controls.email.valid}
               touched={this.state.controls.email.touched}
               autoCapitalize="none"
               autoCorrect={false}
               keyboardType="email-address"
              />
              <Input placeholder="Password" secureTextEntry
                value={this.state.controls.password.value}
                onChangeText={val => this.updateInputState("password", val)}
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
        {submitButton}
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

const mapStateToProps = state => {
  return {
    loading :state.uiLoading.isLoading,
    error:state.auth.error,
  }
};

const mapDispatchToProps = dispatch =>{
  return {
    onLogin:(data)=>dispatch(authSignin(data)),
    onSignUp:(data)=>dispatch(authSignUp(data)),
    onAutoSignIn:()=>dispatch(authAutoSignIn())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);