import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { changeLanguageApp } from "../../../store/actions";
import { app, auth, provider } from "../../../config/firebase";

// import "./Login.scss";
import { toast } from "react-toastify";
import {
  handleLoginApi,
  createNewPatient,
} from "../../../services/userService";
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

  handleOnchangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleOnchangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
};

handleRegister = async () => {
    this.setState({
      errMessage: "",
    });

    // Check if password and confirmPassword are the same
    if (
      this.state.password === "" ||
      this.state.confirmPassword === "" ||
      this.state.username === ""
    ) {
      
      this.setState({
        errMessage: "Please fill all fields",
      });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
        this.setState({
            errMessage: "Passwords do not match",
        });
        return;
    }

    try {
      let data = await createNewPatient({
        email: this.state.username,
        password: this.state.password,
      });
      console.log(data);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      console.log(this.state.errMessage);
      if (data && data.errCode === 0) {
        toast.success("register success!");
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
      this.handleRegister();
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
            accessToken: credential.accessToken,
        });
          if (data && data.errCode !== 0) {
            this.setState({
              errMessage: data.errMessage,
            });
          }
          console.log(this.state.errMessage);
          if (data && data.errCode === 0) {
            toast.success("register with google success!");
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

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Register</div>
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
            <div className="col-12 form-group login-input">
              <label>Password Confirm:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm your password"
                  onChange={(event) => {
                    this.handleOnchangeConfirmPassword(event);
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
                  this.handleRegister();
                }}
              >
                Register
              </button>
            </div>
            <div className="col-12">
              <span className="forgot password">
                Do you already have an account?
                <a href="/login"> Log in</a>
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

              <i className="fab fa-facebook-f facebook"></i>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
