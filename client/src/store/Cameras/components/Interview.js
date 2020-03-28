import React, { Component } from "react";
import io from "socket.io-client";
import { StyledInterview } from "../styles/StyledInterview";

const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

class Interview extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   peerConnection: new RTCPeerConnection(),
    //   isAlreadyCalling: false
    // };

    const isAlreadyCalling = false;
    if (!this.socket) {
      this.socket = io();
      this.socket.on("call-made", async data => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(
          new RTCSessionDescription(answer)
        );
        console.log("call-made");
        this.socket.emit("make-answer", {
          answer,
          to: data.socket
        });
      });
      this.socket.on("answer-made", async data => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );

        if (!isAlreadyCalling) {
          this.callUser(data.socket);
          isAlreadyCalling = true;
        }
      });
      this.socket.on("update-user-list", ({ users }) => {
        // console.log("users", users);
        this.updateUserList(users);
      });

      this.socket.on("remove-user", ({ socketId }) => {
        const elToRemove = document.getElementById(socketId);

        if (elToRemove) {
          elToRemove.remove();
        }
      });
      peerConnection.ontrack = function({ streams: [stream] }) {
        const remoteVideo = document.getElementById("remote-video");
        if (remoteVideo) {
          remoteVideo.srcObject = stream;
        }
      };
    }
  }
  createUserItemContainer(socketId) {
    const userContainerEl = document.createElement("div");

    const usernameEl = document.createElement("p");

    userContainerEl.setAttribute("class", "active-user");
    userContainerEl.setAttribute("id", socketId);
    usernameEl.setAttribute("class", "username");
    usernameEl.innerHTML = `Socket: ${socketId}`;

    userContainerEl.appendChild(usernameEl);
    console.log("createUser");
    userContainerEl.addEventListener("click", () => {
      this.unselectUsersFromList();
      userContainerEl.setAttribute(
        "class",
        "active-user active-user--selected"
      );
      const talkingWithInfo = document.getElementById("talking-with-info");
      talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
      this.callUser(socketId);
    });
    return userContainerEl;
  }
  async callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    console.log("call-user");
    this.socket.emit("call-user", {
      offer,
      to: socketId
    });
  }
  updateUserList(socketIds) {
    const activeUserContainer = document.getElementById(
      "active-user-container"
    );

    socketIds.forEach(socketId => {
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

    alreadySelectedUser.forEach(el => {
      el.setAttribute("class", "active-user");
    });
  }
  render() {
    if (peerConnection) {
      // Prefer camera resolution nearest to 1280x720.
      var constraints = {
        audio: true,
        video: { width: 200, height: 200 },
        audio: true
      };

      // navigator.mediaDevices
      //   .getUserMedia(constraints)
      //   .then(function(mediaStream) {
      //     var video = document.getElementById("local-video");
      //     mediaStream.getTracks().forEach(track => {
      //       peerConnection.addTrack(track, mediaStream);
      //     });
      //     video.srcObject = mediaStream;
      //     video.onloadedmetadata = function(e) {
      //       video.play();
      //     };
      //   })
      //   .catch(function(err) {
      //     console.log(err.name + ": " + err.message);
      //   });
      navigator.getUserMedia(
        { video: { width: 200, height: 200 }, audio: false },
        // { video: false, audio: true },
        stream => {
          const localVideo = document.getElementById("local-video");
          stream
            .getTracks()
            .forEach(track => peerConnection.addTrack(track, stream));
          if (localVideo) {
            localVideo.srcObject = stream;
          }
        },
        error => {
          console.warn(error.message);
        }
      );
    }
    return (
      <StyledInterview>
        <div className="active-users-panel" id="active-user-container">
          <h3 className="panel-title">Active Users:</h3>
        </div>
        <div className="video-chat-container">
          <h2 className="talk-info" id="talking-with-info">
            Select active user on the left menu.
          </h2>
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
