import React, { Component } from "react";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

class QuickSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredName: "",
    };
  }
  onChangeHandler = (event) => {
    const { onChange } = this.props;
    this.setState({
      filteredName: event.target.value,
    });
    onChange({ filteredName: event.target.value });
  };
  render() {
    const { filteredName } = this.state;
    const { title, placeholder } = this.props;
    return (
      <div>
        <TextFieldGroup
          title={title}
          onChange={this.onChangeHandler}
          name="filteredName"
          value={filteredName}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
export default QuickSearcher;
