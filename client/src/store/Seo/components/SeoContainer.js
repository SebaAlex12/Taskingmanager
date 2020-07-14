import React, { Component } from "react";
import axios from "axios";

class SeoContainer extends Component {
  update = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964";
    const $json = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    console.log("json", $json);
  };
  render() {
    return (
      <div>
        <button onClick={() => this.update()}>Update</button>
      </div>
    );
  }
}

export default SeoContainer;
