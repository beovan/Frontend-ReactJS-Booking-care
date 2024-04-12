import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import './ManageClinic.scss';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        address: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: ''
    };
  }

  async componentDidMount() {
  
}
 handleOnchangeInput = (event, id) => {
    let Statecopy = { ...this.state };
    Statecopy[id] = event.target.value;
    this.setState({
      ...Statecopy,
    });
  };
  
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    const file = data[0];
    if (file) {
    const base64 = await CommonUtils.getBase64(file);
    this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
        toast.success('Add new clinic success!');
        this.setState({
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        })
    } else {
        toast.error('Something wrongs...');
      console.log("beovan check Specialy ",res);
    }
  };

  render() {
    return (
        <div className="manage-specialty-container">
            <div className="ms-title">Quản lý Phòng khám</div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group">
                    <label>Tên phòng khám</label>
                    <input className="form-control" type="text" value={this.state.name}
                        onChange={(event) => this.handleOnchangeInput(event, 'name')}
                    ></input>
                </div>
                <div className="col-6 form-group">
                    <label>Ảnh phòng khám</label>
                    <input className="form-control-file" type="file"
                        onChange={(event) => this.handleOnchangeImage(event)}
                    ></input>
                </div>
                <div className="col-6 form-group">
                    <label>Địa chỉ phòng khám</label>
                    <input className="form-control" type="text" value={this.state.name}
                        onChange={(event) => this.handleOnchangeInput(event, 'name')}
                    ></input>
                </div>
                <div className="col-12">
                   <MdEditor
                    style={{ height: "300px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkdown}
                   />
                </div>
                
                <div className="col-12">
                    <button className="btn-save-specialty"
                     onClick={() => this.handleSaveNewClinic()}>Save</button>
                </div>
            </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
