import { AUTH_SUCCESS, AUTH_ERROR } from "./actionTypes";
import { HOST_URL } from "../../settings";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import { AsyncStorage } from "react-native";

export const authSuccess = (userId, token) => {
  return {
    type: AUTH_SUCCESS,
    userId: userId,
    token: token
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    error: error
  };
};

export const authSignin = data => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(HOST_URL + "/login/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        dispatch(uiStopLoading());
        dispatch(authError(err));
        console.log(err);
      })
      .then(res => res.json())
      .then(parseReq => {
        dispatch(uiStopLoading());
        if (!parseReq.token) {
          dispatch(authError(parseReq.non_field_errors));
          alert("Invalid Username / Password");
        } else if (parseReq.id && parseReq.token) {
          startMainTabs();
          dispatch(authSuccess(parseReq.id, parseReq.token));
          try {
            const expireIn = (new Date().getTime() + "3600") * 1000;
            AsyncStorage.setItem("idUser", parseReq.id.toString())
              .then(res => {
                if (res) {
                  console.log("UserID Save");
                }
              })
              .catch(err => console.log("IDDDD ERROR"));
            AsyncStorage.setItem("token", parseReq.token, () =>
              console.log(AsyncStorage.getItem("token"))
            );

            AsyncStorage.setItem("expireIn", expireIn.toString());
          } catch (error) {
            alert(error);
          }
        }
      });
  };
};

export const authSignUp = data => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(HOST_URL + "/register/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        dispatch(uiStopLoading());
        dispatch(authError(err));
      })
      .then(res => res.json())
      .then(parseReq => {
        dispatch(uiStopLoading());
        if (!parseReq.id) {
          dispatch(authError(parseReq.non_field_errors));
        } else {
          fetch(
            "http://ec2-13-59-248-140.us-east-2.compute.amazonaws.com/api/register/",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
            .catch(err => {
              dispatch(uiStopLoading());
              dispatch(authError(err));
              console.log(err);
            })
            .then(res => res.json())
            .then(parseReq => {
              if (!parseReq.id) {
                dispatch(authError(parseReq));
              } else {
                const loginData = {
                  username: data.email,
                  password: data.password
                };
                dispatch(authSignin(loginData));
              }
            });
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    let token = null;
    AsyncStorage.getItem("token")
      .then(res => {
        if (res) {
          token = res;
          return AsyncStorage.getItem("idUser");
        } else {
        }
      })
      .catch(err => console.log(err))
      .then(res => {
        if (res) {
          if (token && res) {
            startMainTabs();
            dispatch(authSuccess(res, token));
          }
        }
      })
      .catch(err => console.log(err));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("expireIn");
  };
};
