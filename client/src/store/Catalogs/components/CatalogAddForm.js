import React, { Component } from "react";
import { connect } from "react-redux";

import { catalog_statuses } from "../../ini";
import Aux from "../../../hoc/Auxiliary";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import { Button } from "../../../themes/basic";
import { addCatalog } from "../actions";

class CatalogAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: [],
      uploading: false,
    };
  }
  generateHandler = () => {
    const { input } = this.state;
    let newOutput = [];
    newOutput = input.split(/\r?\n/);
    newOutput = newOutput.map((item, index) => {
      return {
        id: index,
        name: "output_" + index,
        title: "",
        description: "",
        url: item,
        rank: 0,
        status: catalog_statuses[0]["name"],
      };
    });

    this.setState({
      output: newOutput,
    });
  };
  addHandler = async () => {
    const { output } = this.state;
    const { addCatalog } = this.props;
    this.setState({
      uploadingContent: true,
    });

    const result = await output.map(async (item) => {
      const response = await addCatalog(item);
    });

    if (result) {
      this.setState({
        uploadingContent: false,
      });
    }
  };
  onChangeHandler = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  onChangeUrlHandler = (event, id) => {
    let { output } = this.state;

    output = output.map((item) => {
      if (item.id == id) {
        item.url = event.currentTarget.value;
      }
      return item;
    });

    this.setState({
      output: output,
    });
  };
  render() {
    const { input, output, uploading } = this.state;
    let n = 0;

    const uploadingContent = uploading ? (
      <div>Trwa dodawanie do bazy...</div>
    ) : null;

    const outputContent =
      output.length > 0 ? (
        output.map((item) => (
          <TextFieldGroup
            type="text"
            onChange={(event) => {
              this.onChangeUrlHandler(event, item.id);
            }}
            name={item.name}
            value={item.url}
            key={n++}
          />
        ))
      ) : (
        <p>Wklej grupę katalogów</p>
      );

    const addButton =
      output.length > 0 ? (
        <Button onClick={this.addHandler}>Dodaj do bazy</Button>
      ) : null;

    return (
      <Aux>
        <h1>Generator Tablicy Katalogów</h1>
        {uploadingContent}
        <Button onClick={this.generateHandler}>Generuj tablice</Button>
        <TextareaFieldGroup
          name="input"
          value={input}
          onChange={this.onChangeHandler}
          cols="10"
          rows="15"
        />
        {addButton}
        {outputContent}
      </Aux>
    );
  }
}

export default connect(null, { addCatalog })(CatalogAddForm);
