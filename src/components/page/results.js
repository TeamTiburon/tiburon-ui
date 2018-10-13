
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import VolunteerCard from '../volunteer-card/volunteer-card';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const volunteers = require('../../data/volunteers.json');

const styles = theme => ({
    root: {
        padding: 16
    },
    header: {
        display: 'flex',
        alignItems: 'start',
        margin: '0 0 16px -16px'
    },
    title: {
        fontSize: 24,
        fontWeight: 400,
        margin: 0
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '16px -8px -8px'
    },
    notFound: {
        fontSize: 32,
        fontWeight: 500
    }
});

class Results extends Component {

    constructor(props) {
        super(props);
        this.parseQuery(queryString.parse(this.props.location.search));
        this.goBack = this.goBack.bind(this);
    }

    onComponentDidMount() {
    }

    parseQuery(values) {
        if(values.helpWith) {
            this.helpWith = values.helpWith.split(',');
        } else {
            if(localStorage.getItem('searchHelp')) {
                this.helpWith = JSON.parse(localStorage.getItem('searchHelp'));
            } else {
                this.helpWith = [ 'Community' ];
            }
        }

        if(values.language) {
            this.language = values.language;
        } else {
            if(localStorage.getItem('searchLanguage')) {
                this.language = localStorage.getItem('searchLanguage');
            } else {
                this.language = 'English';
            }
        }

        localStorage.setItem('searchHelp', JSON.stringify(this.helpWith));
        localStorage.setItem('searchLanguage', this.language);
    }

    goBack(event) {
        this.props.history.push('/search');
    }

    render() {
        const { classes } = this.props;
        const vm = this;

        let sortedVolunteers = volunteers.filter(volunteer => {
            let validLang = (volunteer.languages.indexOf(this.language) !== -1);
            let validArea = true;

            for(const area of this.helpWith) {
                if(volunteer.knowledge.indexOf(area) === -1) {
                    validArea = false;
                    break;
                }
            }

            return validLang && validArea;
        });

        sortedVolunteers = sortedVolunteers.sort((a, b) => {
            return b.rating - a.rating;
        });

        if(sortedVolunteers.length === 0) {
            return (
                <div className={classes.root}>
                    <div className={classes.header} style={{alignItems: 'center'}}>
                        <IconButton onClick={this.goBack}>
                            <ArrowBack className={classes.icon}/>
                        </IconButton>
                        <h1 className={classes.title}>Go Back</h1>
                    </div>

                    <h1 className={classes.notFound}>No volunteers were found using your search criteria.</h1>
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <IconButton onClick={this.goBack}>
                        <ArrowBack className={classes.icon}/>
                    </IconButton>
                    <h1 className={classes.title}>We found the following Volunteers who can help:</h1>
                </div>

                <div className={classes.cardContainer}>
                    {sortedVolunteers.map((volunteer, i) => <VolunteerCard key={i} volunteer={volunteer}/>)}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Results));
