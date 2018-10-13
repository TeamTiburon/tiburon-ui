
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LocationOn from '@material-ui/icons/LocationOn';
import Language from '@material-ui/icons/Language';

const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 400,
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
    avatar: {
        margin: 10,
      },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
      icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
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

    render() {

        const { classes } = this.props;
        // const { id: voluteerId } = this.props.match.params;

        return (

            <div>
                <Button variant="contained" color="primary" onClick={this.submit} className={classes.button}>
                Back
                </Button>
                <h1>Alejandro R.</h1>
                <Avatar
                alt="Alejandro R."
                src="/data/aram.jpg"
                className={classes.bigAvatar}
                />
                <LocationOn className={classes.icon}/>
                <em>St. Louis, MO</em>
                <Language className={classes.icon}/>
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
                <footer />
            </div>
        );
    }
}

export default withStyles(styles)(Profile);
