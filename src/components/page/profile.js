
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
import yellow from '@material-ui/core/colors/yellow';

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
      },
    rating: {
        margin: 0,
        fontSize: 30,
        color: yellow[400]
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
                <ArrowBack className={classes.icon}/>
                </Button>
                <h1 className={classes.header}>Alejandro R.</h1>
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Avatar
                        alt="Alejandro R."
                        src={`${process.env.PUBLIC_URL}/img/aram.jpg`}
                        className={classes.bigAvatar}
                        />
                        <StarRate className={classes.rating}/>
                        <StarRate className={classes.rating}/>
                        <StarRate className={classes.rating}/>
                        <StarRate className={classes.rating}/>
                        <StarRate className={classes.rating}/>
                        <Grid item xs={12} className={classes.gridy}>
                            <LocationOn className={classes.icon}/>
                            <p><em>St. Louis, MO</em></p>
                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <h3>Languages</h3>
                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <ul>
                                <li>English</li>
                                <li>Spanish</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <h3>Knowledge Areas</h3>
                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <ul>
                                <li>Immigration Law</li>
                                <li>Visa Process</li>
                                <li>Medical Services</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <h3>Bio</h3>
                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </Grid>
                        <Videocam className={classes.icon}/>
                        <Chat className={classes.icon}/>    
                    </Grid>  
                </div>          
            </div>
        );
    }
}

export default withStyles(styles)(Profile);
