import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleUserModal();
  };

  handleOnChangeInput = (event, id) => {
    //bad code.modify state
    /**
     * this.state ={
     * email: '',
     * password: '',}
     *
     * this.state.email = this.state['email'];
     */
    // this.setState[id] = event.target.value;
    // this.setState({
    //     ...this.state
    //     }, () => {
    //         console.log("state", this.state);

    //     });
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      this.props.createNewUser(this.state,'fac');
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModalUser}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new users
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              {
                this.handleAddNewUser();
              }
            }}
          >
            Add new
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
