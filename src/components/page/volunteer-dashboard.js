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
import { connection } from '../../index';

import { withNamespaces } from "react-i18next";

const styles = theme => ({
    volunteerName: {
        fontSize: 24,
        fontWeight: 400,
        marginBottom: 8
    },
    volunteerProfile: {
        display: 'flex',
        padding: '28px 16px 0'
    },
    volunteerBasic: {
        marginLeft: 8
    },
    bigAvatar: {
        margin: 10,
        width: 120,
        height: 120,
    },
    gridy: {
        display: 'flex',
        flexGrow: 1,
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0 0 -4px'
    },
    rating: {
        margin: 0,
        fontSize: 16
    },
    volunteerDetails: {
        padding: '16px 28px',
    }
});

class VolunteerDashboard extends Component {

    constructor(props) {
        super(props);
        this.validate();
    }

    componentDidMount() {
    }

    validate() {
        const volunteerStr = localStorage.getItem('volunteer');

        if(!volunteerStr) {
            this.props.history.push('/volunteerLogin');
            return;
        }

        this.volunteer = JSON.parse(volunteerStr);
        connection.subscribe(this.props.history, this.volunteer);
    }

    render() {
        const { classes, t } = this.props;
        const volunteer = this.volunteer;

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
                <div className={classes.root}>
                    <div className={classes.volunteerProfile}>
                        <Avatar
                            alt={volunteer.name}
                            src={volunteer.profile_picture}
                            className={classes.bigAvatar}
                        />
                        <div className={classes.volunteerBasic}>
                            <h1 className={classes.volunteerName}>{volunteer.name}</h1>
                            {stars}
                            {emptyStars}
                            <div className={classes.location}>
                                <LocationOn className={classes.icon} />
                                <span>St. Louis, MO</span>
                            </div>
                        </div>
                    </div>

                    <div className={classes.volunteerDetails}>
                        <h3>{t('languages')}</h3>

                        <ul>
                            {volunteer.languages.map((language, i) => <li key={i}>{language}</li>)}
                        </ul>

                        <h3>{t('knowledge_areas')}</h3>

                        <ul>
                            {volunteer.knowledge.map((knowledge, i) => <li key={i}>{knowledge}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNamespaces()(withStyles(styles)(withRouter(VolunteerDashboard)));
