import React, {Component} from "react";
import {connect} from "react-redux";
import {push} from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../../store/actions";

import "./Login.scss";
import {handleLoginApi} from "../../../services/userService";
import {toast} from "react-toastify";

// import "./Login.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

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
  render() {
    // const { username, password, loginError } = this.state;
    // const { lang } = this.props;

    return (

      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login Admin</div>
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
            {/* <div className="col-12">
              <span className="forgot password">
                Don't have an account?
                <a href="/register">Register</a>
              </span>
            </div> */}
            {/* <div className="col-12 text-center">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <span onClick={this.signInWithGoogle}>
                {" "}
                <i className="fab fa-google-plus-g google"></i>
              </span>

                <span onClick={this.signInWithFacebook}>
                <i className="fab fa-facebook-f facebook"></i>

                </span>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
