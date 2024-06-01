import React, { Component, useState } from "react";
import { connect } from "react-redux";

import HomeHeader from "../../HomePage/HomeHeader";
import "./Profile.scss";
import { Tabs, Tab } from "react-bootstrap";
import moment from "moment";
import Datetime from "react-datetime";
import "moment/locale/vi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import "./datePicker.scss";
import "./react-dateTime.css";
import "./CardCoverPhoto.scss";
import ProfileCover from "../../../assets/images/profile-cover.jpg";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import _ from "lodash";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabChange: "profile",
      birthday: "",
      userInfo: {},
    };
  }

  handleSelect = (tabChange) => {
    this.setState({ tabChange });
  };

  setBirthday = (birthday) => {
    this.setState({ birthday });
  };

  componentDidMount() {
    let { userInfo } = this.props;
    this.setState({
      userInfo: userInfo,
    });
    moment.locale("vi");
  }

  componentDidUpdate(prevProps) {
    if (this.props.userInfo !== prevProps.userInfo) {
      this.setState({
        userInfo: this.props.userInfo,
      });
    }
  }
  render() {
    let { userInfo } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            <h3>Profile</h3>
            <div className="each-doctor">
              <div className="dt-content-left">
                <div className="profile-doctor">
                  <Card border="light" className="text-center p-0 mb-4">
                    <div
                      style={{ backgroundImage: `url(${ProfileCover})` }}
                      className="profile-cover rounded-top"
                    />
                    <Card.Body className="pb-5">
                      {userInfo && !_.isEmpty(userInfo) && userInfo.image ? (
                        <>
                          <Card.Img
                            style={{ width: "50px", height: "50px" }}
                            src={userInfo.image}
                            alt="Thông tin người dùng"
                            className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                          />
                          <Card.Title>{userInfo.firstName}</Card.Title>
                        </>
                      ) : null}

                      {/* <Card.Subtitle className="fw-normal">
                        Senior Software Engineer
                      </Card.Subtitle>
                      <Card.Text className="text-gray mb-4">
                        New York, USA
                      </Card.Text> */}

                      {/* <Button variant="primary" size="sm" className="me-2">
                        <FontAwesomeIcon icon={} className="me-1" />{" "}
                        Connect
                      </Button>
                      <Button variant="secondary" size="sm">
                        Send Message
                      </Button> */}
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="dt-content-right">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  onSelect={this.handleSelect}
                >
                  <Tab eventKey="profile" title="Profile" />
                  <Tab eventKey="bookings" title="Bookings" />
                </Tabs>
                {this.state.tabChange === "profile" && (
                  <div className="doctor-schedule">
                    <Card border="light" className="bg-white shadow-sm mb-4">
                      <Card.Body>
                        <h5 className="mb-4">General information</h5>
                        <Form>
                          <Row>
                            <Col md={6} className="mb-3">
                              <Form.Group id="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  // value={
                                  //   userInfo ? userInfo.firstName : ""
                                  // }
                                  type="text"
                                  placeholder="Enter your first name"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Group id="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  // value={
                                  //   userInfo.lastName ? userInfo.lastName : ""
                                  // }
                                  type="text"
                                  placeholder="Also your last name"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                              <Form.Group id="birthday">
                                <Form.Label>Birthday</Form.Label>
                                <Datetime
                                  locale="vi" // Set the locale directly on the Datetime component
                                  timeFormat={false}
                                  onChange={(date) => this.setBirthday(date)}
                                  renderInput={(props, openCalendar) => (
                                    <InputGroup>
                                      <InputGroup.Text>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="text"
                                        value={
                                          this.state.birthday
                                            ? moment(
                                                this.state.birthday
                                              ).format("MM/DD/YYYY")
                                            : ""
                                        }
                                        placeholder="mm/dd/yyyy"
                                        onFocus={openCalendar}
                                        onChange={() => {}}
                                      />
                                    </InputGroup>
                                  )}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Group id="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue="0">
                                  <option value="0">Gender</option>
                                  <option value="F">Female</option>
                                  <option value="M">Male</option>
                                  <option value="O">Other</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6} className="mb-3">
                              <Form.Group id="emal">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Enter your email address"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Group id="phone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="+12-345 678 910"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <h5 className="my-4">Address</h5>
                          <Row>
                            <Col sm={9} className="mb-3">
                              <Form.Group id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter your home address"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="mt-3">
                            <Button variant="primary" type="submit">
                              Save All
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                )}
                {this.state.tabChange === "bookings" && (
                  <div className="doctor-extra-infor">FDSAFSD</div>
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
    userInfo: state.user.userInfo,
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
