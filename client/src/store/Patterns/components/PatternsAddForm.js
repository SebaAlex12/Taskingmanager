import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addPattern } from "../actions";
import { StyledPatternsForm } from "../styles/StyledPatternsForm";
import { Button } from "../../../themes/basic";

class PatternsAddForm extends Component {
  constructor(props) {
    super(props);

    const { loggedUser } = this.props;

    this.state = {
      patternNumber: "",
      userId: loggedUser._id,
      taskId: "",
      createdBy: loggedUser.name,
      responsiblePerson: "",
      title: "",
      description: "",
      elements: [
        {
          id: 0,
          text: "",
          statusId: 0,
          active: null,
        },
      ],
      type: "Wzór",
      status: "",
      finishedAt: "",
      termAt: "",
      createdAt: moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(),
    };
  }
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeSelect = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
      //   patternNumber: document.getElementById("patternNumber").value
    });
  };
  onChangeElementInput = (event) => {
    const { elements } = this.state;
    const newElements = elements;

    newElements[event.currentTarget.name]["text"] = event.currentTarget.value;
    this.setState({
      ...this.state,
      elements: newElements,
    });
  };
  addElement = () => {
    const { elements } = this.state;
    const newElements = elements;

    newElements.push({
      id: elements.length,
      text: "",
      statusId: 0,
    });

    this.setState({
      ...this.state,
      elements: newElements,
    });
  };
  removeElement = (id) => {
    const { elements } = this.state;
    const newElements = elements.filter((item) => item.id != id);

    console.log("new elements", newElements);

    let newKeysElements = newElements.map((item, index) => {
      return {
        id: index,
        text: item.text,
        statusId: item.statusId,
      };
    });

    console.log("new keys elements", newKeysElements);

    this.setState({
      ...this.state,
      elements: newKeysElements,
    });
  };
  addHandler = (event) => {
    const { addPattern } = this.props;
    const {
      userId,
      taskId,
      createdBy,
      responsiblePerson,
      title,
      description,
      elements,
      type,
      status,
      finishedAt,
      termAt,
      createdAt,
    } = this.state;
    const jsonElements = JSON.stringify(elements);
    console.log("json", jsonElements);
    const data = {
      userId,
      taskId,
      createdBy,
      responsiblePerson,
      title,
      description,
      elements,
      type,
      status,
      finishedAt,
      termAt,
      createdAt,
    };
    event.preventDefault();

    const result = addPattern(data);
  };
  render() {
    const { title, description, elements } = this.state;

    const formInputElementsContent = elements.map((item) => (
      <div className="form-group" key={item.id}>
        <input
          onChange={this.onChangeElementInput}
          value={item.text}
          type="text"
          name={item.id}
          className="form-control"
          placeholder="Zadanie"
          title="Zadanie"
          required
        />
        <Button
          onClick={() => this.removeElement(item.id)}
          style={{ color: "red", backgroundColor: "white", fontSize: "20px" }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    ));

    return (
      <StyledPatternsForm>
        <div className="pattern-add-form-box">
          <Button
            onClick={this.addElement}
            style={{
              color: "green",
              backgroundColor: "white",
              fontSize: "20px",
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </Button>
          <form action="">
            <div className="group">
              <label htmlFor="">Tytuł</label>
              <div className="pattern-content">
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={title}
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Tytuł"
                    title="Tytuł"
                    required
                  />
                </div>
                {formInputElementsContent}
                <div className="form-group">
                  <textarea
                    onChange={this.onChangeInput}
                    value={description}
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Opis"
                    title="Opis"
                    required
                  >
                    {description}
                  </textarea>
                </div>

                <div className="form-group add">
                  <input
                    onClick={this.addHandler}
                    className="btn btn-primary float-right"
                    type="submit"
                    value="dodaj"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </StyledPatternsForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, {
  addPattern,
})(PatternsAddForm);
