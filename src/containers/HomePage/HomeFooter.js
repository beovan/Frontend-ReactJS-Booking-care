import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2024 Beo Van .{" "}
        
            More information, please visit my website.
            <a target="_blank" href="#"> 
            &#8594; Click here
            &#8592;
          </a>{" "}
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
