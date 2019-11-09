import React, { Component } from "react";

class Messages extends Component {
  componentDidMount() {
    this.reloadInfo();
  }
  componentDidUpdate() {
    this.reloadInfo();
  }
  reloadInfo() {
    var messagesBox = document.getElementById("messages");
    messagesBox.style.left = "0px";
    setTimeout(function() {
      messagesBox.style.left = "320px";
    }, 5000);
  }
  render() {
    const { messages } = this.props;
    const messagesContent = messages.map(msg => <div>{msg}</div>);
    return (
      <div
        className="messages-box"
        id="messages"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          zIndex: "1000",
          fonSize: "20px",
          backgroundColor: "#379037",
          color: "#fff",
          padding: "5px 9px",
          borderRadius: "4px",
          transition: "all 0s ease-in-out 0.4s"
        }}
      >
        {messagesContent}
      </div>
    );
  }
}

export default Messages;
