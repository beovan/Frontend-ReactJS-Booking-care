import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";
import * as actions from "../../store/actions";
import Select from "react-select";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedOption: "",
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.allDoctors !== this.props.allDoctors) {
    //   let dataSelect = this.buildDataInputSelect(
    //     this.props.allDoctors,
    //     "USERS"
    //   );
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
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
  render() {
    let language = this.props.language;
    // console.log("check statefdsaf", this.state);
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
                      <input type="text" placeholder="Username" />
                      <input type="password" placeholder="Password" />
                      <input type="submit" value="SUBMIT" />
                    </form>
                  </div>
                </div>
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
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
