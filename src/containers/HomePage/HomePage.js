import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specilty from './Section/Specilty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';
class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader/>
                <Specilty/>
                <MedicalFacility />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
