import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-share section-about">
          <div className="section-about-header">
            Truyền thông nói về website
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/2gYG5URBGYc"
                title="DR OH | KHÁM BỆNH CHO TRẺ NGAY TẠI NHÀ VỚI ĐỘI NGŨ BÁC SĨ CHẤT LƯỢNG"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p >Bác sĩ được chứng nhận từ Bệnh Viện đầu ngành như Bệnh viện Nhi Đồng 2, Bệnh viện Chợ Rẫy, Bệnh Viện Ung Bướu -TPHCM, Bệnh Viện Đa Khoa Hồng Đức.

[ Dr.OH Bác sĩ nhà tôi ] Cam kết chất lượng dịch vụ hoàn hảo!

Các bác sĩ Nhi giàu kinh nghiệm và chuyên môn sẽ cung cấp cho con em của bạn sự hỗ trợ để phát triển khỏe mạnh.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
