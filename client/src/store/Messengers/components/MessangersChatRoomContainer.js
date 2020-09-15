import React, { Component } from "react";
import styled from "styled-components";

import { Button } from "../../../themes/basic";
import { faPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

class MessangersChatRoomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInputName: "",
      chatRooms: [],
      activeRoomId: null,
    };
  }
  componentDidMount() {
    const chatRooms = JSON.parse(localStorage.getItem("chatRooms"));
    this.setState({
      chatRooms: chatRooms !== null ? chatRooms : [],
    });
  }
  addChatHandler = (event) => {
    const { filteredUsers } = this.props;
    const { chatInputName } = this.state;
    const { chatRooms } = this.state;

    event.preventDefault();

    // console.log("chat rooms", chatRooms);
    // console.log("chat rooms length", chatRooms[chatRooms.length - 1]);

    const newChatRoom = {
      id: chatRooms.length > 0 ? chatRooms[chatRooms.length - 1].id + 1 : 1,
      name: chatInputName,
      users: filteredUsers,
    };

    //   chatRooms.push(newChatRoom);
    localStorage.setItem(
      "chatRooms",
      JSON.stringify([...this.state.chatRooms, newChatRoom])
    );
    this.setState({
      chatRooms: [...this.state.chatRooms, newChatRoom],
    });
  };
  onChangeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  removeChatHandler = (item) => {
    const { chatRooms } = this.state;

    const result = window.confirm(
      "Czy napewno chcesz usunąć kanał: " + item.name
    );
    if (result === true) {
      const newRooms = chatRooms.filter((room) => room.name !== item.name);
      this.setState({
        chatRooms: newRooms,
      });
      localStorage.setItem("chatRooms", JSON.stringify(newRooms));
    }
  };
  selectChatRoom = (room) => {
    const { filterUsersHandler } = this.props;
    filterUsersHandler(room.users);
    // console.log("room", room);
    this.setState({
      activeRoomId: room.id,
    });
  };
  render() {
    const { chatInputName, chatRooms, activeRoomId } = this.state;

    // console.log("this.state", this.state);
    // console.log("last", chatRooms.lastIndexOf());

    const chatRoomsContent =
      chatRooms.length > 0
        ? chatRooms.map((room, index) => {
            return (
              <Button
                onClick={() => this.selectChatRoom(room)}
                key={index}
                className={room.id == activeRoomId ? "active" : null}
              >
                {room.name}
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={() => this.removeChatHandler(room)}
                />
              </Button>
            );
          })
        : "Lista jest pusta - możesz utworzyć kanał zaznaczając wybrane osoby podając nazwę kanału i klikając na plus";

    return (
      <StyledChatRoomContainer>
        <div className="chat-room-container-box">
          <div className="tool-box">{chatRoomsContent}</div>
          <form action="">
            <TextFieldGroup
              type="text"
              title="Nazwa kanału"
              onChange={this.onChangeHandler}
              name="chatInputName"
              value={chatInputName}
              placeholder="Nazwa kanału"
            />
            <div className="form-group">
              <Button onClick={this.addChatHandler}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </form>
        </div>
      </StyledChatRoomContainer>
    );
  }
}
export default MessangersChatRoomContainer;

const StyledChatRoomContainer = styled.div`
  .chat-room-container-box {
    display: flex;
    justify-content: space-between;
  }
  .chat-room-container-box .tool-box {
    padding: 10px 0px 10px 30px;
    color: green;
  }
  .chat-room-container-box .tool-box .active {
    background-color: red;
  }
  .chat-room-container-box form {
    display: flex;
    flex-direction: row;
    flex-direction: row;
    justify-content: flex-end;
    align-items: baseline;
    padding: 10px;
  }
  .chat-room-container-box form .form-group {
    margin-bottom: 0px;
  }
  .chat-room-container-box input {
    width: auto;
  }
  .chat-room-container-box .svg-inline--fa {
    margin-left: 5px;
  }
  .chat-room-container-box .svg-inline--fa:hover {
    color: #000;
  }
`;
