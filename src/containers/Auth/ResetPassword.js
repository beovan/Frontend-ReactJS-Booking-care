import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import "./ResetPassword.scss";
import { resetPassword } from "../../services/userService";  

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
    };
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    return (
      <div class="row-forgot">
        <h1>Reset Password</h1>
        <h6 class="information-text">
          Enter your new password and confirm it.
        </h6>
        <div class="form-group-reset">
          <input
            type="password"
            name="user_password"
            id="user_password"
            onChange={this.handlePasswordChange}
          />
          <p>
            <label for="user_password">New Password</label>
          </p>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            onChange={this.handleConfirmPasswordChange}
          />
          <p>
            <label for="confirm_password">Confirm Password</label>
          </p>
          <button>Reset Password</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);