import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    };

  }

  componentDidMount() {
  }
  componentDidUpdate(
    prevProps,
    prevState,
    snapshot
  ) {
    if (prevProps.language !== this.props.language) {
      //call api

  }

}



  render() {
    return (
        <>
        <HomeHeader />
        <div>Hello world from detail specialty</div>
        </>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
