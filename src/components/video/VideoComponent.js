import React, { Component } from "react";
import Video from "twilio-video";
import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardText } from "@material-ui/core/Card";

export default class VideoComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: "" // Track the current active room
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
  }

  componentDidMount() {
      this.joinRoom();
  }

  joinRoom() {
    console.log("Joining room '" + this.props.roomName + "'...");
    let connectOptions = {
      name: this.props.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(
      this.props.token,
      connectOptions
    ).then(this.roomJoined, error => {
      alert("Could not connect to Twilio: " + error.message);
    });
  }

  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.props.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    this.props.callAnswered();
  }

  render() {
    // Only show video track after user has joined a room
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        <div ref="localMedia" />
      </div>
    ) : null;

    // Hide 'Join Room' button if user has already joined a room.
    let hangupButton = this.state.hasJoinedRoom ? (
      <Button
        label="Hang Up"
        color='secondary'
        variant='raised'
        onClick={() => alert("Hang Up")}
      >Hang Up</Button>
    ) : null;

    return (
          <div className="flex-container">
            {showLocalTrack}
            <div className="flex-item">
              {hangupButton}
            </div>
            <div className="flex-item" ref="remoteMedia" id="remote-media" />
          </div>
    );
  }
}

VideoComponent.defaultProps = {
    callAnswered: () => {}
};