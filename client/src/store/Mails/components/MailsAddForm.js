import React, { Component } from 'react';
import { connect } from "react-redux";

import { sendMail } from '../actions';

import { StyledMailAddForm } from "../styles/StyledMailAddForm";

class MailsAddForm extends Component {
    constructor(props){
        super(props);
        const { loggedUser, to, projectName } = this.props;

        this.state = {
            from: loggedUser.email,
            to,
            projectName,
            title: "",
            description: "",
            attachments: "",
            createdBy: loggedUser.name
        }
    }
    onChangeInput = event => {
        this.setState({
          ...this.state,
          [event.currentTarget.name]: event.currentTarget.value
        });
      };
    sendHandler = event => {
        const { sendMail } = this.props;
        const { from, to, projectName, title, description, attachments, createdBy } = this.state;
    
        const data = {
            from, 
            to, 
            projectName, 
            title, 
            description, 
            attachments, 
            createdBy
        };
    
        event.preventDefault();
    
        const response = sendMail(data);
      };
    render() {
        const { from, to, projectName, title, description, attachments } = this.state;

        return (
            <StyledMailAddForm>
                <div className="mail-add-form-box">
                        <form action="">
                            <div className="form-group">
                            <label>Adres nadawcy:</label>
                            <input
                                onChange={this.onChangeInput}
                                value={from}
                                type="text"
                                name="from"
                                className="form-control"
                                placeholder="Adres nadawcy"
                                title="Adres nadawcy"
                                required
                                disabled
                            />
                            </div>
                            <div className="form-group">
                            <label>Adres odbiorcy:</label>
                            <textarea
                                onChange={this.onChangeInput}
                                value={to}
                                type="text"
                                name="to"
                                className="form-control"
                                placeholder="Adres odbiorcy"
                                title="Adres odbiorcy"
                                required
                            />
                            </div>
                            <div className="form-group">
                            <label>Nazwa projektu:</label>
                            <input
                                onChange={this.onChangeInput}
                                value={projectName}
                                type="text"
                                name="projectName"
                                className="form-control"
                                placeholder="Dotyczy projektu"
                                title="Dotyczy projektu"
                                required
                            />
                            </div>
                            <div className="form-group">
                            <label>Tytuł:</label>
                            <input
                                onChange={this.onChangeInput}
                                value={title}
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Tytuł"
                                title="Tytuł"
                            />
                            </div>
                            <div className="form-group">
                            <label>Opis:</label>
                            <textarea
                                onChange={this.onChangeInput}
                                value={description}
                                type="text"
                                name="description"
                                className="form-control"
                                placeholder="Opis"
                                title="Opis"
                            />
                            </div>
                            <div className="form-group">
                            <input
                                onClick={this.sendHandler}
                                className="btn btn-primary float-right"
                                type="submit"
                                value="wyślij"
                            />
                            </div>
                        </form>
                        </div>
            </StyledMailAddForm>
        );
    }
}

const mapStateToProps = state => {
    return {
      loggedUser: state.users.logged_user
    };
  };

export default connect(mapStateToProps, { sendMail })(MailsAddForm);