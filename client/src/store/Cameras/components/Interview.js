import React, { Component } from "react";

// import { socket } from "../../ini";
import { StyledInterview } from "../styles/StyledInterview";

const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

class Interview extends Component {
  constructor(props) {
    super(props);

    let isAlreadyCalling = false;

    socket.on("call-made", async (data) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(
        new RTCSessionDescription(answer)
      );
      socket.emit("make-answer", {
        answer,
        to: data.socket,
      });
    });
    socket.on("answer-made", async (data) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );

      if (!isAlreadyCalling) {
        this.callUser(data.socket);
        isAlreadyCalling = true;
      }
    });
    socket.on("update-user-list", ({ users }) => {
      this.updateUserList(users);
    });

    socket.on("remove-user", ({ socketId }) => {
      const elToRemove = document.getElementById(socketId);

      if (elToRemove) {
        elToRemove.remove();
      }
    });
    peerConnection.ontrack = function ({ streams: [stream] }) {
      const remoteVideo = document.getElementById("remote-video");
      if (remoteVideo) {
        remoteVideo.srcObject = stream;
      }
    };
  }
  createUserItemContainer(socketId) {
    const userContainerEl = document.createElement("div");

    const usernameEl = document.createElement("p");

    userContainerEl.setAttribute("class", "active-user");
    userContainerEl.setAttribute("id", socketId);
    usernameEl.setAttribute("class", "username");
    usernameEl.innerHTML = `Socket: ${socketId}`;

    userContainerEl.appendChild(usernameEl);
    userContainerEl.addEventListener("click", () => {
      this.unselectUsersFromList();
      userContainerEl.setAttribute(
        "class",
        "active-user active-user--selected"
      );
      const talkingWithInfo = document.getElementById("talking-with-info");
      talkingWithInfo.innerHTML = `Połączenie z Socket: ${socketId}`;
      this.callUser(socketId);
    });
    return userContainerEl;
  }
  async callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit("call-user", {
      offer,
      to: socketId,
    });
  }
  updateUserList(socketIds) {
    const activeUserContainer = document.getElementById(
      "active-user-container"
    );

    socketIds.forEach((socketId) => {
      const alreadyExistingUser = document.getElementById(socketId);
      if (!alreadyExistingUser) {
        const userContainerEl = this.createUserItemContainer(socketId);
        activeUserContainer.appendChild(userContainerEl);
      }
    });
  }
  unselectUsersFromList() {
    const alreadySelectedUser = document.querySelectorAll(
      ".active-user.active-user--selected"
    );

    alreadySelectedUser.forEach((el) => {
      el.setAttribute("class", "active-user");
    });
  }
  render() {
    // navigator.mediaDevices.getUserMedia(
    //   { video: { width: 460, height: 320 }, audio: true },
    //   // { video: false, audio: true },
    //   stream => {
    //     const localVideo = document.getElementById("local-video");
    //     stream
    //       .getTracks()
    //       .forEach(track => peerConnection.addTrack(track, stream));
    //     if (localVideo) {
    //       localVideo.srcObject = stream;
    //     }
    //   },
    //   error => {
    //     console.warn(error.message);
    //   }
    // );
    // Prefer camera resolution nearest to 1280x720.
    var constraints = { audio: true, video: { width: 420, height: 220 } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        const localVideo = document.getElementById("local-video");
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));
        if (localVideo) {
          localVideo.srcObject = stream;
        }
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
    return (
      <StyledInterview>
        <div className="active-users-panel" id="active-user-container">
          <h3 className="panel-title">Użytkownicy:</h3>
        </div>
        <div className="video-box">
          <div id="talking-with-info"></div>
          <div className="video-container">
            <video autoPlay className="remote-video" id="remote-video"></video>
            <video autoPlay className="local-video" id="local-video"></video>
          </div>
        </div>
      </StyledInterview>
    );
  }
}
export default Interview;
