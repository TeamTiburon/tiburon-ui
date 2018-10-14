import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Video from "twilio-video";
import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardText } from "@material-ui/core/Card";
import Phone from '@material-ui/icons/Phone';

import { withNamespaces } from "react-i18next";

import './VideoComponent.css';

const styles = theme => ({
    windowSizer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        zIndex: -1,
        height: '100vh',
        width: '100vw',
        background: 'transparent'

    },
    loadingSpinner: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',

        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.75)",
        zIndex: 8,
    }
});

class VideoComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: "", // Track the current active room
      muteVideo: props.muteVideo,
      answered: false,
      sizes: [0,0],
      devices: [],
      currentDevice: 0
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.attachTracks = this.attachTracks.bind(this);
    this.attachParticipantTracks = this.attachParticipantTracks.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
    this.enableVideo = this.enableVideo.bind(this);
    this.listDevices = this.listDevices.bind(this);
    this.switchCamera = this.switchCamera.bind(this);

    this.localMedia = React.createRef();
    this.remoteMedia = React.createRef();
    this.windowSizer = React.createRef();
  }

  componentDidMount() {
    navigator.mediaDevices.enumerateDevices().then(this.listDevices);
    this.joinRoom();
  }

  componentWillUnmount() {
    if (this.state.activeRoom) {
      const { activeRoom } = this.state;
      try {
        this.detachParticipantTracks(activeRoom.localParticipant);
      } catch (e) {
        console.error(e);
      }
      activeRoom.disconnect();
    }
  }

  listDevices(mediaDevices) {
    const devices = mediaDevices.reduce((acc, mediaDevice) => {
      if (mediaDevice.kind === 'videoinput') {
        acc.push({
          deviceId: mediaDevice.deviceId,
          label: mediaDevice.label || 'Camera'
        });
      }

      return acc;
    }, []);

    console.log(devices);

    this.setState({devices});
  }

  switchCamera() {
    const { currentDevice, devices, activeRoom } = this.state;

    let nextDevice = currentDevice + 1;
    if (nextDevice > devices.length - 1) {
      nextDevice = 0;
    }

    const { localParticipant } = activeRoom;

    Video.createLocalVideoTrack({
      deviceId: { exact: devices[nextDevice].deviceId },
      aspectRatio: 1 / (this.windowSizer.current.clientWidth / this.windowSizer.current.clientHeight)
    }).then((localVideoTrack) => {
      const tracks = Array.from(localParticipant.videoTracks.values());
      localParticipant.unpublishTracks(tracks);
      this.detachTracks(tracks);

      localParticipant.publishTrack(localVideoTrack);
      var previewContainer = this.localMedia.current;
      this.attachTracks([localVideoTrack], previewContainer);
    });

    this.setState({currentDevice: nextDevice});
  }

  enableVideo() {
    const { activeRoom } = this.state;
    this.setState({ muteVideo: false }, () => {
        activeRoom.localParticipant.videoTracks.forEach((videoTrack) => {
            videoTrack.enable();
        });

        var previewContainer = this.localMedia.current;
        if (!previewContainer.querySelector("video")) {
            this.attachParticipantTracks(activeRoom.localParticipant, previewContainer);
        }
    });
  }

  joinRoom() {
    console.log("Joining room '" + this.props.roomName + "'...");
    let connectOptions = {
      name: this.props.roomName,
      audio: true,
      video: {
          aspectRatio: 1 / (this.windowSizer.current.clientWidth / this.windowSizer.current.clientHeight)
      }
    };

    this.setState({ sizes: [this.windowSizer.current.clientWidth, this.windowSizer.current.clientHeight]})

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

    // Disable local video
    if (this.state.muteVideo) {
        room.localParticipant.videoTracks.forEach((videoTrack) => {
            videoTrack.disable();
        });
    } else {
        // Attach LocalParticipant's Tracks, if not already attached.
        var previewContainer = this.localMedia.current;
        if (!previewContainer.querySelector("video")) {
            this.attachParticipantTracks(room.localParticipant, previewContainer);
        }
    }

    if (room.participants && room.participants.size) {
        this.setState({ answered: true });
    }

    // Attach the Tracks of the room's participants.
    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.remoteMedia.current;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // Participant joining room
    room.on("participantConnected", participant => {
        this.setState({ answered: true });
        console.log("Joining: '" + participant.identity + "'");
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on("trackAdded", (track, participant) => {
      console.log(participant.identity + " added track: " + track.kind);
      var previewContainer = this.remoteMedia.current;
      this.attachTracks([track], previewContainer);
    });

    // Detach participant’s track from DOM when they remove a track.
    room.on("trackRemoved", (track, participant) => {
      console.log(participant.identity + " removed track: " + track.kind);
      this.detachTracks([track]);
    });

    // Detach all participant’s track when they leave a room.
    room.on("participantDisconnected", participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);

      this.props.hangup();
    });

    room.on("disconnected", () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.setState({ activeRoom: null, hasJoinedRoom: false, localMediaAvailable: false });
    });

    this.props.callAnswered();
  }

  render() {
    const { classes, t } = this.props;

    // Only show video track after user has joined a room
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div id="local-media" className="flex-item">
        <div ref={this.localMedia} />
      </div>
    ) : null;

    const toggleMute = this.state.muteVideo ? (
        <Button id="unmute-video" variant="raised" onClick={this.enableVideo}>{t('enable_video')}</Button>
    ) : showLocalTrack;

    const switchCameraButton = this.state.devices.length > 1 && this.state.answered ?
        ( <Button id="switch-camera" variant="raised" onClick={this.switchCamera}>{t('switch_camera')}</Button> )
        : null;

    return (
          <div className="flex-container">
            <div className={ classes.windowSizer } ref={this.windowSizer }/>
            {toggleMute}
            {switchCameraButton}
            <div className="flex-item">
                <Button
                    label={t('hang_up')}
                    color="secondary"
                    variant="raised"
                    id="hang-up-button"
                    disabled={!this.state.activeRoom}
                    onClick={this.props.hangup}
                >{t('hang_up')}</Button>
            </div>
            <div className="flex-item" ref={this.remoteMedia} id="remote-media">
                { !this.state.answered &&
                    <div className={classes.loadingSpinner}>
                        <Phone style={{ fontSize: 310, zIndex: 9, color: "#fff", display: 'block' }} color="primary"></Phone>

                        <h4 style={{ color: "#fff" }}>
                            {t('calling')}
                        </h4>
                    </div>
                }
            </div>
        </div>
    );
  }
}
export default withNamespaces()(withStyles(styles)(VideoComponent));

VideoComponent.defaultProps = {
  callAnswered: () => {},
  hangup: () => {},
  muteVideo: false
};
