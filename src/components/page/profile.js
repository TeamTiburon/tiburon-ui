
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LocationOn from '@material-ui/icons/LocationOn';
import Language from '@material-ui/icons/Language';
import Videocam from '@material-ui/icons/Videocam';
import Chat from '@material-ui/icons/Chat';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const volunteers = require('../../data/volunteers.json');

const styles = theme => ({
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    volunteerName: {
        fontSize: 32,
        fontWeight: 400,
        marginLeft: 8
    },
    volunteerProfile: {
        display: 'flex',
        padding: '0 16px'
    },
    bigAvatar: {
        width: 80,
        height: 80,
        border: '1px solid white'
    },
    volunteerBasic: {
        marginTop: 16
    },
    gridy: {
        display: 'flex',
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    rating: {
        margin: 0,
        fontSize: 30
    },
    volunteerDetails: {
        padding: '16px 16px calc(56px + 16px)',
    },
    actions: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    },
    actionIcon: {
        width: 48,
        height: 48
    },
    online: {
        margin: 10,
        border: '8px solid green',
        borderRadius: '100%'
    },
    offline: {
        margin: 10,
        border: '8px solid gray',
        borderRadius: '100%'
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);

        const volunteerId = this.props.match.params.id;
        const volunteer = volunteers.find(volunteer => volunteerId == volunteer.volunteer_id);

        this.state = {
            calling: false,
            volunteerId,
            volunteer,
            online: false
        };
        this.goBack = this.goBack.bind(this);

        this.initiateLiveVideoChat = this.initiateLiveVideoChat.bind(this);
        this.intiateLiveTextChat = this.intiateLiveTextChat.bind(this);
    }

    checkOnlineStatus(volunteer) {
        fetch(`https://backend.doc.money/online`, {
            method: 'GET'
        }).then((response) => response.json())
        .then((data) => {
            for(const user of data.users) {
                if(user.status === 'online' && user.user == volunteer.volunteer_id) {
                    this.setState({ online: true });
                }
            }
        });
    }

    initiateLiveVideoChat() {
        let userName = 'Unknown';

        if(localStorage.getItem('user')) {
            userName = JSON.parse(localStorage.getItem('user')).displayName;
        }

        const {
            volunteerId,
            volunteer
        } = this.state;

        this.setState({ calling: true });
        return fetch(`https://backend.doc.money/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userName
            })
        })
        .then((response) => response.json())
        .then(({ identity, token }) => {
            return fetch(`https://backend.doc.money/call/${ volunteerId }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log({identity, token, data})
                this.props.history.push({
                    pathname: '/outgoingCall',
                    state: {
                        roomName: data.roomName,
                        volunteer,
                        volunteerId,
                        token,
                        identity
                    }
                });
            });
        }).catch((e) => {
            this.setState({ calling: false, error: e });
        });
    }

    intiateLiveTextChat(event) {
        this.props.history.push({pathname: '/sendMessage', state: { profile: this.state.volunteer }})

    }

    componentDidMount() {
        this.checkOnlineStatus(this.state.volunteer);
    }

    handleNavigation(event) {
        console.log(event);
    }

    goBack() {
        this.props.history.push('/results');
    }

    render() {
        const { volunteer } = this.state;
        const { classes } = this.props;

        var stars = [];
        var emptyStars = [];

        for(var i = 0; i < volunteer.rating; i++) {
            stars.push(<StarIcon key={i} className={classes.rating}/>);
        }

        for(var i = 0; i < 5 - volunteer.rating; i++) {
            emptyStars.push(<StarBorderIcon key={i} className={classes.rating}/>);
        }

        return (
            <div>
                <div className={classes.header}>
                    <IconButton onClick={this.goBack}>
                        <ArrowBack className={classes.icon}/>
                    </IconButton>
                    <h1 className={classes.volunteerName}>{volunteer.name}</h1>
                </div>
                <div className={classes.root}>
                    <div className={classes.volunteerProfile}>
                        <div className={this.state.online ? classes.online : classes.offline}>
                            <Avatar
                                alt={volunteer.name}
                                src={volunteer.profile_picture}
                                className={classes.bigAvatar}
                            />
                        </div>
                        <div className={classes.volunteerBasic}>
                            {stars}
                            {emptyStars}
                            <div className={classes.flex}>
                                <LocationOn className={classes.icon} />
                                <span>St. Louis, MO</span>
                            </div>
                        </div>
                    </div>

                    <div className={classes.volunteerDetails}>
                        <h3>Languages</h3>

                        <ul>
                            {volunteer.languages.map((language, i) => <li key={i}>{language}</li>)}
                        </ul>

                        <h3>Knowledge Areas</h3>

                        <ul>
                            {volunteer.knowledge.map((knowledge, i) => <li key={i}>{knowledge}</li>)}
                        </ul>

                        <h3>Bio</h3>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <BottomNavigation onChange={this.handleNavigation} className={classes.actions}>
                        <BottomNavigationAction onClick={this.initiateLiveVideoChat} label="Video Call" value="video-call" icon={<Videocam />} />
                        <BottomNavigationAction onClick={this.intiateLiveTextChat} label="Live Chat" value="live-chat" icon={<Chat />} />
                    </BottomNavigation>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Profile));
