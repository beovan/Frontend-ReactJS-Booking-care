import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../utils";

import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";
import * as actions from "../../store/actions";
import Select from "react-select";
import { handleLoginApi } from "../../services/userService";
import { toast } from "react-toastify";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth, provider } from "../../config/firebase";
import _ from "lodash";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      isLoginFormOpen: false,
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  componentDidMount() {
    this.props.fetchAllDoctors();
  }
  toggleLoginForm = () => {
    this.setState((prevState) => ({
      isLoginFormOpen: !prevState.isLoginFormOpen,
    }));
  };

  componentDidwUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.allDoctors !== this.props.allDoctors) {
    //   let dataSelect = this.buildDataInputSelect(
    //     this.props.allDoctors,
    //     "USERS"
    //   );
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.PATIENT) {
        // menu = adminMenu;
      }

      if (role === USER_ROLE.DOCTOR) {
        // menu = doctorMenu;
      }
    }
  }
  // buildDataInputSelect = (inputData, type) => {
  //   let result = [];
  //   let { language } = this.props;
  //   if (inputData && inputData.length > 0) {
  //     if (type === "USERS") {
  //       inputData.map((item, index) => {
  //         let object = {};
  //         let labelVi = `${item.lastName} ${item.firstName}`;
  //         let labelEn = `${item.firstName} ${item.lastName}`;
  //         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
  //         object.value = item.id;
  //         result.push(object);
  //       });
  //     }
  //     if (type === "SPECIALTY") {
  //       inputData.map((item, index) => {
  //         let object = {};
  //         object.label = item.name;
  //         object.value = item.id;
  //         result.push(object);
  //       });
  //     }

  //     if (type === "CLINIC") {
  //       inputData.map((item, index) => {
  //         let object = {};
  //         object.label = item.name;
  //         object.value = item.id;
  //         result.push(object);
  //       });
  //     }
  //   }
  //   return result;
  // };

  changeToSearch = (change) => {
    this.props.history.push("/search-result");
  };

  handleOnchangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      if (this.state.username === "" || this.state.password === "") {
        this.setState({
          errMessage: "Please fill all fields",
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
          let data = await handleLoginApi({
            uid: user.uid,
            email: user.email,
            // accessToken: credential.accessToken,
          });
          if (data && data.errCode !== 0) {
            this.setState({
              errMessage: data.errMessage,
            });
          }
          console.log(this.state.errMessage);
          if (data && data.errCode === 0) {
            toast.success("login with google success!");
            this.props.userLoginSuccess(data.user);
            setInterval(() => {
              this.props.history.push("/home");
            }, 2000);
          }
        } catch (error) {
          console.error(error);
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

  handleShowhidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    const { processLogout, language, userInfo, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img
                className="header-logo"
                src={logo}
                alt=""
                onClick={() => this.returnToHome()}
              />
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                {/* <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.support" /> */}
                {isLoggedIn === false && (
                  <div className="login-wrapper">
                    <button id="login-button" onClick={this.toggleLoginForm}>
                      <FormattedMessage id="home-header.login" />
                    </button>
                    <div className="login-container">
                      <form
                        className={`login-form ${
                          this.state.isLoginFormOpen ? "open" : ""
                        }`}
                      >
                        <input
                          type="text"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={(event) =>
                            this.handleOnchangeUsername(event)
                          }
                        />
                        <div className="custom-input-password">
                          <input
                            placeholder="Password"
                            type={
                              this.state.isShowPassword ? "text" : "password"
                            }
                            onChange={(event) => {
                              this.handleOnchangePassword(event);
                            }}
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

                        <div className="col-12 center_forgot">
                          <span className="Change_link">
                            Don't have an account?
                            <a href="/register">Register</a>
                          </span>
                          <span>or</span>
                          <span className="forgot_password">
                            <a href="/forgot-password">Forgot password?</a>
                          </span>
                          <button
                            className="btn-login"
                            onClick={() => {
                              this.handleLogin();
                            }}
                          >
                            Login
                          </button>
                        </div>

                        <div className="col-12 social-login">
                          <span onClick={this.signInWithGoogle}>
                            {" "}
                            <i className="fab fa-google-plus-g google"></i>
                          </span>

                          {/* <i className="fab fa-facebook-f facebook"></i> */}
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {isLoggedIn === true && (
                  <div className="wrap-user-info">
                    <span className="welcome">
                      {userInfo && userInfo.firstName ? userInfo.firstName : ""}
                    </span>

                    <div className="dropdown-content">
                      <div className="item">
                        <a href="/user-profile">Profile</a>
                      </div>
                      {/* nút logout */}
                      <div className="item" onClick={processLogout}>
                        <a href="#">Logout</a>
                        {/* <i className="fas fa-sign-out-alt"></i> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                {" "}
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search" onClick={() => this.changeToSearch()}>
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm chuyên khoa khám bệnh"
                />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
