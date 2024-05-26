import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import "./ForgotPassword.scss";
import { handleForgotPassword } from "../../services/userService";  
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  componentDidMount() {}


  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div class="row">
        <h1>Forgot Password</h1>
        <h6 class="information-text">
          Enter your registered email to reset your password.
        </h6>
        <div class="form-group-forgot">
          <input
            type="email"
            name="user_email"
            id="user_email"
          />
          <p>
            <label for="username">Email</label>
          </p>
          <button  >Reset Password</button>
        </div>
        <div class="footer">
          <h5>
            New here? <a href="#">Sign Up.</a>
          </h5>
          <h5>
            Already have an account? <a href="#">Sign In.</a>
          </h5>
        </div>
      </div>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
