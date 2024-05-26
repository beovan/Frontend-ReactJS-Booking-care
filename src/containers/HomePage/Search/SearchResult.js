import React, { Component, useState } from "react";
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
import LoadingOverlay from "react-loading-overlay";
import { BeatLoader } from "react-spinners";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedOption: "",
      listAll: [],
      searchTerm: "",
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let resDoctor = this.props.allDoctors.map((doctor) => ({
        ...doctor,
        type: "DOCTOR",
      }));
      // console.log("check resDoctor", resDoctor);
      let resSpecialty = (await getAllSpecialty()).data.map((specialty) => ({
        ...specialty,
        type: "SPECIALTY",
      }));
      let resClinic = (await getAllClinic()).data.map((clinic) => ({
        ...clinic,
        type: "CLINIC",
      }));
      let dataSearch = [...resSpecialty, ...resClinic, ...resDoctor];
      this.setState({
        listDoctors: resDoctor,
        listAll: dataSearch,
      });
    }
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value, isShowLoading: true });
    if (this.state.isShowLoading === true) {
      setTimeout(() => {
        this.setState({ isShowLoading: false });
      }, 1000);
    }
  };

  toDetail = (type, id) => {
    console.log("type", id);
    console.log("id", id);
    if (type === "DOCTOR") {
      this.props.history.push(`/detail-doctor/${id}`);
    }
    if (type === "SPECIALTY") {
      this.props.history.push(`/detail-specialty/${id}`);
    }
    if (type === "CLINIC") {
      this.props.history.push(`/detail-clinic/${id}`);
    }
  };

  render() {
    let listAll = this.state.listAll;
    let searchTerm = this.state.searchTerm;

    let filteredList = listAll.filter((item) => {
      let name = item.firstName
        ? `${item.lastName} ${item.firstName}`
        : item.name;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Group items by type
    let itemsByType = filteredList.reduce((acc, item) => {
      if (!item.type) {
        return acc;
      }
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});

    console.log("check this state", this.state);

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            <div className="search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm chuyên khoa khám bệnh"
                value={this.state.searchTerm}
                onChange={this.handleSearch}
              />
            </div>
            <div className="list-search">
              <LoadingOverlay
                active={this.state.isShowLoading}
                spinner={<BeatLoader color="#3498db" />} // Use a custom spinner with blue color
                text="Loading..."
                styles={{
                  overlay: (base) => ({
                    ...base,
                    background: "transparent", // This will make the overlay transparent
                  }),
                }}
              >
                {Object.keys(itemsByType).map((type) => (
                  <React.Fragment>
                    <div className="type-title">
                      <h3>{type}</h3>
                    </div>
                    {itemsByType[type].map((item, index) => (
                      <ul
                        key={index}
                        onClick={() => this.toDetail(type, item.id)}
                      >
                        <div
                          style={{
                            backgroundImage: `url(${
                              item && item.image ? item.image : ""
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "50px",
                            width: "100px",
                          }}
                        ></div>
                        <li className="list-name">
                          {item.firstName
                            ? `${item.lastName} ${item.firstName}  `
                            : item.name}
                        </li>
                      </ul>
                    ))}
                  </React.Fragment>
                ))}
              </LoadingOverlay>
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
