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
  Nav,
  Pagination,
  Table,
} from "@themesberg/react-bootstrap";
import "./datePicker.scss";
import "./react-dateTime.css";
import "./CardCoverPhoto.scss";
import ProfileCover from "../../../assets/images/profile-cover.jpg";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import _ from "lodash";
import {
  getBookingByUserId,
  getProfileDoctorById,
  getScheduleDoctorByDate,
} from "../../../services/userService";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabChange: "profile",
      birthday: "",
      userInfo: {},
      bookings: {},
      doctorInfor: {},
      timeType: "",
      doctorId: "",
    };
  }

  handleSelect = (tabChange) => {
    this.setState({ tabChange });
  };

  setBirthday = (birthday) => {
    this.setState({ birthday });
  };

  async componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo && userInfo.id) {
      console.log("userInfo", userInfo);
      const res = await getBookingByUserId({ userId: userInfo.id });
      const doctorId = await getProfileDoctorById(res.data.doctorId);
      const timeTypePatient = await getScheduleDoctorByDate(
        res.data.doctorId,
        res.data.date
      );
      console.log("fdsfsds", timeTypePatient.data);

      this.setState({
        userInfo,
        bookings: res.data,
        doctorInfor: doctorId.data,
        timeType: timeTypePatient.data,
      });
    }
    // if (userInfo && userInfo.id) {
    //   this.setState({ doctorInfor: doctorId.data });
    // }
    moment.locale("vi");
  }

  async componentDidUpdate(prevProps) {
    const { userInfo } = this.props;
    if (userInfo !== prevProps.userInfo && userInfo && userInfo.id) {
      const res = await getBookingByUserId({ userId: userInfo.id });
      const doctorId = await getProfileDoctorById(res.data.doctorId);
      const timeTypePatient = await getScheduleDoctorByDate(
        res.data.doctorId,
        res.data.date
      );
      console.log("fdsfsds", timeTypePatient.data.timeTypeData);
      this.setState({
        userInfo,
        bookings: res.data,
        doctorInfor: doctorId.data,
        timeType: timeTypePatient.data,
      });
    }
  }
  render() {
    let { userInfo, bookings, doctorInfor, dataTime, timeType } = this.state;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    console.log("bookings", bookings);
    console.log("doctorInfor", doctorInfor);
    console.log("timeTypeData", timeType);
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
                        {/* <h5 className="mb-4">General information</h5> */}
                        <Form>
                          {/* <Row>
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
                          </Row> */}
                          {/* <Row className="align-items-center">
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
                          </Row> */}
                          <Row>
                            {/* <Col md={6} className="mb-3">
                              <Form.Group id="emal">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Enter your email address"
                                />
                              </Form.Group>
                            </Col> */}
                            {/* <Col md={6} className="mb-3">
                              <Form.Group id="phone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="+12-345 678 910"
                                />
                              </Form.Group>
                            </Col> */}
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
                  <div className="doctor-extra-infor">
                    <Card
                      border="light"
                      className="table-wrapper table-responsive shadow-sm"
                    >
                      <Card.Body className="pt-0">
                        <Table hover className="user-table align-items-center">
                          <thead>
                            <tr>
                              <th className="border-bottom">#</th>
                              <th className="border-bottom">Ảnh đại diện</th>
                              <th className="border-bottom">Bác sĩ</th>
                              <th className="border-bottom">
                                Khoảng thời gian đặt lịch
                              </th>
                              <th className="border-bottom">Trạng thái</th>
                              <th className="border-bottom">Ngày đặt lịch</th>
                              {/* <th className="border-bottom">Total</th> */}
                              {/* <th className="border-bottom">Status</th> */}
                              {/* <th className="border-bottom">Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {bookings && (
                              <tr>
                                <td>1</td>
                                <td>
                                  <img
                                    src={doctorInfor.image}
                                    alt="Ảnh đại diện"
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </td>
                                <td>
                                  {bookings.doctorId
                                    ? doctorInfor.lastName +
                                      " " +
                                      doctorInfor.firstName
                                    : null}
                                </td>
                                <td>
                                  {timeType.map((booking, index) => (
                                    <td key={index}>
                                      {booking.timeTypeData
                                        ? booking.timeTypeData.valueVi // replace with valueVi for Vietnamese
                                        : null}
                                    </td>
                                  ))}
                                </td>
                                <td>
                                  {bookings.statusId === "S1" ? "Đợi xác minh": null}
                                  {bookings.statusId === "S2" ? "Đã xác minh đợi khám": null}
                                  {bookings.statusId === "S3" ? "Đã được khám": null}

                                </td>
                                <td>
                                  {moment(Number(bookings.date)).format(
                                    "DD/MM/YYYY"
                                  )}
                                </td>
                                {/* <td>
                                  <Button variant="primary" type="submit">
                                    Detail
                                  </Button>
                                </td> */}
                              </tr>
                            )}
                          </tbody>
                        </Table>
                        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                          {/* <Nav>
                            <Pagination className="mb-2 mb-lg-0">
                              <Pagination.Prev>Previous</Pagination.Prev>
                              <Pagination.Item active>1</Pagination.Item>
                              <Pagination.Item>2</Pagination.Item>
                              <Pagination.Item>3</Pagination.Item>
                              <Pagination.Item>4</Pagination.Item>
                              <Pagination.Item>5</Pagination.Item>
                              <Pagination.Next>Next</Pagination.Next>
                            </Pagination>
                          </Nav> */}
                          <small className="fw-bold">
                            {/* Showing <b>{totalTransactions}</b> out of <b>25</b> entries */}
                          </small>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
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
