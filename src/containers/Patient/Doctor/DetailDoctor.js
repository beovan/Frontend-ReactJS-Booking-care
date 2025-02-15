import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtrainfor from "./DoctorExtrainfor";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({ detailDoctor: res.data });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    // console.log("check state", this.state);
    let { language } = this.props;

    let { detailDoctor } = this.state;
    // console.log("check detailDoctor", detailDoctor);
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, 
      ${detailDoctor.lastName}  ${detailDoctor.firstName} `;
      nameEn = `${detailDoctor.positionData.valueEn}, 
      ${detailDoctor.firstName}  ${detailDoctor.lastName} `;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
                  <div className="like-share-plugin">
                    <LikeAndShare
                    
                    />
                  </div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorIdFromParent={
                  this.state.currentDoctorId
                }
              />
            </div>
            <div className="content-right">
              <DoctorExtrainfor
                doctorIdFromParent={
                  this.state.currentDoctorId
                }
              />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapSatetoProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {};
};
export default connect(mapSatetoProps, mapDispatchtoProps)(DetailDoctor);
