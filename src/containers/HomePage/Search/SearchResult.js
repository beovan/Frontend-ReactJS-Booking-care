import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";
import * as actions from "../../../store/actions";
import Select from "react-select";
import "./SearchResult.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getAllSpecialty, getAllClinic } from "../../../services/userService";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedOption: "",
      listAll: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      let dataSearch = [...resSpecialty.data, ...resClinic.data, ...dataSelect];
      this.setState({
        listDoctors: dataSelect,
        listAll: dataSearch,
      });
    }
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      console.log("type", type);
    }
    return result;
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log("check selectedOption", selectedOption);

    // Navigate to the detail page of the selected doctor
    this.props.history.push(`/detail-doctor/${selectedOption.value}`);
  };
  render() {
    let listAll = this.state.listAll;
    let listDoctors = this.state.listDoctors;
    console.log("check statefdsaf", this.state);

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            <div className="search">
              <i className="fas fa-search"></i>
              {/* <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm chuyên khoa khám bệnh"
                /> */}

              <Select
                className="search-input select-muti"
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listAll}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                }
              />
              {this.state.listAll.length > 0 &&
                listAll.map((item, index) => {
                  return (
                    <ul key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${
                            item && item.image ? item.image : ""
                          })`,
                        }}
                      ></div>
                      {/* <li>{item.name}</li> */}
                      <li>{item.label}</li>
                      <li>{item.value}</li>
                    </ul>
                  );
                })}
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
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
