import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../../store/actions";
import "./ResetPassword.scss";
import { handleResetPassword } from "../../../services/userService";  
import { withRouter } from 'react-router-dom';

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
  async componentDidMount() {
    
  }
  handleResetPassword = async () => {
    if (!this.state.password || this.state.password === "") {
      alert("Please enter your password.");
      return;
    }
    else if (!this.state.confirmPassword || this.state.confirmPassword === "") {
      alert("Please enter your confirm password.");
      return;
    }
    else if (this.state.password !== this.state.confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }


      
    let urlParams = new URLSearchParams(this.props.location.search);
    let token = urlParams.get("token");
    let password = this.state.password;
    let res = await handleResetPassword({
      accessToken: token,
      password: password,
    });

    console.log(res && res.errCode === 0)
    if (res && res.errCode === 0) {
      alert("Password has been reset");
      this.setState({
        errCode: res.errCode,
        errMessage: "Password has been reset"
      });
      this.props.history.push("/home");
    } else {
      this.setState({
        errCode: res && res.errCode ? res.errCode : -1,
        errMessage: res && res.errMessage ? res.errMessage : "An error occurred while resetting password"
      });
    }
  }
  
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
          <button onClick={this.handleResetPassword}>Reset Password</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));