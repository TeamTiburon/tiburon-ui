
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import VolunteerCard from '../volunteer-card/volunteer-card';

const volunteers = require('../../data/volunteers.json');

const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        fontSize: 20,
        fontWeight: 400,
        margin: '0 0 16px'
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '16px -8px -8px'
    }
});

class Results extends Component {

    constructor(props) {
        super(props);
        this.parseQuery(queryString.parse(this.props.location.search));
    }

    onComponentDidMount() {
    }

    parseQuery(values) {
        if(values.helpWith) {
            this.helpWith = values.helpWith.split(',');
        } else {
            this.helpWith = [ 'Community' ];
        }

        if(values.languages) {
            this.languages = values.languages.split(',');
        } else {
            this.languages = [ 'ENG' ];
        }

        console.log(this.helpWith, this.languages);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h1 className={classes.header}>We found the following Volunteers who can help:</h1>

                <div className={classes.cardContainer}>
                    {volunteers.map((volunteer, i) => <VolunteerCard key={i} volunteer={volunteer}/>)}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Results));
