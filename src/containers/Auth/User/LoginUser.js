import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { changeLanguageApp } from "../../../store/actions";
import { app, auth, provider } from "../../../config/firebase";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import * as actions from "../../../store/actions";
// import "./Login.scss";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import {
  createNewPatient,
  handleLoginApi,
} from "../../../services/userService";
import "./LoginUser.scss";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      confirmPassword: "",
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        // menu = adminMenu;
      }

      if (role === USER_ROLE.DOCTOR) {
        // menu = doctorMenu;
      }
      if (role === USER_ROLE.PATIENT) {
        menu = [];
        this.props.history.push("/home");
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  handleOnchangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleOnchangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleShowhidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      if (this.state.username === "" || this.state.password === "") {
        this.setState({
          errMessage: "Please fill all fields ",
        });
        return;
      }
      let data = await handleLoginApi({
        email: this.state.username,
        password: this.state.password,
      });
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        toast.success("Login success!");
        setInterval(() => {
          this.props.history.push("/home");
        }, 2000);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };
  signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          console.log(result);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log(credential);
          const token = credential.accessToken;
          const user = result.user;

          // Access the user's name
          let data = await createNewPatient({
            uid: user.uid,
            email: user.email,
            firstName: user.displayName,
            image: user.photoURL,
            // accessToken: credential.accessToken,
          });
          console.log(data);
          if (data && data.errCode !== 0) {
            this.setState({
              errMessage: data.errMessage,
            });
            if (
              this.state.errMessage ===
              "Your email is already in used. Please try another email"
            ) {
              if (data) {
                let data = await handleLoginApi({
                  uid: user.uid,
                  email: user.email,
                  // accessToken: credential.accessToken,
                });
                this.props.userLoginSuccess(data.user);
                this.props.history.push("/home");
              }
            }
          }

          console.log(this.state.errMessage);
          if (data && data.errCode === 0) {
            toast.success("Login with google success!");
            this.props.userLoginSuccess(data.user);
            setInterval(() => {
              this.props.history.push("/home");
            }, 2000);
          }
        } catch (error) {
          console.log("error");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  render() {
    return (
      <div className="register-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(event) => {
                    this.handleOnchangePassword(event);
                  }}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowhidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot password">
                Don't have an account?
                <a href="/register">Register</a>
              </span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <span onClick={this.signInWithGoogle}>
                {" "}
                <i className="fab fa-google-plus-g google"></i>
              </span>

              {/* <span onClick={this.signInWithFacebook}>
                <i className="fab fa-facebook-f facebook"></i>

                </span> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
