import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
import * as actions from "../../../store/actions";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;
    return (
      <div className="docotr-extra-infor-container">
        <div className="content-up">
          <div className="text-address">Địa chỉ khám</div>
          <div className="name-clinic">Phòng khám chuyên khoa Da liễu</div>
          <div className="detail-address">
            207 Phố Huế - Hai Bà Trưng - Hà Nội{" "}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              Giá khám: 200.000đ.
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}
        </div>
        {isShowDetailInfor === true && (
          <div className="title-price">
            GÍA KHÁM:
            <div className="detail-infor">
                <div className="price">
                    <span className="left">Khám bệnh</span>
                    <span className="right">200.000đ</span>
                </div>
                <div className="note">
                    Được ưu tiên khám trước khi đặt khám qua BookingCare.
                </div>
            </div>
            <div className="payment">
                Người bệnh có thể thanh toán chi phí bằng thức tiền mặt và quẹt thẻ 
            </div>
            <div className="hide-price">
                <span onClick={()=> this.showHideDetailInfor(false)}>
            Ấn bảng giá
                </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
