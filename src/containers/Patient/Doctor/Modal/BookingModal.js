import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import {
  postPatientBookAppointment,
  getExtraInforDoctorById,
  vnpayCreatePaymentUrl,
  getAllCodeService,
} from "../../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,
      extraInfor: {},
      selectedPaymentOption: null,
      paymentOptions: ["Cash", "VNPAY"],
      amountVNPay: "",
    };
  }

  async componentDidMount() {
    this.props.getGenders();
    // let doctorId = this.props.dataTime.doctorId;

    //   let res = await getExtraInforDoctorById(doctorId);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       extraInfor: res.data,
    //     });
    //   }
    // let resPrice = await getAllCodeService("PRICE");
    // console.log("resPrice", resPrice);
    // if (resPrice && resPrice.errCode === 0) {
    //   if (resPrice.data.keyMap === res.priceId) {
    //     this.setState({
    //       amountVNPay: resPrice.data.valueVi,
    //     });

    //   }
    // }
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;

        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleChangeSelectPaymentOption = (selectedOption) => {
    this.setState({ selectedPaymentOption: selectedOption });
  };
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    let userInfor = this.props.userInfo;
    if (userInfor && !_.isEmpty(userInfor)) {
      stateCopy.fullName = userInfor.lastName
        ? `${userInfor.firstName} ${userInfor.lastName}`
        : userInfor.firstName;
      stateCopy.email = userInfor.email;
      stateCopy[id] = valueInput;
    }
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectGender: selectedOption,
    });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD-MM-YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("vi")
              .format("ddd - MM-DD-YYYY");

      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorTime = (dataTime) => {
    let { language } = this.props;
    if (dataTime) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };
  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorTime(this.props.dataTime);
    this.setState({
      isShowLoading: true,
    });
    if (!this.state.selectedPaymentOption) {
      toast.error("Please select payment method!");
      this.setState({
        isShowLoading: false,
      });
      return;
    }
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
      paymentMethod: this.state.paymentMethod,
    });

    this.setState({
      isShowLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
      this.props.closeBookingClose();
    } else {
      toast.error("Booking a new appointment error!");
    }
  };

  vnpay = async () => {
    const { fullName, phoneNumber, email, address, reason, selectGender, doctorId, timeType, selectedPaymentOption, birthday } = this.state;
    const { dataTime, language, closeBookingClose } = this.props;
    const date = new Date(birthday).getTime();
    const timeString = this.buildTimeBooking(dataTime);
    const doctorName = this.buildDoctorTime(dataTime);
  
    if (!selectedPaymentOption) {
      toast.error("Please select payment method!");
      return;
    }
  
    const appointmentData = {
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      date: dataTime.date,
      birthday: date,
      selectedGender: selectGender.value,
      doctorId,
      timeType,
      language,
      timeString,
      doctorName,
      // paymentMethod: selectedPaymentOption.value,
    };
  
    this.setState({ isShowLoading: true });
  
    let res = await postPatientBookAppointment(appointmentData);
  
    if (res && res.errCode === 0) {
      let data = {
        amount: 200000,
        language: "vn",
      };
      let resVNPAY = await vnpayCreatePaymentUrl(data);
      if (resVNPAY && resVNPAY.errCode === 0) {
        window.open(resVNPAY.data, "_self");
      }
    }
  
    this.setState({ isShowLoading: false });
  
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
      closeBookingClose();
    } else {
      toast.error("Booking a new appointment error!");
    }
  };
  render() {
    let { isOpenModal, closeBookingClose, dataTime, isLoggedIn, extraInfor } =
      this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    let userInfor = this.props.userInfo;

    // console.log("state", this.state);
    // console.log("props", extraInfor);
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner={true}
        text="Loading..."
      >
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          {isLoggedIn === true && (
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="left">
                  <FormattedMessage id="patient.booking-modal.title" />
                </span>
                <span className="right" onClick={closeBookingClose}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="booking-modal-body">
                <div className="doctor-infor">
                  <ProfileDoctor
                    doctorId={doctorId}
                    isShowDescriptionDoctor={false}
                    dataTime={dataTime}
                    isShowLinkDetail={false}
                    isShowPrice={false}
                  />
                </div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.fullName" />
                    </label>
                    <input
                      defaultValue={userInfor ? userInfor.firstName : ""}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "fullName")
                      }
                      className="form-control"
                      disabled={userInfor && userInfor.firstName ? true : false}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.phoneNumber" />
                    </label>
                    <input
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      defaultValue={userInfor ? userInfor.email : ""}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                      className="form-control"
                      disabled={userInfor && userInfor.email ? true : false}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "reason")
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      value={this.state.birthday}
                      onChange={this.handleOnChangeDatePicker}
                      className="form-control"
                    />
                  </div>

                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      value={this.state.selectGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.payment" />
                    </label>
                    <Select
                      value={this.state.selectedPaymentOption}
                      onChange={this.handleChangeSelectPaymentOption}
                      options={this.state.paymentOptions.map((option) => ({
                        label: option,
                        value: option,
                      }))}
                    />
                  </div>
                </div>
              </div>
              <div className="booking-modal-footer">
                {this.state.selectedPaymentOption &&
                this.state.selectedPaymentOption.value === "VNPAY" ? (
                  <button
                    className="btn-booking-confirm"
                    onClick={() => this.vnpay()}
                  >
                    Thanh toán qua VNPAY
                  </button>
                ) : (
                  <button
                    className="btn-booking-confirm"
                    onClick={() => this.handleConfirmBooking()}
                  >
                    <FormattedMessage id="patient.booking-modal.btnConfirm" />
                  </button>
                )}

                <button
                  className="btn-booking-cancel"
                  onClick={closeBookingClose}
                >
                  <FormattedMessage id="patient.booking-modal.btnCancel" />
                </button>
              </div>
            </div>
          )}

          {isLoggedIn === false && (
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="left">
                  <FormattedMessage id="patient.booking-modal.loginRequire" />
                </span>
                <span className="right" onClick={closeBookingClose}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
            </div>
          )}
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapSatetoProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    genders: state.admin.genders,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};
export default connect(mapSatetoProps, mapDispatchtoProps)(BookingModal);
