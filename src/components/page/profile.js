
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LocationOn from '@material-ui/icons/LocationOn';
import Language from '@material-ui/icons/Language';
import Videocam from '@material-ui/icons/Videocam';
import Chat from '@material-ui/icons/Chat';
import StarRate from '@material-ui/icons/StarRate';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

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
        margin: 10,
        width: 100,
        height: 100,
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
    }
});

class Profile extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         rating: '',
    //         displayName: '',
    //         languages: [],
    //         skills: [],
    //         bio: ''
    //     }
    // }

    onComponentDidMount() {

    }

    handleNavigation(event) {
        console.log(event);
    }

    render() {

        const { classes } = this.props;
        // const { id: voluteerId } = this.props.match.params;

        return (
            <div>
                <div className={classes.header}>
                    <IconButton onClick={this.submit}>
                        <ArrowBack className={classes.icon}/>
                    </IconButton>
                    <h1 className={classes.volunteerName}>Alejandro R.</h1>
                </div>
                <div className={classes.root}>
                    <div className={classes.volunteerProfile}>
                        <Avatar
                            alt="Alejandro R."
                            src={`${process.env.PUBLIC_URL}/img/aram.jpg`}
                            className={classes.bigAvatar}
                            />
                        <div>
                            <StarRate className={classes.rating}/>
                            <StarRate className={classes.rating}/>
                            <StarRate className={classes.rating}/>
                            <StarRate className={classes.rating}/>
                            <StarRate className={classes.rating}/>
                            <div className={classes.flex}>
                                <LocationOn className={classes.icon}/>
                                <span>St. Louis, MO</span>
                            </div>
                        </div>
                    </div>

                    <div className={classes.volunteerDetails}>
                        <h3>Languages</h3>

                        <ul>
                            <li>English</li>
                            <li>Spanish</li>
                        </ul>

                        <h3>Knowledge Areas</h3>

                        <ul>
                            <li>Immigration Law</li>
                            <li>Visa Process</li>
                            <li>Medical Services</li>
                        </ul>

                        <h3>Bio</h3>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <BottomNavigation onChange={this.handleNavigation} className={classes.actions}>
                        <BottomNavigationAction label="Video Call" value="video-call" icon={<Videocam />} />
                        <BottomNavigationAction label="Live Chat" value="live-chat" icon={<Chat />} />
                  </BottomNavigation>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);