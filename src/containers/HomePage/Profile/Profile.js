import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./Profile.scss";
import { Tabs, Tab } from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabChange: 'profile'
    };
  }

  handleSelect = (tabChange) => {
    this.setState({ tabChange });
  }

  render() {
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            <h3>Profile</h3>
            <div className="each-doctor">
              <div className="dt-content-left">
                <div className="profile-doctor">
                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    onSelect={this.handleSelect}
                  >
                    <Tab eventKey="profile" title="Profile" />
                    <Tab eventKey="bookings" title="Bookings" />
                  </Tabs>
                </div>
              </div>
              <div className="dt-content-right">
                {this.state.tabChange === 'profile' && (
                  <div className="doctor-schedule">
                    FDSAF
                  </div>
                )}
                {this.state.tabChange === 'bookings' && (
                  <div className="doctor-extra-infor">
                    FDSAFSD
                  </div>
                )}
              </div>
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
    // eslint-disable-next-line no-undef
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);