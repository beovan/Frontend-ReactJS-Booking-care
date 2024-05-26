import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions";
import "./ForgotPassword.scss";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  componentDidMount() {}

  handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, this.state.email);
      alert('Please check your email...');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          alert('The email address is not valid.');
          break;
        case 'auth/user-not-found':
          alert('There is no user corresponding to the given email.');
          break;
        case 'auth/expired-action-code':
        case 'auth/invalid-action-code':
          alert('The password reset link has expired or has already been used. Please request a new one.');
          break;
        default:
          alert(error.message);
      }
    }
  };

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
        <div class="form-group">
          <input
            type="email"
            name="user_email"
            id="user_email"
            onChange={this.handleEmailChange}
          />
          <p>
            <label for="username">Email</label>
          </p>
          <button onClick={this.handleResetPassword}>Reset Password</button>
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
