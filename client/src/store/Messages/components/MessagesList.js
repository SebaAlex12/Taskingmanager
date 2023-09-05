import React, { useEffect } from "react";
import { socket } from '../../ini';

import { StyledMessagesList } from "../styles/StyledMessagesList";
// import { updateMessages } from "../actions";

socket.on('chat', function(msg) {
    console.log('chat message iv got it',msg);
});


// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

const MessagesList = () => {
  const { messages, alert_messages } = this.props.messages;

  const reloadInfo = () => {
      var messagesBox = document.getElementById("messages");
      messagesBox.classList.add("active");
      setTimeout(function() {
        messagesBox.classList.remove("active");
      }, 10500);
  }

  useEffect(() => {
      reloadInfo();
      console.log('message has been chnged');
  },[messages,alert_messages]); 

  const alertContent =
      alert_messages && alert_messages.length > 0
        ? alert_messages.map((item, index) => (
            <div className="msg alert" key={index}>
              <div className="title">{item.path}</div>
              <div className="description">{item.message}</div>
            </div>
          ))
        : "";

    const successContent =
      messages && messages.length > 0
        ? messages.map((msg, index) => (
            <div className="msg msg" key={index}>
              <div className="title">{msg.path}</div>
              <div className="description">{msg.message}</div>
            </div>
          ))
        : "";

  return(
      <StyledMessagesList>
        <div className="messages-box" id="messages">
          {successContent}
          {alertContent}
        </div>
      </StyledMessagesList>
  )
}

export default MessagesList;

// class MessagesList extends Component {
//   constructor(props) {
//     super(props);

//     if (!this.socket) {
//       this.socket = io();
//     }
//   }
//   componentDidUpdate() { 
//     this.reloadInfo();
//     if (messages.alert) {
//       this.socket.emit("chat", messages.alert);
//     }
//   }
//   reloadInfo() {
//     var messagesBox = document.getElementById("messages");
//     messagesBox.classList.add("active");
//     setTimeout(function() {
//       messagesBox.classList.remove("active");
//     }, 10500);
//   }
//   render() {
//     const { messages, alert_messages } = this.props.messages;

//     const alertContent =
//       alert_messages && alert_messages.length > 0
//         ? alert_messages.map((item, index) => (
//             <div className="msg alert" key={index}>
//               <div className="title">{item.path}</div>
//               <div className="description">{item.message}</div>
//             </div>
//           ))
//         : "";
//     const successContent =
//       messages && messages.length > 0
//         ? messages.map((msg, index) => (
//             <div className="msg msg" key={index}>
//               <div className="title">{msg.path}</div>
//               <div className="description">{msg.message}</div>
//             </div>
//           ))
//         : "";
//     return (
//       <StyledMessagesList>
//         <div className="messages-box" id="messages">
//           {successContent}
//           {alertContent}
//         </div>
//       </StyledMessagesList>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     messages: state.messages
//   };
// };

// export default connect(mapStateToProps, {
//   updateMessages
// })(MessagesList);
