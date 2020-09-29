import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import SelectFieldGroup from "../../../common/Forms/components/SelectFieldGroup";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import { Button } from "../../../themes/basic";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CatalogProjectsAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      lastInsertWebsite: {},
    };
  }
  componentDidMount() {
    const { item } = this.props;
    this.setState({
      item: item ? item : {},
    });
  }
  onChangeHandler = (event) => {
    this.setState({
      lastInsertWebsite: {
        ...this.state.lastInsertWebsite,
        [event.target.name]: event.target.value,
      },
    });
  };
  updateItemHandler = async () => {
    const { item, lastInsertWebsite } = this.state;
    const { updateItem } = this.props;

    let newItem = this.state.item;

    if (newItem.websites) {
      newItem.websites.push(lastInsertWebsite);
    } else {
      newItem.websites = [lastInsertWebsite];
    }

    console.log("click item", item);
    console.log("last insert website", lastInsertWebsite);

    const response = await updateItem(newItem);
    if (response) {
      this.setState({ lastInsertWebsite: {} });
    }
  };
  render() {
    const { lastInsertWebsite } = this.state;
    const { projects } = this.props;

    console.log("state ", this.state);
    // console.log("lastInsert",lastInsert);

    return (
      <CatalogProjectsAddFormStyled>
        <div className="catalog-projects-add-form-box">
          <SelectFieldGroup
            name="name"
            items={projects}
            onChange={this.onChangeHandler}
          />
          <TextFieldGroup
            title="Dodaj ścieżkę katalogu"
            onChange={this.onChangeHandler}
            name="path"
            value={lastInsertWebsite.path}
            placeholder="Dodaj ścieżkę katalogu"
          />
          <Button onClick={this.updateItemHandler}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </Button>
        </div>
      </CatalogProjectsAddFormStyled>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
  };
};

export default connect(mapStateToProps)(CatalogProjectsAddForm);

const CatalogProjectsAddFormStyled = styled.div`
  .catalog-projects-add-form-box {
    box-sizing: border-box;
    position: relative;
  }
  .catalog-projects-add-form-box button {
    position: absolute;
    right: -3px;
    bottom: -3px;
  }
`;
