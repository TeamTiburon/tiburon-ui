import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Phone from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import VideoComponent from '../video/VideoComponent';
import Sound from 'react-sound';

import { withNamespaces, Trans } from "react-i18next";

const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        textAlign: 'left',
        fontSize: 48,
        fontWeight: 400,
        marginBottom: -16,

        marginLeft: 25
    },
    subHeader: {
        textAlign: 'left',
        fontSize: 24,
        marginLeft: 25,
        fontWeight: 200,
        marginBottom: -16
    },
    gridy: {
        display: 'flex',
        flexGrow: 1,
    },
    flexy: {
        flexGrow: 1
    },
    button: {
        flexGrow: 1,
        marginTop: 28
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

class IncomingCall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.location.state,
            token: null,
            identity: null,
            answered: false
        };

        this.sendMessageToUser = this.sendMessageToUser.bind(this);
        this.answer = this.answer.bind(this);
        this.hangup = this.hangup.bind(this);

        this.startPersistentVibrate = this.startPersistentVibrate.bind(this);
        this.startVibrate = this.startVibrate.bind(this);
        this.stopVibrate = this.stopVibrate.bind(this);
    }

    componentDidMount() {
        const volunteer = JSON.parse(localStorage.getItem('volunteer'));

        fetch(`https://backend.doc.money/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: volunteer.volunteer_id + ''
            })
        }).then((response) => response.json())
        .then((data) => {
            this.setState({
                token: data.token,
                identity: data.identity
            });
        });

        this.startPersistentVibrate(200, 300);
    }

    componentWillUnmount() {
        this.stopVibrate();
    }

    startVibrate(duration) {
        navigator.vibrate(duration);
    }

    // Stops vibration
    stopVibrate() {
        // Clear interval and stop persistent vibrating
        if(this.vibrateInterval) {
            clearInterval(this.vibrateInterval);
            this.vibrateInterval = null;
        }
        navigator.vibrate(0);
    }

    // Start persistent vibration at given duration and interval
    // Assumes a number value is given
    startPersistentVibrate(duration, interval) {
        this.vibrateInterval = setInterval(() => {
            this.startVibrate(duration);
        }, interval);
    }

    sendMessageToUser(event) {
        console.log("send message")
        this.props.history.goBack();
    }

    answer(event) {
        this.stopVibrate();
        this.setState({ answered: true });
    }

    hangup() {
        this.props.history.goBack();
    }


    render() {
        const { classes, t } = this.props;
        const { userName } = this.state;

        if (!this.state.answered) {
            return (<div className={classes.loadingSpinner}>

                <Phone style={{ fontSize: 310, zIndex: 9, color: "#fff", display: 'block' }} color="primary"></Phone>

                <Sound
                    url="/audio/old-phone-ringing.mp3"
                    playStatus={Sound.status.PLAYING}
                    loop
                    />

                <h4 style={{ color: "#fff" }}>
                <Trans i18nKey='user_is_calling' userName={userName}>
                        {{userName}}
                    </Trans>
                    </h4>
                <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.answer}
                            disabled={!this.state.token}
                            className={classes.button}>
                            {t('answer')}
                                    </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.sendMessageToUser}
                            className={classes.button}>
                            {t('send_message')}
                                    </Button>
                </div>
            </div>);
        } else {
            return (
                <div>
                    <VideoComponent
                        {...this.state}
                        hangup={ this.hangup }
                        />
                </div>
            );
        }
    }
}
export default withNamespaces()(withStyles(styles)(withRouter(IncomingCall)));

//export default withStyles(styles)(withRouter(Search));
