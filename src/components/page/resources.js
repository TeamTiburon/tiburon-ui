import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ResourceCard from '../resource-card/resource-card';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const resources = require('../../data/resources.json');

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

class LocalInformation extends Component {

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
        this.props.history.push('/dashboard');
    }

    render() {
        const { classes } = this.props;
        const vm = this;

        const sortedResources = resources.sort((a, b) => {
            return b.rating - a.rating;
        });

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <IconButton onClick={this.goBack}>
                        <ArrowBack className={classes.icon}/>
                    </IconButton>
                    <h1 className={classes.title}>Resources near you:</h1>
                </div>

                <div className={classes.cardContainer}>
                    {sortedResources.map((volunteer, i) => <ResourceCard key={i} volunteer={volunteer}/>)}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(LocalInformation));
