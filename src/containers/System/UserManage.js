import React, {Component} from "react";
import {connect} from "react-redux";
// import "./UserManage.scss";
import { LANGUAGES ,USER_ROLE } from "../../utils";

import {faCashRegister, faChartLine} from '@fortawesome/free-solid-svg-icons';
import {Col, Row} from '@themesberg/react-bootstrap';

import {BarChartWidget, CounterWidget, SalesValueWidget, SalesValueWidgetPhone} from "../../components/Widgets";
import {totalOrders} from "../../data/charts";
import * as actions from "../../store/actions";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],

    };
  }

  async componentDidMount() {
     this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      let updatedUsers = this.props.listUsers.filter(user => user.roleId === "R3");
      this.setState({
        usersRedux: updatedUsers,
      });
    }
  }

  /**Life cycle
   * Run component:
   * 1.Run construct -> init state
   * 2. Did mount (set state) : born
   * 3. Render (re-render)
   *
   *
   */


  render() {
    let arrUsers = this.state.usersRedux;
    console.log("State: ", arrUsers);
    // console.log("Props: ", this.props);
    //properties ; nested
    return (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">


          </div>

          <Row className="justify-content-md-center">
            <Col xs={12} className="mb-4 d-none d-sm-block">
              <SalesValueWidget
                  title="Sales Value"
                  value="20"
                  percentage={10.57}
              />
            </Col>
            <Col xs={12} className="mb-4 d-sm-none">
              <SalesValueWidgetPhone
                  title="Sales Value"
                  value="20"
                  percentage={10.57}
              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                  category="Customers"
                  title="17"
                  period="Feb 1 - Apr 1"
                  percentage={18.2}
                  icon={faChartLine}
                  iconColor="shape-secondary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                  category="Revenue"
                  title="$25"
                  period="Feb 1 - Apr 1"
                  percentage={28.4}
                  icon={faCashRegister}
                  iconColor="shape-tertiary"
              />
            </Col>

            {/*<Col xs={12} sm={6} xl={4} className="mb-4">*/}
            {/*  <CircleChartWidget*/}
            {/*      title="Traffic Share"*/}
            {/*      data={trafficShares}/>*/}
            {/*</Col>*/}
          </Row>

          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Row>
                {/*<Col xs={12} xl={8} className="mb-4">*/}
                {/*  <Row>*/}
                {/*    <Col xs={12} className="mb-4">*/}
                {/*      <PageVisitsTable />*/}
                {/*    </Col>*/}

                {/*    <Col xs={12} lg={6} className="mb-4">*/}
                {/*      <TeamMembersWidget />*/}
                {/*    </Col>*/}

                {/*    <Col xs={12} lg={6} className="mb-4">*/}
                {/*      <ProgressTrackWidget />*/}
                {/*    </Col>*/}
                {/*  </Row>*/}
                {/*</Col>*/}

                <Col xs={12} xl={4}>
                  <Row>
                    <Col xs={12} className="mb-4">
                      <BarChartWidget
                          title="Total orders"
                          value={2}
                          percentage={4}
                          data={totalOrders}/>
                    </Col>

                    {/*<Col xs={12} className="px-0 mb-4">*/}
                    {/*  <RankingWidget/>*/}
                    {/*</Col>*/}

                    {/*<Col xs={12} className="px-0">*/}
                    {/*  <AcquisitionWidget/>*/}
                    {/*</Col>*/}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
