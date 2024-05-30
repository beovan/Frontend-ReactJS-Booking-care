import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../../store/actions";
import "./ForgotPassword.scss";
import { handleForgotPassword } from "../../../services/userService";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }


  
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleResetPassword = async () => {
    if (this.state.email === "") {
      alert("Please fill in your email.");
      return;
    }
    try {
      if (this.state.email) {
        const response = await handleForgotPassword({ email: this.state.email });
        if (response && response.status === 200) {
          alert('Please check your email to reset your password!');
          return response;
        } else if (response) {
          alert(`Received response with status code ${response.status}`);
        } else {
          alert('No response received from server');
        }

      }
    
    } catch (error) {
      alert('An error occurred while resetting password');
      console.log("handleResetPassword -> error", error);
    }
  };

  render() {
    return (
      <div class="row-forgot">
        <h1>Forgot Password</h1>
        <h6 class="information-text">
          Enter your registered email to reset your password.
        </h6>
        <div class="form-group-forgot">
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
        {/* <div class="footer">
          <h5>
            New here? <a href="#">Sign Up.</a>
          </h5>
          <h5>
            Already have an account? <a href="#">Sign In.</a>
          </h5>
        </div> */}
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